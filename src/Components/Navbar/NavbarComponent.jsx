import "./NavbarCSS.css";
import CategoryNavigation from "./CategoryNavigation";
import NavBar from "./NavBar";
import React from "react";

const NavbarComponent = () => {
  return (
    <>
      <NavBar />
      <CategoryNavigation />
    </>
  );
};

export default React.memo(NavbarComponent);
