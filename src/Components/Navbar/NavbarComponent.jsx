import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarCSS.css";
import { Link } from "react-router-dom";
import "./NavbarCSS.css";
import CategoryNavigation from "./CategoryNavigation";

const NavbarComponent = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className={`py-0 position-md-relative position-lg-relative position-md-fixed w-100 bg-light border-bottom sticky-top
      }`}
        style={{ top: 0, left: 0, transition: "top 0.3s" }}
      >
        <Container className="py-3">
          <Navbar.Toggle aria-controls="basic-navbar-nav bg-sm-light" />
          <Navbar.Collapse id="basic-navbar-nav border ">
            <div className="d-flex ">
              <Link className="navHover mx-2" to={"/"}>
                Home
              </Link>
              <Link className="navHover mx-2" to={"/blog"}>
                Blog
              </Link>
              <Link className="navHover mx-2" to={"/contact"}>
                Contact
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CategoryNavigation />
    </>
  );
};

export default NavbarComponent;

