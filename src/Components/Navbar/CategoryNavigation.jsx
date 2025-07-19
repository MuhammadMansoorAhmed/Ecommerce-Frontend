import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../Redux/Services/categoryServices";
import {
  selectCategories,
  selectIsLoadingState,
} from "../../Redux/Features/categorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import "./CategoryNavigation.css"; // for styles

const CategoryNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category: routeCategory } = useParams(); // get category from URL

  const isLoading = useSelector(selectIsLoadingState);
  const getcategories = useSelector(selectCategories);
  const [activeCategory, setActiveCategory] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (getcategories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [dispatch, getcategories.length]);

  useEffect(() => {
    if (routeCategory) {
      setActiveCategory(routeCategory);
    } else if (getcategories.length > 0) {
      setActiveCategory(getcategories[0]._id);
    }
  }, [routeCategory, getcategories]);

  const handleTabClick = (id) => {
    setActiveCategory(id);
    navigate(`/products/category/${id}`);
  };

  return (
    <>
      {!isLoading && getcategories.length > 0 && (
        <div
          className="custom-tab-wrapper border-top border-bottom py-md-3 py-2 px-3"
          ref={containerRef}
        >
          <div className="custom-tab-list d-flex gap-3">
            {getcategories.map((cat) => (
              <div
                key={cat._id}
                className={`custom-tab px-3 py-2 d-flex align-items-center gap-2 text-uppercase ${
                  activeCategory === cat._id ? "active" : ""
                }`}
                onClick={() => handleTabClick(cat._id)}
              >
                <GoDotFill size={8} />
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryNavigation;
