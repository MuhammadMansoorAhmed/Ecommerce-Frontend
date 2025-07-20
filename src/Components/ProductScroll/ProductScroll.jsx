/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./ProductScroll.css";
import { getProductsWithCategoryName } from "../../Redux/Services/productServices";
import BlurHashImageComponent from "../HomeComponent/PopularProduct/BlurHashImageComponent";

export default function ProductScroll({
  scrollDirection = "right",
  category = "",
}) {
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
    const container = scrollRef.current;
    if (!container) return;

    let observer;
    let scrollIntervalId;
    const scrollAmount = 300;

    const scrollLeftLoop = () => {
      if (container.scrollLeft <= 0) {
        // 1. Instantly scroll to end
        container.scrollLeft = container.scrollWidth - container.offsetWidth;

        // 2. Delay the next scroll so the reset takes effect visually
        setTimeout(() => {
          container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }, 200);
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    };

    const scrollRightLoop = () => {
      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth - 1
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    const startAutoScroll = () => {
      scrollIntervalId = setInterval(() => {
        if (!container) return;

        if (scrollDirection === "right") {
          scrollRightLoop();
        } else {
          scrollLeftLoop();
        }
      }, 3000);
    };

    const stopAutoScroll = () => {
      if (scrollIntervalId) clearInterval(scrollIntervalId);
    };

    const scrollToEndIfLeft = () => {
      if (scrollDirection === "left") {
        // Ensure we always start from the rightmost end
        container.scrollLeft = container.scrollWidth - container.offsetWidth;
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          scrollToEndIfLeft(); // On first enter
          startAutoScroll();
        } else {
          stopAutoScroll();
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(container);

    return () => {
      stopAutoScroll();
      if (observer && container) observer.unobserve(container);
    };
  }, [scrollDirection]);

  return (
    <>
      {products.length > 0 && (
        <div className="container-fluid py-4 bg-light rounded shadow-sm px-2">
          <h4 className="border-0 mb-3 pb-0 text-uppercase">{category}</h4>

          <div ref={scrollRef} className="product-scroll-wrapper px-1">
            <div className="product-scroll-inner">
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="product-card bg-white shadow-sm"
                >
                  <BlurHashImageComponent product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
