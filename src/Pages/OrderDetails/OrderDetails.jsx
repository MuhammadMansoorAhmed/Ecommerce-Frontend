import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import HomeFooter from "../../Components/HomeComponent/HomeFooter/HomeFooter";
import OrderDetailsComponent from "../../Components/OrderDetailsComponent/OrderDetailsComponent";

const OrderDisplay = () => {
  return (
    <div>
      <NavbarComponent />
      <OrderDetailsComponent />
      <HomeFooter />
    </div>
  );
};

export default OrderDisplay;
