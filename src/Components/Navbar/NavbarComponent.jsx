import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarCSS.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Col, Row } from "react-bootstrap";
import "./NavbarCSS.css";

const NavbarComponent = () => {
  const [showNavList, setShowNavList] = useState(false);
  const [showPageList, setShowPageList] = useState(false);

  const onMouseHover = () => {
    setShowNavList(true);
    setShowPageList(false);
  };
  const onMouseRelease = () => {
    setShowNavList(false);
  };
  const onMouseHoverPage = () => {
    setShowPageList(true);
    setShowNavList(false);
  };
  const onMouseReleasePage = () => {
    setShowPageList(false);
  };

  function isActive(path) {
    return window.location.pathname === path;
  }

  return (
    <Navbar
      expand="lg"
      className={`py-3 position-md-relative position-lg-relative position-md-fixed w-100 bg-light border-bottom sticky-top
      }`}
      style={{ top: 0, left: 0, transition: "top 0.3s" }}
    >
      <Container className="py-3">
        <Navbar.Toggle aria-controls="basic-navbar-nav bg-sm-light" />
        <Navbar.Collapse id="basic-navbar-nav border ">
          <div className="d-flex ">
            <Link
              className="navHover mx-2"
              onMouseEnter={onMouseHover}
              // onMouseLeave={onMouseRelease}
            >
              Shop
              <IoIosArrowDown />
            </Link>
            <Link
              className="navHover mx-2"
              onMouseEnter={onMouseHoverPage}
              // onMouseLeave={onMouseRelease}
            >
              Pages
              <IoIosArrowDown />
            </Link>
            <Link className="navHover mx-2" to={"/blog"}>
              Blog
            </Link>
            <Link className="navHover mx-2" to={"/contact"}>
              Contact
            </Link>
          </div>
          <div
            className={`${showNavList ? "shopDropdownList" : "d-none"}`}
            // onMouseEnter={onMouseHover}
            onMouseLeave={onMouseRelease}
          >
            <Row>
              <Col sm={10} md={3} lg={3} xl={3}>
                <div className="py-3  border-right border-start">
                  <p
                    className="border-bottom px-3 py-2"
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    Women's Collection
                  </p>
                  <ul className="">
                    <li>
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/women"
                      >
                        Dresses
                      </a>
                    </li>
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/women"
                      >
                        T-shirts
                      </a>
                    </li>
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/women"
                      >
                        Blouses & Shirts
                      </a>
                    </li>
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/women"
                      >
                        Jeans
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col sm={10} md={3} lg={3} xl={3}>
                <div className="py-3  border-right border-start">
                  <p
                    className="border-bottom px-3 py-2"
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    Men's Collection
                  </p>
                  <ul className="">
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/mens"
                      >
                        Dresses
                      </a>
                    </li>
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/women"
                      >
                        T-Shirts
                      </a>
                    </li>
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/women"
                      >
                        Shirts
                      </a>
                    </li>
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/women"
                      >
                        Jeans
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col sm={10} md={3} lg={3} xl={3}>
                <div className="py-3  border-right border-start">
                  <p
                    className="border-bottom px-3 py-2"
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    Kid's Collection
                  </p>
                  <ul className="">
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/children"
                      >
                        Dresses
                      </a>
                    </li>
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/children"
                      >
                        T-Shirts
                      </a>
                    </li>
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/mens"
                      >
                        Shirts
                      </a>
                    </li>
                    <li className="category-item">
                      {" "}
                      <a
                        className="category-item text-decoration-none "
                        href="/category/clothing/mens"
                      >
                        Jeans
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col sm={10} md={3} lg={3} xl={3}>
                <div className="py-3  border-right border-start">
                  <p
                    className="border-bottom px-3 py-2"
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    Assessories
                  </p>
                  <ul className="">
                    <li className="category-item">Watches</li>
                    {/* <li>T-Shirts</li>
                    <li>Shirts</li>
                    <li>Jeans</li> */}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
          <div
            className={`${showPageList ? "shopDropdownListPage" : "d-none"}`}
            // onMouseEnter={onMouseHover}
            onMouseLeave={onMouseReleasePage}
          >
            <Row>
              <Col sm={10} md={12} lg={12} xl={12}>
                <div className="py-3  border-right border-start d-flex flex-column border">
                  <NavLink
                    to="/"
                    className={`navHover text-decoration-none mx-2 ${
                      isActive("/") && "navActive"
                    }`}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={`navHover text-decoration-non mx-2 ${
                      isActive("/contact") && "navActive"
                    }`}
                  >
                    Contact
                  </NavLink>
                </div>
              </Col>
            </Row>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

{
  /* <Nav className="me-auto">
            <NavLink
              to="/"
              className={`navHover text-decoration-none   mx-2 ${
                isActive("/") && "navActive"
              }`}
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={`navHover text-decoration-none    mx-2 ${
                isActive("/contact") && "navActive"
              }`}
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              className={`navHover text-decoration-none    mx-2 ${
                isActive("/about") && "navActive"
              }`}
            >
              About
            </NavLink>
          </Nav> */
}
