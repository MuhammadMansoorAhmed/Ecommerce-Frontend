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

  // Keep last list to avoid unnecessary re-renders
  const lastProductsRef = useRef(products);

  // Loading flag from store (unchanged)
  const isLoading = useSelector(selectIsLoading, shallowEqual);

  // Home route shows "all"
  const isHome = useMemo(
    () => pathname === "/" || category === "all",
    [pathname, category]
  );

  // Server pagination meta when headers are present
  const [pageMeta, setPageMeta] = useState({
    totalPages: 0,
    page: 1,
    limit: ITEMS_PER_PAGE,
    hasNext: false,
    hasPrev: false,
  });

  useEffect(() => {
    let aborted = false;
    const ctrl = new AbortController();

    const fetchProducts = async () => {
      setIsFetched(false);

      try {
        let action;

        if (isHome) {
          // Ask server for the requested page. This assumes your thunk supports { page, limit }.
          action = await dispatch(
            getAllProducts({ page: currentPage, limit: ITEMS_PER_PAGE })
          );
        } else if (category && category !== "undefined") {
          // Existing behavior for non-"all" categories (ID-based)
          action = await dispatch(getProductsWithCategoryId(category));
        } else {
          // No valid category -> clear list
          if (!aborted) {
            if (!areListsEqualShallow([], lastProductsRef.current)) {
              setProducts([]);
              lastProductsRef.current = [];
            }
          }
          return;
        }

        if (aborted || ctrl.signal.aborted) return;

        // Keep original envelope: { statusCode, data, message }
        const incoming = action?.payload?.data ?? [];

        // Read pagination headers if backend sent them (non-breaking)
        const hdr = action?.payload?._headers || {};
        const serverTotalPages = Number(hdr["x-total-pages"] || 0) || 0;

        if (serverTotalPages) {
          setPageMeta({
            totalPages: serverTotalPages,
            page: Number(hdr["x-page"] || 1) || 1,
            limit: Number(hdr["x-limit"] || ITEMS_PER_PAGE) || ITEMS_PER_PAGE,
            hasNext: String(hdr["x-has-next"]).toLowerCase() === "true",
            hasPrev: String(hdr["x-has-prev"]).toLowerCase() === "true",
          });
        } else {
          // No headers -> fall back to client-side pagination
          setPageMeta((m) => ({ ...m, totalPages: 0 }));
        }

        // Only update state if list changed
        if (!areListsEqualShallow(incoming, lastProductsRef.current)) {
          setProducts(incoming);
          lastProductsRef.current = incoming;

          // When NOT using server paging (i.e., non-home), reset page to 1 on list change
          if (!isHome) {
            setCurrentPage(1);
          }
        }
      } catch (err) {
        if (!aborted) {
          toast.error("Error fetching products");
          if (!areListsEqualShallow([], lastProductsRef.current)) {
            setProducts([]);
            lastProductsRef.current = [];
          }
          setPageMeta((m) => ({ ...m, totalPages: 0 }));
        }
      } finally {
        if (!aborted) setIsFetched(true);
      }
    };

    fetchProducts();

    // For server pagination, refetch when currentPage changes
    return () => {
      aborted = true;
      ctrl.abort();
    };
  }, [dispatch, isHome, category, currentPage]);

  // If server pagination headers exist, use them; otherwise compute locally
  const usingServerPaging = pageMeta.totalPages > 0;

  const totalPages = useMemo(() => {
    return usingServerPaging
      ? pageMeta.totalPages
      : Math.ceil(products.length / ITEMS_PER_PAGE) || 0;
  }, [usingServerPaging, pageMeta.totalPages, products.length]);

  const paginatedProducts = useMemo(() => {
    if (usingServerPaging) {
      // Server already returned exactly the current page
      return products;
    }
    // Client-side slice fallback
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [usingServerPaging, products, currentPage]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
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
