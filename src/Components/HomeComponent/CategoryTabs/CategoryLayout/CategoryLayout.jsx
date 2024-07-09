import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LayoutCard from "./LayoutCard";

const CategoryLayout = () => {
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={12} md={3} lg={3} xl={3} className="px-0 my-3 mx-1 shadow-lg">
          <LayoutCard />
        </Col>
        <Col sm={12} md={3} lg={3} xl={3} className="px-0 my-3 mx-1 shadow-lg">
          <LayoutCard />
        </Col>
        <Col sm={12} md={3} lg={3} xl={3} className="px-0 my-3 mx-1 shadow-lg">
          <LayoutCard />
        </Col>
        <Col sm={12} md={3} lg={3} xl={3} className="px-0 my-3 mx-1 shadow-lg">
          <LayoutCard />
        </Col>
        <Col sm={12} md={3} lg={3} xl={3} className="px-0 my-3 mx-1 shadow-lg">
          <LayoutCard />
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryLayout;
