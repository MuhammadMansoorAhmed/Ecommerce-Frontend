/* eslint-disable react/prop-types */
import { FaOpencart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import "./BlurHashImageComponent.css";
import { useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AddtoCart } from "../../../Redux/Services/cartServices";
import { toast } from "react-toastify";

const BlurHashImageComponent = ({ imgSrc, hash, productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectAddtoCart, setSelectAddtoCart] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = imgSrc;
  }, [imgSrc]);

  const addProductToCart = async (productId) => {
    try {
      await dispatch(AddtoCart(productId));
    } catch (error) {
      toast.error("failed to add product to the cart");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Display BlurHash if the image hasn't loaded */}
      {!imageLoaded && (
        <Blurhash
          hash={hash}
          width={250}
          height={300}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}

      {/* Show image after it has loaded */}
      <div>
        <img
          style={{
            display: imageLoaded ? "block" : "none",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            maxHeight: "350px",
            minHeight: "300px",
            overflow: "hidden",
          }}
          src={imgSrc}
          alt="Product Image"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>
      {/* AddtoCart Icon */}
      <div
        className={` d-block  `}
        // ${hover ? "d-block" : "d-none"}
        style={{
          position: "absolute",
          zIndex: 3,
          top: 10,
          right: 8,
          boxShadow: "2px",
          borderRadius: "6px",
          backgroundColor: "rgba(196, 204, 216, 0.56)",
          border: "1px solid rgba(196, 204, 216, 0.70)",
        }}
        onMouseEnter={() => setHover(true)}
      >
        <BsFillCartCheckFill
          size={20}
          className="hoverIcon"
          // style={{
          //   fill: `${selectAddtoCart ? "#0080ff" : ""}`,
          // }}
          onClick={() => {
            const newValue = !selectAddtoCart;
            setSelectAddtoCart(newValue);
            addProductToCart(productId);
          }}
        />
        <FaOpencart
          size={20}
          className="hoverIcon"
          onClick={() => {
            navigate("/cart");
          }}
        />
      </div>

      {/* Add to Cart Button */}
      <div className="add-to-cart-container">
        <button
          className="order-btn"
          type="button"
          onClick={() => navigate(`/product/${productId}`)}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default BlurHashImageComponent;
