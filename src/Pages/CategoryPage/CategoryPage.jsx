import CategoryPageComponent from "../../Components/CategoryPageComponents/CategoryPageComponent";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";

const CategoryPage = () => {
  return (
    <div className="w-100 p-4 p-md-0">
      <NavbarComponent />
      <CategoryPageComponent />
    </div>
  );
};

export default CategoryPage;
