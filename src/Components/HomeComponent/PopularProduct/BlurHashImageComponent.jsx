/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  AddtoCart,
  getAllCartItemsByUserId,
} from "../../../Redux/Services/cartServices";
import { toast } from "react-toastify";
import TooltipWrapper from "../../TooltipWrapper";
import "./BlurHashImageComponent.css";

const BlurHashImageComponent = ({ product }) => {
  const {
    _id: productId,
    images,
    price,
    discount,
    discountedPrice,
    name,
    colors = [],
  } = product;

  const imgSrc = images?.[0]?.url || "";
  const hash = images?.[0]?.blurHash || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getLogInStatus = localStorage.getItem("isLoggedIn");
    if (getLogInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const getUserCartProducts = async () => {
      if (isLoggedIn) {
        const response = await dispatch(getAllCartItemsByUserId());
        setCartProducts(response.payload.data);
      }
    };
    getUserCartProducts();
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = imgSrc;
  }, [imgSrc]);

  const addProductToCart = async () => {
    try {
      await dispatch(AddtoCart(productId));
    } catch (error) {
      toast.error("Failed to add product to the cart");
    }
  };

  const isProductInCart = cartProducts?.some(
    (item) => item.productId && item.productId._id === productId
  );

  return (
    <div className="product-image-wrapper d-flex flex-column h-100">
      <div className="image-container position-relative">
        {!imageLoaded ? (
          <Blurhash
            hash={hash}
            width="100%"
            height={250}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        ) : (
          <img
            src={imgSrc}
            alt="Product"
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        )}

        {isLoggedIn && (
          <div
            className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.85)",
              padding: "6px",
              borderRadius: "6px",
            }}
          >
            <TooltipWrapper
              tooltip={isProductInCart ? "Already in cart" : "Add to Cart"}
            >
              <BsFillCartCheckFill
                size={18}
                className={isProductInCart ? "checkedIcon" : "hoverIcon"}
                onClick={addProductToCart}
                style={{ cursor: "pointer" }}
              />
            </TooltipWrapper>
            <TooltipWrapper tooltip="Go to Cart">
              <MdShoppingCartCheckout
                size={18}
                className="hoverIcon"
                onClick={() => navigate("/cart")}
                style={{ cursor: "pointer" }}
              />
            </TooltipWrapper>
          </div>
        )}
      </div>

      <div className="product-details text-center mt-2">
        <h6 className="fw-semibold text-truncate" title={name}>
          {name}
        </h6>

        {discount > 0 ? (
          <div className="d-flex justify-content-center gap-2 align-items-center">
            <span className="text-danger fw-bold">Rs {discountedPrice}</span>
            <small className="text-muted text-decoration-line-through">
              Rs {price}
            </small>
            <span className="badge bg-success">{discount}% off</span>
          </div>
        ) : (
          <div className="fw-bold text-primary">Rs {price}</div>
        )}

        {/* Color Circles */}
        {colors.length > 0 && (
          <div className="d-flex justify-content-center gap-2 mt-2 flex-wrap">
            {colors.map((color, index) => (
              <span
                key={index}
                style={{
                  width: "18px",
                  height: "18px",
                  backgroundColor: color, // ✅ This shows the actual color
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                }}
                title={color} // Optional: shows color code on hover
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-2">
        <button
          className="btn btn-outline-primary btn-sm w-100"
          onClick={() => navigate(`/product/${productId}`)}
        >
          Product Details
        </button>
      </div>
    </div>
  );
};

export default BlurHashImageComponent;
