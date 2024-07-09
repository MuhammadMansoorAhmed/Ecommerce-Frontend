import { Col, Row } from "react-bootstrap";

const PopularCards = () => {
  return (
    <div className="d-flex justify-content-center p-5">
      <h3>Popular Products</h3>
      <Row>
        <Col sm={10} md={3} lg={3} xl={3}>
          <div className="d-flex justify-content-center flex-column">
            <img src="" alt="" />
            <p>ShopName</p>
            <h6>Product Name</h6>
            <h6>Price</h6>
          </div>
        </Col>
        <Col sm={10} md={3} lg={3} xl={3}>
          <div className="d-flex justify-content-center flex-column"></div>
        </Col>
        <Col sm={10} md={3} lg={3} xl={3}>
          <div className="d-flex justify-content-center flex-column"></div>
        </Col>
        <Col sm={10} md={3} lg={3} xl={3}>
          <div className="d-flex justify-content-center flex-column"></div>
        </Col>
      </Row>
    </div>
  );
};

export default PopularCards;
