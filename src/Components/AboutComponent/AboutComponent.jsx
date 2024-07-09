import React from "react";
import NavbarComponent from "../Navbar/NavbarComponent";
import HeroSection from "../HomeComponent/HeroSection/HeroSection";

const AboutComponent = () => {
  return (
    <div>
      <NavbarComponent />
      <HeroSection sectionImage={"ContactHeroImage"} />
    </div>
  );
};

export default AboutComponent;
