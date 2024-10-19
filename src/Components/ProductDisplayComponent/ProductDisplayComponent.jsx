import { Col, Container, Row } from "react-bootstrap";
import productImage from "../../assets/product1.jpg";
import "./ProductDisplayComponent.css";
import RelatedProductsComponent from "../RelatedProductsComponent/RelatedProductsComponent";
import HomeFooter from "../HomeComponent/HomeFooter/HomeFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ProductDisplayComponent = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const params = useParams();

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="m-1 p-1">
        <Col sm={10} md={6} lg={6} xl={6} className="p-2">
          <Row className="p-2 h-100">
            <Col
              sm={3}
              md={3}
              lg={3}
              xl={3}
              className="d-flex flex-column justify-content-center productLeftList h-100"
            >
              <div>
                <img
                  className="w-100 my-2"
                  style={{ height: "150px" }}
                  src={productImage}
                  alt="img not found"
                />
              </div>
              <div>
                <img
                  className="w-100 my-2"
                  style={{ height: "150px" }}
                  src={productImage}
                  alt="img not found"
                />
              </div>
              <div>
                <img
                  className="w-100 my-2"
                  style={{ height: "150px" }}
                  src={productImage}
                  alt="img not found"
                />
              </div>
            </Col>
            <Col sm={9} md={9} lg={9} xl={9}>
              <div className="d-flex justify-content-center w-100">
                <img
                  src={productImage}
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
              ESSENTIAL STRUCTURED BLAZER
            </p>
            <p
              style={{
                fontFamily: "font-family: Ubuntu, sans-serif",
                color: "#666",
                marginBottom: "10px",
              }}
            >
              Brand Name
            </p>
            <p
              style={{
                fontSize: "40px",
                fontFamily: "font-family: Ubuntu, sans-serif",
                color: "#212529",
                marginBottom: "0px",
              }}
            >
              $75
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
              description
            </p>
            <div className="d-flex justfy-content-evenly w-100 mt-4">
              <div className="w-100">
                Quantity:
                <span className=" quantityBtnContainer">
                  <button onClick={handleDecrementQuantity}>-</button>
                  <p className="d-inline px-4">{quantity}</p>
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
                <span className="ms-3"> Values</span>
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

          <h5>description</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ex
            ipsam mollitia, tenetur sint quibusdam cupiditate! Earum commodi
            consequuntur voluptas culpa suscipit officiis. Consequuntur sit
            quasi tenetur similique? Deserunt, minus!
          </p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <RelatedProductsComponent />
        </Col>
      </Row>
      <HomeFooter />
    </Container>
  );
};

export default ProductDisplayComponent;
