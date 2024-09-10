import { Col, Container, Row } from "react-bootstrap";
import productImage from "../../assets/product1.jpg";
import "./ProductDisplayComponent.css";
import ProductDetails from "./ProductDetails";

import RelatedProductsComponent from "../RelatedProductsComponent/RelatedProductsComponent";
import HomeFooter from "../HomeComponent/HomeFooter/HomeFooter";

const ProductDisplayComponent = () => {
  return (
    <Container>
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
          <ProductDetails />
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
