/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";
import { useEffect, useState } from "react";
import { getProductsWithCategoryId } from "../../Redux/Services/productServices";

const RelatedProductsComponent = ({ category, dispatch }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    const getProductByCategory = async () => {
      const response = await dispatch(getProductsWithCategoryId(category));
      setRelatedProducts(response?.payload?.data);
    };
    getProductByCategory();
  }, [category, dispatch]);
  return (
    <Row className="d-flex justify-content-center clign-items-center ">
      <hr className="text-secondary" />
      <h4 className="text-center my-4">Related Products</h4>

      {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
        relatedProducts.map((product) => (
          <Col
            sm={10}
            md={3}
            lg={3}
            xl={3}
            className="d-flex flex-column position-relative"
            key={product._id}
          >
            <BlurHashImageComponent
              hash={product?.images[0]?.blurHash}
              imgSrc={product?.images[0]?.url}
              productId={product?._id}
            />
            <div className="position-absolute">
              <span></span>
            </div>
            <div className="mt-3">
              <p
                className="m-0 text-secondary fw-bold"
                style={{ fontSize: "14px" }}
              >
                {product?.category?.category}
              </p>
              <h6>{product?.name}</h6>
              <p className="fw-bold" style={{ fontSize: "16px" }}>
                PKR: {product?.price}
              </p>
            </div>
          </Col>
        ))
      ) : (
        <div> No Reated Products Found</div>
      )}
      {/*       
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
      </Col> */}
    </Row>
  );
};

export default RelatedProductsComponent;
