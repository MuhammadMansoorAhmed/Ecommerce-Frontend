import {
  Carousel,
  Col,
  Container,
  Row,
  Spinner,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import HomeFooter from "../HomeComponent/HomeFooter/HomeFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../Redux/Services/productServices";
import { selectIsLoading } from "../../Redux/Features/productSlice";
import { FiMinus, FiPlus } from "react-icons/fi";

const ProductDisplayComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useSelector(selectIsLoading);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await dispatch(getProductById(id));
      setProduct(response.payload.data);
    };
    fetchProduct();
  }, [dispatch, id]);

  const handleIncrement = () => {
    if (quantity < product?.totalStockRemaining) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Container className="py-5">
      {isLoading || !product ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row className="g-5 align-items-start">
            {/* IMAGE SLIDER */}
            <Col md={6}>
              <div className="bg-white rounded shadow-sm p-3">
                <Carousel interval={null} className="rounded overflow-hidden">
                  {product?.images?.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        src={img.url}
                        alt={`Product ${idx + 1}`}
                        className="d-block w-100"
                        style={{
                          height: "500px",
                          objectFit: "contain",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>

            {/* PRODUCT DETAILS */}
            <Col md={6}>
              <div className="h-100 d-flex flex-column justify-content-between">
                <div>
                  <h2 className="fw-bold">{product?.name}</h2>
                  <p className="text-muted mb-1">
                    Category: <strong>{product?.category?.name}</strong>
                  </p>
                  <h3 className="text-dark fw-semibold my-3">
                    PKR {product?.price}
                  </h3>

                  <div className="d-flex align-items-center gap-3 my-3">
                    <span className="fw-semibold">Quantity:</span>
                    <ButtonGroup size="sm" className="rounded-pill border">
                      <Button
                        variant="light"
                        onClick={handleDecrement}
                        className="px-3"
                      >
                        <FiMinus />
                      </Button>
                      <Button variant="light" disabled className="px-4">
                        {quantity}
                      </Button>
                      <Button
                        variant="light"
                        onClick={handleIncrement}
                        className="px-3"
                      >
                        <FiPlus />
                      </Button>
                    </ButtonGroup>
                    <span className="text-muted">
                      / {product?.totalStockRemaining} in stock
                    </span>
                  </div>

                  <Button
                    onClick={() => navigate(`/${id}/order/${quantity}`)}
                    className="w-100 mt-3 modern-order-btn"
                    size="lg"
                  >
                    Place Order
                  </Button>
                </div>

                <hr className="my-4" />

                <div>
                  <h6 className="fw-semibold mb-1">Availability:</h6>
                  <p className="text-muted">{product?.totalStock} units</p>
                </div>
              </div>
            </Col>
          </Row>

          {/* DESCRIPTION */}
          <Row className="mt-5">
            <Col>
              <h5 className="fw-semibold mb-3">📝 Description</h5>
              <p className="text-muted">{product?.description}</p>
            </Col>
          </Row>

          <HomeFooter />
        </>
      )}
    </Container>
  );
};

export default ProductDisplayComponent;
