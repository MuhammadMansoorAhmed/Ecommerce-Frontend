import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="d-flex justify-content-start flex-column w-100">
      <p
        style={{
          fontSize: "32px",
          fontFamily: "font-family: Ubuntu, sans-serif",
          color: "#212529",
          fontWeight: "600",
          marginTop: "10px",
          marginBottom: "6px",
        }}
      >
        ESSENTIAL STRUCTURED BLAZER
      </p>
      <p
        style={{
          fontFamily: "font-family: Ubuntu, sans-serif",
          color: "#666",
          marginBottom: "10px",
        }}
      >
        Brand Name{" "}
      </p>
      <p
        style={{
          fontSize: "40px",
          fontFamily: "font-family: Ubuntu, sans-serif",
          color: "#212529",
          marginBottom: "0px",
        }}
      >
        $75
      </p>
      <p
        style={{
          fontSize: "18px",
          fontFamily: "font-family: Ubuntu, sans-serif",
          color: "#666",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        description
      </p>
      <div className="d-flex justfy-content-evenly w-100 mt-4">
        <div className="w-100">
          Quantity:
          <span className=" quantityBtnContainer">
            <button onClick={handleDecrementQuantity}>-</button>
            <p className="d-inline px-4">{quantity}</p>
            <button onClick={handleIncrementQuantity}>+</button>
          </span>
          <button
            className="addToCartBtn"
            onClick={() => {
              navigate("/order/:id");
            }}
          >
            Place Order
          </button>
          <hr className="text-secondary my-4" />
        </div>
      </div>
      <div className="d-flex  flex-column justify-content-center">
        <div className="availability">
          <h6 className="d-inline ">Availability: </h6>
          <span className="ms-3"> Values</span>
        </div>
        <div className="availability">
          <h6 className="d-inline ">Availability Colors: </h6>
          <span className="ms-3"> Values</span>
        </div>
        <div className="availability">
          <h6 className="d-inline ">Availability Size: </h6>
          <span className="ms-3"> Values</span>
        </div>
        <div className="availability">
          <h6 className="d-inline ">Promotion: </h6>
          <span className="ms-3"> Values</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
