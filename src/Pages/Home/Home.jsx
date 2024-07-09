import CategoryCards from "../../Components/HomeComponent/CategoryCards/CategoryCards";
import HeroSection from "../../Components/HomeComponent/HeroSection/HeroSection";
import HomeFooter from "../../Components/HomeComponent/HomeFooter/HomeFooter";
import PopularProducts from "../../Components/HomeComponent/PopularProduct/PopularProducts";
import Sales from "../../Components/HomeComponent/Sales/Sales";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import model from "../../assets/model.jpg";

const Home = () => {
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
      <PopularProducts />
      <HomeFooter />
    </div>
  );
};

export default Home;
