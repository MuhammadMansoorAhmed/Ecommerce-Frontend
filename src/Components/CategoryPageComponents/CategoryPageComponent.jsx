/* eslint-disable react/prop-types */
import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";
import product1 from "../../assets/product1.jpg";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const CategoryPageComponent = () => {
  const { categoryId } = useParams();

  return (
    <Row
      className="d-flex w-100 h-100 justify-content-center flex-wrap "
      // style={{ width: "200px", height: "360px" }}
    >
      <h1 className="text-start my-2 text-secondary border-bottom">
        {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
      </h1>
      <Col sm={6} md={3} lg={3} xl={3}>
        <div className="w-100 h-100  p-2">
          <BlurHashImageComponent
            hash="LLC6okkCacs.~VocNHbH-VoxR+od"
            imgSrc={product1}
          />
        </div>
      </Col>
      <Col sm={6} md={3} lg={3} xl={3}>
        <div className="w-100 h-100  p-2">
          <BlurHashImageComponent
            hash="LLC6okkCacs.~VocNHbH-VoxR+od"
            imgSrc={product1}
          />
        </div>
      </Col>
      <Col sm={6} md={3} lg={3} xl={3}>
        <div className="w-100 h-100  p-2">
          <BlurHashImageComponent
            hash="LLC6okkCacs.~VocNHbH-VoxR+od"
            imgSrc={product1}
          />
        </div>
      </Col>
      <Col sm={6} md={3} lg={3} xl={3}>
        <div className="w-100 h-100  p-2">
          <BlurHashImageComponent
            hash="LLC6okkCacs.~VocNHbH-VoxR+od"
            imgSrc={product1}
          />
        </div>
      </Col>
      <Col sm={6} md={3} lg={3} xl={3}>
        <div className="w-100 h-100  p-2">
          <BlurHashImageComponent
            hash="LLC6okkCacs.~VocNHbH-VoxR+od"
            imgSrc={product1}
          />
        </div>
      </Col>
    </Row>
  );
};

export default CategoryPageComponent;
