/* eslint-disable react/prop-types */
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";
import PaginationComponent from "../pagination/PaginationComponent";

import {
  getAllProducts,
  getProductsWithCategoryId,
} from "../../Redux/Services/productServices";
import { selectIsLoading } from "../../Redux/Features/productSlice";

const ITEMS_PER_PAGE = 12;

const areListsEqualShallow = (a = [], b = []) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  // Compare by id to avoid expensive deep checks
  for (let i = 0; i < a.length; i++) {
    if (a[i]?._id !== b[i]?._id) return false;
  }
  return true;
};

const CategoryPageComponent = ({ category }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetched, setIsFetched] = useState(false);

  // Only re-render when the boolean actually changes
  const isLoading = useSelector(selectIsLoading, shallowEqual);

  // Keep a ref of last data to do cheap equality checks
  const lastProductsRef = useRef(products);

  // Decide source once, memoized
  const isHome = useMemo(
    () => pathname === "/" || category === "all",
    [pathname, category]
  );

  useEffect(() => {
    let aborted = false;
    const ctrl = new AbortController();

    const fetchProducts = async () => {
      setIsFetched(false);

      try {
        let action;
        if (isHome) {
          action = await dispatch(getAllProducts());
        } else if (category && category !== "undefined") {
          action = await dispatch(getProductsWithCategoryId(category));
        } else {
          // No valid category, treat as empty
          if (!aborted) {
            if (!areListsEqualShallow([], lastProductsRef.current)) {
              setProducts([]);
              lastProductsRef.current = [];
            }
            setCurrentPage(1);
          }
          return;
        }

        if (aborted || ctrl.signal.aborted) return;

        const incoming = action?.payload?.data ?? [];
        // Only update state if data actually changed
        if (!areListsEqualShallow(incoming, lastProductsRef.current)) {
          setProducts(incoming);
          lastProductsRef.current = incoming;
          setCurrentPage(1); // reset pagination only when list changes
        }
      } catch (err) {
        if (!aborted) {
          toast.error("Error fetching products");
          if (!areListsEqualShallow([], lastProductsRef.current)) {
            setProducts([]);
            lastProductsRef.current = [];
          }
        }
      } finally {
        if (!aborted) setIsFetched(true);
      }
    };

    fetchProducts();

    return () => {
      aborted = true;
      ctrl.abort();
    };
  }, [dispatch, isHome, category]); // includes pathname via isHome

  // Derived values memoized
  const totalPages = useMemo(
    () => Math.ceil(products.length / ITEMS_PER_PAGE) || 0,
    [products.length]
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    // Keep scroll behavior snappy but not blocking
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  return (
    <Container className="my-4">
      <Row className="justify-content-center g-3 p-2">
        {!isFetched || isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="grow" />
          </div>
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <div className="h-100 d-flex flex-column justify-content-between">
                <BlurHashImageComponent product={product} />
              </div>
            </Col>
          ))
        ) : (
          <div className="text-center py-4">No Product Found</div>
        )}
      </Row>

      {isFetched && totalPages > 1 && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default memo(CategoryPageComponent);
