import { useEffect, useState } from "react";
import HomeFooter from "../../Components/HomeComponent/HomeFooter/HomeFooter";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../Redux/Services/productServices";
import CategoryPageComponent from "../../Components/CategoryPageComponents/CategoryPageComponent";

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await dispatch(getAllProducts());
      setProducts(response.payload.data);
    };
    fetchProducts();
  }, [dispatch]);

  // const popularProducts = products?.slice(0, 4);

  return (
    <div>
      <NavbarComponent />
      {/* <CategoryCards /> */}
      {/* <PopularProducts popularProducts={popularProducts} /> */}
      <div className="container-fluid">
        <CategoryPageComponent />
      </div>{" "}
      <HomeFooter />
    </div>
  );
};

export default Home;
