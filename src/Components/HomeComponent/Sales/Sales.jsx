import { Col, Row } from "react-bootstrap";
import salesImg from "../../../assets/Sales.jpg";

const Sales = () => {
  return (
    <div className="p-5 d-flex justify-content-center rounded-5">
      <Row
        className=" rounded-5 d-flex justify-content-center    "
        style={{ backgroundColor: "#889FA580", width: "85%" }}
      >
        <Col sm={10} md={5} lg={5} xl={5} className="p-5">
          <img
            src={salesImg}
            alt="sales"
            style={{
              height: "600px",
              width: "100%",
              borderRadius: "24px 2px 2px 24px",
            }}
          />
        </Col>
        <Col sm={10} md={7} lg={7} xl={7} className="p-5">
          <h1 className="text-left">Sales</h1>
          <p className="text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button className="btnClass mt-3">View Collection</button>
        </Col>
      </Row>
    </div>
  );
};

export default Sales;
