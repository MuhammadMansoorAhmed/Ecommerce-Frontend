import { Col, Container, Row } from "react-bootstrap";
import product1 from "../../../assets/product1.jpg";
import product2 from "../../../assets/product2.jpg";
import product3 from "../../../assets/product5.jpg";
import product4 from "../../../assets/Product3.jpg";
import BlurHashImageComponent from "./BlurHashImageComponent";

const PopularProducts = () => {
  return (
    <Container>
      <Row className="d-flex justify-content-center mb-5">
        <h2 className="text-center my-5 fw-bold">Popular Products</h2>
        <Col
          sm={10}
          md={3}
          lg={3}
          xl={3}
          className="d-flex flex-column position-relative"
        >
          <BlurHashImageComponent
            hash="LLC6okkCacs.~VocNHbH-VoxR+od"
            imgSrc={product1}
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
            hash="LlP$dgWCyst7Xmofr=fkS%oLi^a#"
            imgSrc={product4}
          />

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
            hash="L8N^9og+9[%L004TRMoJ5b9FNGV?"
            imgSrc={product2}
          />
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
            hash="LGD9@r%N00IU%2%2IpE28w%M_4NG"
            imgSrc={product3}
          />
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
    </Container>
  );
};

export default PopularProducts;
