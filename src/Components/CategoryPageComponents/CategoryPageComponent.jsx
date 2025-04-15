/* eslint-disable react/prop-types */
import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";
import Spinner from "react-bootstrap/Spinner";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductsWithCategory,
} from "../../Redux/Services/productServices";
import {
  selectIsLoading,
  selectIsSuccess,
  selectIsError,
} from "../../Redux/Features/productSlice";

const CategoryPageComponent = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const isLoading = useSelector(selectIsLoading);
  const isSuccess = useSelector(selectIsSuccess);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (location.pathname === "/" || category === "all") {
          response = await dispatch(getAllProducts());
        } else if (category && category !== "undefined") {
          response = await dispatch(getProductsWithCategory(category));
        }

        if (response?.payload?.data) {
          setProducts(response.payload.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [category, dispatch]);

  return (
    <>
      <Container className="text-center  my-3">
        {/* <h3 className="mt-3">Products</h3> */}
        <Row className="d-flex w-100 justify-content-md-evenly flex-wrap">
          {!isLoading && isSuccess ? (
            Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <Col
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                  key={product?._id}
                  className="mt-2 mb-5 px-2"
                >
                  <div
                    className="w-100 "
                    style={{ maxHeight: "390px", minHeight: "350px" }}
                  >
                    <BlurHashImageComponent
                      hash={product?.images[0]?.blurHash}
                      imgSrc={product?.images[0]?.url}
                      productId={product?._id}
                    />
                  </div>
                  <div className="d-flex flex-column text-start px-2 py-2 ">
                    <h6 className="my-0 py-1">{product?.name}</h6>
                    <p className="my-0 py-1">{product?.description}</p>
                    <p className="my-0 py-1">Price: {product?.price}</p>
                    {/* <button className="btn btn-primary">Add to Cart</button> */}
                  </div>
                </Col>
              ))
            ) : (
              <div>No Product Found</div>
            )
          ) : isLoading ? (
            <Spinner animation="grow" />
          ) : (
            isError && <div>No Product Found</div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CategoryPageComponent;
