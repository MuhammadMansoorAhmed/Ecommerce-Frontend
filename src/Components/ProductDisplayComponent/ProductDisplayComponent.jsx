import { Col, Container, Row } from "react-bootstrap";
import "./ProductDisplayComponent.css";
import RelatedProductsComponent from "../RelatedProductsComponent/RelatedProductsComponent";
import HomeFooter from "../HomeComponent/HomeFooter/HomeFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../Redux/Services/productServices";

const ProductDisplayComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await dispatch(getProductById(params.id));
      setProduct(response.payload.data);
    };
    fetchProduct();
  }, [dispatch, params.id]);

  const handleIncrementQuantity = () => {
    if (quantity < product?.totalStockRemaining) {
      setQuantity(quantity + 1);
    }
  };
  const handleDecrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Container className="marginStyle">
      <Row className="m-1 p-1">
        <Col sm={10} md={6} lg={6} xl={6} className="p-2">
          <Row className="p-2 h-100">
            <Col
              sm={3}
              md={3}
              lg={3}
              xl={3}
              className="d-flex flex-md-column justify-content-md-center justify-content-evenly position-relative productLeftList h-md-100"
            >
              <div>
                <img
                  className="w-md-100 py-2"
                  style={{ height: "150px" }}
                  src={product?.images[0]?.url}
                />
              </div>
              <div>
                <img
                  className="w-md-100 py-2"
                  style={{ height: "150px" }}
                  src={product?.images[1]?.url}
                />
              </div>
              <div>
                <img
                  className="w-md-100 py-2"
                  style={{ height: "150px" }}
                  src={product?.images[2]?.url}
                />
              </div>
            </Col>
            <Col sm={7} md={9} lg={9} xl={9}>
              <div className="d-flex justify-content-center w-md-100">
                <img
                  src={product?.images[0]?.url}
                  alt="Product Image Not Found"
                  className="rounded"
                  style={{ height: "500px", width: "400px" }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={10} md={6} lg={6} xl={6}>
          <div className="d-flex justify-content-start flex-column w-100">
            <p
              style={{
                fontSize: "32px",
                fontFamily: "font-family: Ubuntu, sans-serif",
                color: "#212529",
                fontWeight: "600",
                marginTop: "10px",
                marginBottom: "6px",
              }}
            >
              {product?.name}
            </p>
            {/* <p
              style={{
                fontFamily: "font-family: Ubuntu, sans-serif",
                color: "#666",
                marginBottom: "10px",
              }}
            >
              Brand Name
            </p> */}
            <p
              style={{
                fontSize: "40px",
                fontFamily: "font-family: Ubuntu, sans-serif",
                color: "#212529",
                marginBottom: "0px",
              }}
            >
              PKR: {product?.price}
            </p>
            <p
              style={{
                fontSize: "18px",
                fontFamily: "font-family: Ubuntu, sans-serif",
                color: "#666",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Category: {product?.category?.category}
            </p>
            <div className="d-flex justfy-content-evenly w-100 mt-4">
              <div className="w-100">
                Quantity:
                <span className=" quantityBtnContainer">
                  <button onClick={handleDecrementQuantity}>-</button>
                  <p className="d-inline px-4">
                    {quantity}/ {product?.totalStockRemaining}
                  </p>
                  <button onClick={handleIncrementQuantity}>+</button>
                </span>
                <button
                  className="addToCartBtn"
                  onClick={() => {
                    navigate(`/order/${params?.id}`);
                  }}
                >
                  Place Order
                </button>
                <hr className="text-secondary my-4" />
              </div>
            </div>
            <div className="d-flex  flex-column justify-content-center">
              <div className="availability">
                <h6 className="d-inline ">Availability: </h6>
                <span className="ms-3"> {product?.totalStock}</span>
              </div>
              <div className="availability">
                <h6 className="d-inline ">Availability Colors: </h6>
                <span className="ms-3"> Values</span>
              </div>
              <div className="availability">
                <h6 className="d-inline ">Availability Size: </h6>
                <span className="ms-3"> Values</span>
              </div>
              <div className="availability">
                <h6 className="d-inline ">Promotion: </h6>
                <span className="ms-3"> Values</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <hr className="text-secondary" />

          <h5>Description</h5>
          <p>{product?.description}</p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <RelatedProductsComponent
            category={product?.category?.name}
            dispatch={dispatch}
          />
        </Col>
      </Row>
      <HomeFooter />
    </Container>
  );
};

export default ProductDisplayComponent;
