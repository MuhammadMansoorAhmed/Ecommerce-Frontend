import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";
import Spinner from "react-bootstrap/Spinner";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductsWithCategoryId,
} from "../../Redux/Services/productServices";
import {
  selectIsLoading,
  selectIsSuccess,
} from "../../Redux/Features/productSlice";
import { toast } from "react-toastify";
import PaginationComponent from "../pagination/PaginationComponent";

const ITEMS_PER_PAGE = 12;

const CategoryPageComponent = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = useSelector(selectIsLoading);
  const isSuccess = useSelector(selectIsSuccess);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (location.pathname === "/" || category === "all") {
          response = await dispatch(getAllProducts());
        } else if (category && category !== "undefined") {
          response = await dispatch(getProductsWithCategoryId(category));
        }

        if (response?.payload?.data) {
          setProducts(response.payload.data);
          setCurrentPage(1); // Reset to first page when category changes
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };
    fetchProducts();
  }, [category, dispatch]);

  // Calculate pagination values
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
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="grow" />
          </div>
        ) : isSuccess && paginatedProducts.length > 0 ? (
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

      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default CategoryPageComponent;
