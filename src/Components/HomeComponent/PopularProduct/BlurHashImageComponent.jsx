/* eslint-disable react/prop-types */
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import "./BlurHashImageComponent.css";
import { useNavigate } from "react-router-dom";

const BlurHashImageComponent = ({ imgSrc, hash }) => {
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
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {!imageLoaded && (
        <Blurhash
          hash={hash}
          width={300}
          height={470}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      <img
        style={{
          display: imageLoaded ? "block" : "none",
          width: "100%",
          height: "100%",
        }}
        src={imgSrc}
        alt="img not found"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
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
            color: "#dadde2",
            margin: "4px 12px",
            fill: `${selectFavorite ? "#FF0000" : ""}  `,
          }}
          onClick={handleFavoriteClick}
          onMouseEnter={() => setHover(true)}

          // className="mx-3 my-1"
        />
      </div>
      <div
        className="add-to-cart-container"
        onMouseEnter={() => setHover(true)}
      >
        <button
          className={`add-to-cart ${hover ? "d-block" : "d-none"}`}
          type="button"
          onClick={() => navigate("/product/:id")}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default BlurHashImageComponent;
