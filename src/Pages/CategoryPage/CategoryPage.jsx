import { useParams } from "react-router-dom";
import CategoryPageComponent from "../../Components/CategoryPageComponents/CategoryPageComponent";
import HomeFooter from "../../Components/HomeComponent/HomeFooter/HomeFooter";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";

const CategoryPage = () => {
  const { category } = useParams();
  return (
    <div className="w-100 p-4 p-md-0">
      <NavbarComponent />
      <CategoryPageComponent category={category} />
      <HomeFooter />
    </div>
  );
};

export default CategoryPage;
