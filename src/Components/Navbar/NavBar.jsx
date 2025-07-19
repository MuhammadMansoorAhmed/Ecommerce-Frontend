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
import Ravaah from "../../../public/Ravaah.png";

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
      className="sticky-top shadow-sm border-bottom"
      style={{
        backdropFilter: "blur(12px)",
        padding: "16px",
        backgroundColor: "#ffffff23",
      }}
    >
      <Container fluid className="px-4 py-2">
        {/* Toggler for Mobile */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <div className="w-100 d-lg-flex justify-content-between align-items-center">
            {/* Logo */}
            <div className="mb-3 mb-lg-0">
              <img src={Ravaah} alt="logo " style={{ maxWidth: "120px" }} />
            </div>

            {/* Center: Nav Links */}
            <Nav className="flex-column flex-lg-row align-items-start align-items-lg-center gap-2 gap-lg-3 mb-3 mb-lg-0">
              <NavLink
                to="/"
                className="text-decoration-none d-flex align-items-center gap-1 navHover"
                style={({ isActive }) => ({
                  color: isActive ? "#012142" : "inherit",
                })}
              >
                <RiShoppingBag4Line size={18} /> Shop
              </NavLink>
              <NavLink
                to="/"
                className="text-decoration-none d-flex align-items-center gap-1 navHover"
                style={({ isActive }) => ({
                  color: isActive ? "#012142" : "inherit",
                })}
              >
                <RiBloggerLine size={18} /> Blog
              </NavLink>
              <NavLink
                to="/"
                className="text-decoration-none d-flex align-items-center gap-1 navHover"
                style={({ isActive }) => ({
                  color: isActive ? "#012142" : "inherit",
                })}
              >
                <RiContactsBook3Line size={18} /> Contact
              </NavLink>
            </Nav>

            {/* Right: Auth Links */}
            <Nav className="d-flex flex-row align-items-center gap-2 gap-lg-3">
              {isLoggedIn === "true" ? (
                <div
                  className="d-flex align-items-center position-relative gap-2"
                  ref={dropdownRef}
                >
                  <button
                    onClick={handleLogout}
                    className="btn btn-link  text-decoration-none d-flex align-items-center gap-1 navHover"
                    style={{ color: "#012142", fontWeight: 600 }}
                  >
                    <PiSignOutThin size={18} /> Logout
                  </button>
                  <button
                    onClick={() => setShowUserOptions(!showUserOptions)}
                    className="btn btn-link d-flex align-items-center "
                    style={{ color: "#012142", fontWeight: 600 }}
                  >
                    <FaRegUser size={18} />
                  </button>

                  {showUserOptions && (
                    <div
                      className="position-absolute mt-4 bg-light shadow rounded p-2"
                      style={{
                        right: 0,
                        minWidth: "150px",
                        zIndex: 10,
                        top: 20,
                      }}
                    >
                      <button
                        onClick={() => {
                          navigate("/user-profile");
                          setShowUserOptions(false);
                        }}
                        className="d-flex align-items-center justify-content-center w-100 btn btn-light "
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
                    className="text-decoration-none d-flex align-items-center gap-1 navHover"
                    style={({ isActive }) => ({
                      color: isActive ? "#012142" : "#212529",
                    })}
                  >
                    <PiSignInThin size={18} /> Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="text-decoration-none d-flex align-items-center gap-1 navHover"
                    style={({ isActive }) => ({
                      color: isActive ? "#012142" : "#212529",
                    })}
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
