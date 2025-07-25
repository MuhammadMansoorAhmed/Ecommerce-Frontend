/* eslint-disable react/prop-types */
import { Col, Container, Row } from "react-bootstrap";
import BlurHashImageComponent from "./BlurHashImageComponent";

const PopularProducts = ({ popularProducts }) => {
  return (
    <Container>
      <Row className="d-flex justify-content-center mb-5">
        <h3 className="text-center mb-4 fw-bold">Popular Products</h3>
        {popularProducts?.map((product) => (
          <Col
            sm={10}
            md={3}
            lg={3}
            xl={3}
            className="d-flex flex-column position-relative"
            key={product?._id}
          >
            <BlurHashImageComponent
              hash={product?.images[0]?.blurHash}
              imgSrc={product?.images[0]?.url}
              productId={product?._id}
            />
            <div className="mt-3">
              <h6>{product?.name}</h6>
              <p className="fw-bold" style={{ fontSize: "16px" }}>
                ${product?.price}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularProducts;
