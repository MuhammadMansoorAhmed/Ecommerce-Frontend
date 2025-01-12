/* eslint-disable react/prop-types */
import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";
import Spinner from "react-bootstrap/Spinner";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsWithCategory } from "../../Redux/Services/productServices";
import { selectIsLoading } from "../../Redux/Features/productSlice";

const CategoryPageComponent = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await dispatch(getProductsWithCategory(category));
      setProducts(response.payload.data);
    };
    fetchProducts();
  }, [category, dispatch]);
  console.log(products);
  

  return (
    <>
      <h1 className="text-start my-2 text-secondary border-bottom" style={{}}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <Row
        className="d-flex w-100 h-100 justify-content-md-evenly flex-wrap "
        // style={{ width: "200px", height: "360px" }}
      >
        {!isLoading ? (
          Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <Col
                sm={6}
                md={3}
                lg={3}
                xl={3}
                key={product?._id}
                className="my-2"
              >
                <div className="w-100 h-100  ">
                  <BlurHashImageComponent
                    hash={product?.images[0]?.blurHash}
                    imgSrc={product?.images[0]?.url}
                    productId={product?.images[0]?._id}
                  />
                </div>
              </Col>
            ))
          ) : (
            <div>No Product Found</div>
          )
        ) : (
          <Spinner animation="grow" />
        )}
      </Row>
    </>
  );
};

export default CategoryPageComponent;
