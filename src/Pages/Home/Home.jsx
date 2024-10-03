import { useEffect, useState } from "react";
import CategoryCards from "../../Components/HomeComponent/CategoryCards/CategoryCards";
import HeroSection from "../../Components/HomeComponent/HeroSection/HeroSection";
import HomeFooter from "../../Components/HomeComponent/HomeFooter/HomeFooter";
import PopularProducts from "../../Components/HomeComponent/PopularProduct/PopularProducts";
import Sales from "../../Components/HomeComponent/Sales/Sales";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import model from "../../assets/model.jpg";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../Redux/Services/productServices";

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

  const popularProducts = products.slice(0, 4);
  console.log(popularProducts);

  return (
    <div>
      <NavbarComponent />
      <HeroSection
        model={model}
        HeadingText={"New Collection"}
        SubHeadingText={
          "Our New Collection is here press the button to shop now"
        }
        BtnText={"View Collection"}
      />
      <CategoryCards />
      <Sales />
      <PopularProducts popularProducts={popularProducts} />
      <HomeFooter />
    </div>
  );
};

export default Home;
