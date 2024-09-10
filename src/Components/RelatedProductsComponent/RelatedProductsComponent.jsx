import { Col, Row } from "react-bootstrap";
import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";
import product from "../../assets/product1.jpg";

const RelatedProductsComponent = () => {
  return (
    <Row className="d-flex justify-content-center clign-items-center ">
      <hr className="text-secondary" />
      <h4 className="text-center my-4">Related Products</h4>
      <Col
        sm={10}
        md={3}
        lg={3}
        xl={3}
        className="d-flex flex-column position-relative"
      >
        <BlurHashImageComponent
          hash="LLC6okkCacs.~VocNHbH-VoxR+od"
          imgSrc={product}
        />
        <div className="position-absolute">
          <span></span>
        </div>
        <div className="mt-3">
          <p
            className="m-0 text-secondary fw-bold"
            style={{ fontSize: "14px" }}
          >
            Collection Name
          </p>
          <h6>Name</h6>
          <p className="fw-bold" style={{ fontSize: "16px" }}>
            Price
          </p>
        </div>
      </Col>
      <Col
        sm={10}
        md={3}
        lg={3}
        xl={3}
        className="d-flex flex-column position-relative"
      >
        <BlurHashImageComponent
          hash="LLC6okkCacs.~VocNHbH-VoxR+od"
          imgSrc={product}
        />
        <div className="position-absolute">
          <span></span>
        </div>
        <div className="mt-3">
          <p
            className="m-0 text-secondary fw-bold"
            style={{ fontSize: "14px" }}
          >
            Collection Name
          </p>
          <h6>Name</h6>
          <p className="fw-bold" style={{ fontSize: "16px" }}>
            Price
          </p>
        </div>
      </Col>
      <Col
        sm={10}
        md={3}
        lg={3}
        xl={3}
        className="d-flex flex-column position-relative"
      >
        <BlurHashImageComponent
          hash="LLC6okkCacs.~VocNHbH-VoxR+od"
          imgSrc={product}
        />
        <div className="position-absolute">
          <span></span>
        </div>
        <div className="mt-3">
          <p
            className="m-0 text-secondary fw-bold"
            style={{ fontSize: "14px" }}
          >
            Collection Name
          </p>
          <h6>Name</h6>
          <p className="fw-bold" style={{ fontSize: "16px" }}>
            Price
          </p>
        </div>
      </Col>
      <Col
        sm={10}
        md={3}
        lg={3}
        xl={3}
        className="d-flex flex-column position-relative"
      >
        <BlurHashImageComponent
          hash="LLC6okkCacs.~VocNHbH-VoxR+od"
          imgSrc={product}
        />
        <div className="position-absolute">
          <span></span>
        </div>
        <div className="mt-3">
          <p
            className="m-0 text-secondary fw-bold"
            style={{ fontSize: "14px" }}
          >
            Collection Name
          </p>
          <h6>Name</h6>
          <p className="fw-bold" style={{ fontSize: "16px" }}>
            Price
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default RelatedProductsComponent;
