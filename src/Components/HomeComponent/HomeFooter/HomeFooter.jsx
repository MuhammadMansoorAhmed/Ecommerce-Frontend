import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const HomeFooter = () => {
  return (
    <div
      className="d-flex justify-content-center  position-relative"
      style={{
        backgroundColor: `#c3c4c3`,
        height: "500px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        // boxShadow: "2px 2px 6px 5px #B1BDC5",
        color: "white",
      }}
    >
      <Row className="position-absolute" style={{ zIndex: "2" }}>
        <Col sm={5} md={3}>
          <h1>12354</h1>
        </Col>
      </Row>
    </div>
  );
};

export default HomeFooter;
