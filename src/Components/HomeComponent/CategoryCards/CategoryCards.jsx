import { Col, Row } from "react-bootstrap";
import accessories from "../../../assets/Accesssories.jpg";
import shirts from "../../../assets/Shirts.jpg";
import shoes from "../../../assets/Shoes.jpg";
import "./CategoryCards.css";

const CategoryCards = () => {
  return (
    <div className="p-md-5 p-1 d-flex justify-content-center">
      <Row className="py-3">
        <Col
          sm={10}
          md={4}
          lg={4}
          xl={4}
          className="position-relative textHover mb-2"
        >
          <img src={accessories} alt="Accessories" className="w-100 imgHover" />
          <div className=" centerAlign  ">
            <h4 className="categoryHeading">Accessories</h4>
          </div>
        </Col>
        <Col
          sm={10}
          md={4}
          lg={4}
          xl={4}
          className="position-relative textHover mb-2"
        >
          <img src={shirts} alt="shirts" className="w-100 imgHover" />
          <div className=" centerAlign ">
            <h4 className="categoryHeading">Shirts</h4>
          </div>
        </Col>
        <Col
          sm={10}
          md={4}
          lg={4}
          xl={4}
          className="position-relative textHover mb-2"
        >
          <img src={shoes} alt="Shoes" className="w-100 imgHover" />
          <div className=" centerAlign ">
            <h4 className="categoryHeading">Shoes</h4>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryCards;
