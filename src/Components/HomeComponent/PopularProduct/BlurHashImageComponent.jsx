/* eslint-disable react/prop-types */
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import "./BlurHashImageComponent.css";
import { useNavigate } from "react-router-dom";

const BlurHashImageComponent = ({ imgSrc, hash, productId }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectFavorite, setSelectFavorite] = useState(false);
  const [hover, setHover] = useState(false);

  const handleFavoriteClick = () => {
    setSelectFavorite(!selectFavorite);
  };

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = imgSrc;
  }, [imgSrc]);

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
      <img
        style={{
          display: imageLoaded ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={imgSrc}
        alt="Product Image"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />

      {/* Favorite Icon */}
      <div
        className={`bg-light ${hover ? "d-block" : "d-none"}`}
        style={{
          position: "absolute",
          zIndex: 3,
          top: 10,
          right: 10,
        }}
        onMouseEnter={() => setHover(true)}
      >
        <FaHeart
          size={20}
          className="hoverIcon"
          style={{
            fill: `${selectFavorite ? "#FF0000" : ""}`,
          }}
          onClick={handleFavoriteClick}
          onMouseEnter={() => setHover(true)}
        />
      </div>

      {/* Add to Cart Button */}
      <div
        className="add-to-cart-container"
        onMouseEnter={() => setHover(true)}
      >
        <button
          className={`add-to-cart ${hover ? "d-block" : "d-none"}`}
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
