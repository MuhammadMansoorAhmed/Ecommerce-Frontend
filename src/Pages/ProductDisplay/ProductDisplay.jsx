import { Container } from "react-bootstrap";
import ProductDisplayComponent from "../../Components/ProductDisplayComponent/ProductDisplayComponent";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";

const ProductDisplay = () => {
  return (
    <>
      <NavbarComponent />
      <ProductDisplayComponent />
    </>
  );
};

export default ProductDisplay;
