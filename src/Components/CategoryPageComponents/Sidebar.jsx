/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiDotOutlineFill } from "react-icons/pi";
import "./SidebarOption.css";
import NavbarComponent from "../Navbar/NavbarComponent";
import { MdDashboard } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { HiShoppingBag } from "react-icons/hi2";
import { GiConverseShoe } from "react-icons/gi";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const [itemMenu, setitemMenu] = useState(null);

  const handleItemMenu = (item) => {
    setitemMenu(item === itemMenu ? null : item);
  };

  return (
    <>
      <NavbarComponent />
      <div
        className="d-flex position-relative w-100"
        // style={{ paddingInline: "12%" }}
      >
        <div
          className="sidebarContent text-white flex-column h-100 "
          style={{ backgroundColor: "#eee" }}
        >
          <div
            className={`moboDisplay d-flex justify-content-md-start justify-content-center align-items-center p-md-2 mb-2 mx-2  `}
            style={{ borderRadius: "6px", backgroundColor: "transparent" }}
          >
            <h4
              className={`moboTextDisplay iconHover my-md-2 fw-bold  `}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(0)}
            >
              Categories
            </h4>
            <MdDashboard
              size={25}
              className="my-1 text-secondary sidebarIconDisplay"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/category/clothing/women")}
            />
          </div>
          {/* //Clothing */}
          <div
            className="d-flex  align-items-center align-items-md-start flex-column p-md-2 mx-2 my-2 "
            style={{ borderRadius: "6px" }}
          >
            <a
              className="mainCategoryItem moboTextDisplay w-100 d-flex mb-0   "
              onClick={() => handleItemMenu("Clothing")}
            >
              <span className="moboTextDisplay">Clothing</span>
            </a>
            <GiClothes
              size={25}
              className="my-1 text-secondary sidebarIconDisplay"
              style={{ cursor: "pointer" }}
              onClick={() => handleItemMenu("Clothing")}
            />
            {itemMenu === "Clothing" && (
              <div className="d-flex flex-column align-items-md-start align-items-center">
                <div
                  className={`${
                    itemMenu
                      ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2 subItem"
                      : "d-none"
                  } `}
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/category/clothing/men")}
                >
                  <PiDotOutlineFill size={20} className="moboTextDisplay" />
                  <span className=" " style={{ fontWeight: 600 }}>
                    Men
                  </span>
                </div>

                <div
                  className={`${
                    itemMenu
                      ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2 subItem"
                      : "d-none"
                  } `}
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/category/clothing/women")}
                >
                  <PiDotOutlineFill size={20} className="moboTextDisplay" />
                  <span className="" style={{ fontWeight: 600 }}>
                    Women
                  </span>
                </div>
                <div
                  className={`${
                    itemMenu
                      ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2 subItem"
                      : "d-none"
                  } `}
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/category/clothing/children")}
                >
                  <PiDotOutlineFill size={20} className="moboTextDisplay" />
                  <span className="" style={{ fontWeight: 600 }}>
                    children
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Shoes */}
          <div
            className="d-flex  align-items-center align-items-md-start flex-column p-md-2 mx-2 my-2"
            style={{ borderRadius: "6px" }}
          >
            <a
              className="mainCategoryItem moboTextDisplay w-100 d-flex justify-content-start mb-0   "
              onClick={() => handleItemMenu("Shoes")}
            >
              <span className="moboTextDisplay">Shoes</span>
            </a>
            <GiConverseShoe
              size={25}
              className="my-1 text-secondary sidebarIconDisplay"
              style={{ cursor: "pointer" }}
              onClick={() => handleItemMenu("Shoes")}
            />
            {itemMenu === "Shoes" && (
              <div className="d-flex flex-column align-items-md-start align-items-center">
                <div
                  className={`${
                    itemMenu
                      ? "d-flex justify-content-start w-100 px-4 py-2 subItem"
                      : "d-none"
                  } `}
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/category/shoes/men")}
                >
                  <PiDotOutlineFill size={20} className="moboTextDisplay" />
                  <span className="" style={{ fontWeight: 600 }}>
                    Men
                  </span>
                </div>

                <div
                  className={`${
                    itemMenu
                      ? "d-flex justify-content-start w-100 px-4 py-2 subItem"
                      : "d-none"
                  } `}
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/category/shoes/women")}
                >
                  <PiDotOutlineFill size={20} className="moboTextDisplay" />
                  <span className="" style={{ fontWeight: 600 }}>
                    Women
                  </span>
                </div>
                <div
                  className={`${
                    itemMenu
                      ? "d-flex justify-content-start w-100 px-4 py-2 subItem"
                      : "d-none"
                  } `}
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/category/shoes/children")}
                >
                  <PiDotOutlineFill size={20} className="moboTextDisplay" />
                  <span className="" style={{ fontWeight: 600 }}>
                    children
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Accessories */}
          <div
            className="d-flex  align-items-center align-items-md-start flex-column p-md-2 mx-2 my-2"
            style={{ borderRadius: "6px" }}
          >
            <a
              className="mainCategoryItem w-100 d-flex justify-content-between mb-0   "
              onClick={() => handleItemMenu("Accessories")}
            >
              <span className="moboTextDisplay">Accessories</span>
            </a>
            <HiShoppingBag
              size={25}
              className="text-secondary sidebarIconDisplay my-1"
              style={{ cursor: "pointer" }}
              onClick={() => handleItemMenu("Accessories")}
            />
            {itemMenu === "Accessories" && (
              <>
                <div
                  className={`${
                    itemMenu
                      ? "d-flex justify-content-start w-100 px-4 py-2 subItem"
                      : "d-none"
                  } `}
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/category/accessories/men")}
                >
                  <PiDotOutlineFill size={20} className="moboTextDisplay" />
                  <span className="" style={{ fontWeight: 600 }}>
                    Men
                  </span>
                </div>

                <div
                  className={`${
                    itemMenu
                      ? "d-flex justify-content-start w-100 px-4 py-2 subItem"
                      : "d-none"
                  } `}
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/category/accessories/women")}
                >
                  <PiDotOutlineFill size={20} className="moboTextDisplay" />
                  <span className="" style={{ fontWeight: 600 }}>
                    Women
                  </span>
                </div>
                <div
                  className={`${
                    itemMenu
                      ? "d-flex justify-content-start w-100 px-4 py-2 subItem"
                      : "d-none"
                  } `}
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/category/accessories/children")}
                >
                  <PiDotOutlineFill size={20} className="moboTextDisplay" />
                  <span className="" style={{ fontWeight: 600 }}>
                    children
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <main className="mainDashboard w-100 h-100">{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
