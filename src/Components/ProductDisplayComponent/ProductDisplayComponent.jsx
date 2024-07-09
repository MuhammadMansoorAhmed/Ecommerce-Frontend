import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import productImage from "../../assets/product1.jpg";
const ProductDisplayComponent = () => {
  return (
    <Container>
      <Row className="m-1 p-1">
        <Col sm={10} md={6} lg={6} xl={6}>
          <div className="d-flex justify-content-center w-100">
            <img
              src={productImage}
              alt="Product Image Not Found"
              className="rounded"
              style={{ height: "600px", width: "480px" }}
            />
          </div>
        </Col>
        <Col sm={10} md={6} lg={6} xl={6}>
          <div className="d-flex justify-content-start flex-column w-100">
            <p
              style={{
                fontSize: "32px",
                fontFamily: "font-family: Ubuntu, sans-serif",
                color: "#212529",
                marginTop: "10px",
                marginBottom: "6px",
              }}
            >
              Sample Heading
            </p>
            <p
              style={{
                fontSize: "18px",
                fontFamily: "font-family: Ubuntu, sans-serif",
                color: "#212529",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Description
            </p>
            <p
              style={{
                fontSize: "18px",
                fontFamily: "font-family: Ubuntu, sans-serif",
                color: "#212529",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              sample Heading
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDisplayComponent;
