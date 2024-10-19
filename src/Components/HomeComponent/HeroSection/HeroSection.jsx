/* eslint-disable react/prop-types */
import "./HeroSection.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HeroSection = ({
  model,
  HeadingText,
  SubHeadingText,
  BtnText,
  BtnDisplay,
}) => {
  return (
    <div className="position-relative d-flex justify-content-center">
      <div className="heroBackGround"></div>
      <div className="heroContent">
        <Row className="d-flex justify-content-evenly w-100 ">
          <Col sm={10} md={5} lg={5} xl={5} className="h-100 my-2 my-md-5">
            <div className="d-flex flex-column justify-content-center  h-100">
              <h1 className="" style={{ zIndex: 3 }}>
                {HeadingText}
              </h1>
              <h5>{SubHeadingText} </h5>
              <button className={`btnClass mt-3 ${BtnDisplay}`}>
                {BtnText}
              </button>
            </div>
          </Col>
          <Col sm={10} md={5} lg={5} xl={5} className="h-100 my-2 p-0">
            <img
              src={model}
              alt="image not found"
              className="hero-Content-image h-100 rounded-5"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeroSection;
