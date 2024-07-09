import HeroSection from "../HomeComponent/HeroSection/HeroSection";
import NavbarComponent from "../Navbar/NavbarComponent";
import ContactHeroImage from "../../assets/Contact.jpg";
import ContactForm from "./ContactForm";

const ContactComponent = () => {
  return (
    <>
      <NavbarComponent />
      {/* <ContactHeroSection /> */}
      <HeroSection
        model={ContactHeroImage}
        BtnDisplay={"d-none"}
        HeadingText={"Contact US"}
        SubHeadingText={"We Are Working Tirelessly To Best Customer Support "}
      />
      <ContactForm />
    </>
  );
};

export default ContactComponent;
