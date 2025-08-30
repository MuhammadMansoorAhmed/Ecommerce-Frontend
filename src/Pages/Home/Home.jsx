import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import HomeFooter from "../../Components/HomeComponent/HomeFooter/HomeFooter";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import CategoryPageComponent from "../../Components/CategoryPageComponents/CategoryPageComponent";
import ProductScroll from "../../Components/ProductScroll/ProductScroll";
import {
  getAllProducts,
  getProductsWithCategoryName,
} from "../../Redux/Services/productServices";
import { getAllCartItemsByUserId } from "../../Redux/Services/cartServices";
import usePerformance from "../../Hooks/usePerformance";
import { Spinner } from "react-bootstrap";
// import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { measureComponentRender } = usePerformance();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Get cart data once for all components (use shallowEqual to reduce rerenders)
  const cartItems = useSelector(
    (state) => state.cart?.cartItems || [],
    shallowEqual
  );

  // Get product data from Redux store
  const allProducts = useSelector(
    (state) => state.product?.products || [],
    shallowEqual
  );
  const clothsProducts = useSelector(
    (state) => state.product?.categoryProducts?.cloths || [],
    shallowEqual
  );
  const perfumesProducts = useSelector(
    (state) => state.product?.categoryProducts?.["ravaah perfumes"] || [],
    shallowEqual
  );

  // Measure component render performance
  const endRenderMeasurement = measureComponentRender("HomePage");

  useEffect(() => {
    endRenderMeasurement();
  }, [endRenderMeasurement]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
    };
    checkLoginStatus();
  }, []);

  // Fetch all data in parallel for better performance
  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        const promises = [
          dispatch(getAllProducts()),
          dispatch(getProductsWithCategoryName("cloths")),
          dispatch(getProductsWithCategoryName("ravaah perfumes")),
        ];

        if (isLoggedIn) {
          promises.push(dispatch(getAllCartItemsByUserId()));
        }

        await Promise.all(promises);
        if (isMounted) setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching home page data:", error);
        if (isMounted) setIsDataLoaded(true); // Still set to true to show fallback
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, isLoggedIn]);

  // Memoize category data to prevent unnecessary re-renders
  const categoryData = useMemo(() => {
    return {
      allProducts,
      clothsProducts: clothsProducts.slice(0, 10),
      perfumesProducts: perfumesProducts.slice(0, 10),
    };
  }, [allProducts, clothsProducts, perfumesProducts]);

  // End performance measurement
  useEffect(() => {
    endRenderMeasurement();
  }, [endRenderMeasurement]);

  if (!isDataLoaded) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="home-page">
      <NavbarComponent />

      <div className="container-fluid">
        <CategoryPageComponent
          category="all"
          cartItems={cartItems}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <div className="p-2">
        <ProductScroll
          scrollDirection="right"
          category="cloths"
          cartItems={cartItems}
          isLoggedIn={isLoggedIn}
          preloadedProducts={categoryData.clothsProducts}
        />
      </div>

      <div className="p-2">
        <ProductScroll
          scrollDirection="left"
          category="ravaah perfumes"
          cartItems={cartItems}
          isLoggedIn={isLoggedIn}
          preloadedProducts={categoryData.perfumesProducts}
        />
      </div>

      <HomeFooter />
    </div>
  );
};

export default React.memo(Home);
