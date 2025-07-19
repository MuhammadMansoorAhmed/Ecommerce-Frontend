/* eslint-disable react/prop-types */
import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";
import Spinner from "react-bootstrap/Spinner";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductsWithCategoryId,
} from "../../Redux/Services/productServices";
import {
  selectIsLoading,
  // selectIsSuccess,
} from "../../Redux/Features/productSlice";
import { toast } from "react-toastify";
import PaginationComponent from "../pagination/PaginationComponent";

const ITEMS_PER_PAGE = 12;

const CategoryPageComponent = ({ category }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetched, setIsFetched] = useState(false); // ✅ Track fetch status manually

  const isLoading = useSelector(selectIsLoading);
  // const isSuccess = useSelector(selectIsSuccess);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetched(false); // Reset before new fetch
      try {
        let response;
        if (location.pathname === "/" || category === "all") {
          response = await dispatch(getAllProducts());
        } else if (category && category !== "undefined") {
          response = await dispatch(getProductsWithCategoryId(category));
        }

        if (response?.payload?.data) {
          setProducts(response.payload.data);
          setCurrentPage(1); // Reset pagination
        } else {
          setProducts([]); // Ensure fallback if no data
        }
      } catch (error) {
        toast.error("Error fetching products");
        setProducts([]);
      } finally {
        setIsFetched(true); // ✅ Mark as done
      }
    };

    fetchProducts();
  }, [category, dispatch]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center g-3 p-2">
        {!isFetched || isLoading ? (
          // ✅ Show spinner while fetching
          <div className="text-center py-5">
            <Spinner animation="grow" />
          </div>
        ) : paginatedProducts.length > 0 ? (
          // ✅ Show products
          paginatedProducts.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <div className="h-100 d-flex flex-column justify-content-between">
                <BlurHashImageComponent product={product} />
              </div>
            </Col>
          ))
        ) : (
          // ✅ No product message after fetch
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

export default CategoryPageComponent;
