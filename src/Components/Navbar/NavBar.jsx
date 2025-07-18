import { Navbar, Nav, Container } from "react-bootstrap";
import { GoPlus } from "react-icons/go";
import {
  RiBloggerLine,
  RiContactsBook3Line,
  RiShoppingBag4Line,
} from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { PiSignInThin, PiSignOutThin } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Services/authServices";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const dropdownRef = useRef();

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar
      expand="lg"
      className="sticky-top shadow-sm border-bottom bg-white/90"
      style={{ backdropFilter: "blur(12px)", padding: "16px" }}
    >
      <Container fluid className="px-4 py-2">
        {/* Toggler for Mobile */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <div className="w-100 d-lg-flex justify-content-between align-items-center">
            {/* Logo */}
            <div className="mb-3 mb-lg-0">
              <Navbar.Brand
                as={NavLink}
                to="/"
                className="fw-bold text-primary fs-4"
              >
                MyShop
              </Navbar.Brand>
            </div>

            {/* Center: Nav Links */}
            <Nav className="flex-column flex-lg-row align-items-start align-items-lg-center gap-2 gap-lg-3 mb-3 mb-lg-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-decoration-none d-flex align-items-center gap-1 navHover ${
                    isActive && "text-primary fw-semibold"
                  }`
                }
              >
                <RiShoppingBag4Line size={18} /> Shop
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `text-decoration-none d-flex align-items-center gap-1 navHover ${
                    isActive ? "text-primary fw-semibold" : "text-dark"
                  }`
                }
              >
                <RiBloggerLine size={18} /> Blog
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-decoration-none d-flex align-items-center gap-1 navHover ${
                    isActive ? "text-primary fw-semibold" : "text-dark"
                  }`
                }
              >
                <RiContactsBook3Line size={18} /> Contact
              </NavLink>
            </Nav>

            {/* Right: Auth Links */}
            <Nav className="flex-column flex-lg-row align-items-start align-items-lg-center gap-2 gap-lg-3">
              {isLoggedIn === "true" ? (
                <div className="position-relative" ref={dropdownRef}>
                  <button
                    onClick={handleLogout}
                    className="btn btn-link text-decoration-none text-dark navHover "
                  >
                    <PiSignOutThin size={18} /> Logout
                  </button>
                  <button
                    onClick={() => setShowUserOptions(!showUserOptions)}
                    className="btn btn-link text-dark text-decoration-none navHover"
                  >
                    <FaRegUser size={18} />
                  </button>
                  {showUserOptions && (
                    <div
                      className="position-absolute mt-2 bg-light shadow rounded p-2"
                      style={{ right: 0, minWidth: "150px", zIndex: 10 }}
                    >
                      <button
                        onClick={() => {
                          navigate("/user-profile");
                          setShowUserOptions(false);
                        }}
                        className="d-flex align-items-center justify-content-center w-100 btn btn-light navHover"
                      >
                        <FaRegUser className="me-2" /> Profile
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `text-decoration-none d-flex align-items-center gap-1 navHover ${
                        isActive ? "text-primary fw-semibold" : "text-dark"
                      }`
                    }
                  >
                    <PiSignInThin size={18} /> Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `text-decoration-none d-flex align-items-center gap-1 navHover ${
                        isActive ? "text-primary fw-semibold" : "text-dark"
                      }`
                    }
                  >
                    <GoPlus size={18} /> Signup
                  </NavLink>
                </>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
