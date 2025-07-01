import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";
import Spinner from "react-bootstrap/Spinner";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductsWithCategory,
} from "../../Redux/Services/productServices";
import {
  selectIsLoading,
  selectIsSuccess,
} from "../../Redux/Features/productSlice";
import { toast } from "react-toastify";

const CategoryPageComponent = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const isLoading = useSelector(selectIsLoading);
  const isSuccess = useSelector(selectIsSuccess);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (location.pathname === "/" || category === "all") {
          response = await dispatch(getAllProducts());
        } else if (category && category !== "undefined") {
          response = await dispatch(getProductsWithCategory(category));
        }

        if (response?.payload?.data) {
          setProducts(response.payload.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };
    fetchProducts();
  }, [category, dispatch]);

  return (
    <Container className="my-4">
      <Row className="justify-content-center g-4">
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="grow" />
          </div>
        ) : isSuccess && products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <div className="border rounded-3 shadow-sm h-100 d-flex flex-column justify-content-between p-2">
                <BlurHashImageComponent product={product} />
              </div>
            </Col>
          ))
        ) : (
          <div className="text-center py-4">No Product Found</div>
        )}
      </Row>
    </Container>
  );
};

export default CategoryPageComponent;
