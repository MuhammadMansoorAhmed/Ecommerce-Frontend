/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./ProductScroll.css"; // Import custom styles
import { getProductsWithCategoryName } from "../../Redux/Services/productServices";
import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";

export default function ProductScroll({ scrollDirection, category }) {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await dispatch(getProductsWithCategoryName(category));

        if (response?.payload?.data) {
          setProducts(response.payload.data.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };
    fetchProducts();
  }, [category, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: scrollDirection === "right" ? 300 : -300,
          behavior: "smooth",
        });
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [scrollDirection]);

  return (
    <>
      {products.length > 0 && (
        <div className="container-fluid py-4 bg-light rounded shadow-sm px-2">
          <h4 className="border-0 mb-3 pb-0">{category.toUpperCase()}</h4>

          <div
            ref={scrollRef}
            className="d-flex  overflow-auto product-scroll-wrapper px-3"
          >
            <div className="d-flex">
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="product-card flex-shrink-0 border rounded shadow-sm mx-2 mb-3 bg-light"
                >
                  <BlurHashImageComponent product={product} />
                  {/* <h5 className="mt-3 mb-1 text-dark">{product.title}</h5> */}
                  {/* <p className="text-muted">${product.price}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
