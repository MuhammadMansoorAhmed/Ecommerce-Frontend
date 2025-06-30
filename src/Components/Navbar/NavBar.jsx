// Redesigned NavBar with Consistent Styling and Enhancements
import { Navbar } from "react-bootstrap";
import { FaRegistered, FaUser, FaUserEdit } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiBloggerFill, RiContactsBook2Fill } from "react-icons/ri";
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
      className="py-0 sticky-top shadow-sm border-b bg-white/90"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="container d-flex justify-content-between align-items-center py-3 px-4">
        {/* Brand Logo */}
        <NavLink to="/" className="navbar-brand fw-bold text-indigo-600 fs-4">
          MyShop
        </NavLink>

        {/* Navigation Links */}
        <div className="d-flex gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-decoration-none d-flex align-items-center gap-1 navHover ${
                isActive ? "text-indigo-600 fw-semibold" : "text-dark"
              }`
            }
          >
            <IoMdHome size={20} /> Home
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `text-decoration-none d-flex align-items-center gap-1 navHover ${
                isActive ? "text-indigo-600 fw-semibold" : "text-dark"
              }`
            }
          >
            <RiBloggerFill size={20} /> Blog
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-decoration-none d-flex align-items-center gap-1 navHover ${
                isActive ? "text-indigo-600 fw-semibold" : "text-dark"
              }`
            }
          >
            <RiContactsBook2Fill size={20} /> Contact
          </NavLink>
        </div>

        {/* User Section */}
        <div className="d-flex gap-3 align-items-center">
          {isLoggedIn === "true" ? (
            <div className="position-relative" ref={dropdownRef}>
              <button
                onClick={handleLogout}
                className="btn btn-link text-decoration-none text-dark navHover"
              >
                <IoLogOut size={20} /> Logout
              </button>

              <button
                onClick={() => setShowUserOptions(!showUserOptions)}
                className="btn btn-link text-dark text-decoration-none navHover"
              >
                <FaUser size={20} />
              </button>

              {showUserOptions && (
                <div
                  className="position-absolute mt-2 bg-light shadow rounded p-2"
                  style={{ right: 0, minWidth: "150px", zIndex: 10 }}
                >
                  <button
                    onClick={() => navigate("/user-profile")}
                    className="d-flex align-items-center w-100 btn btn-light navHover"
                  >
                    <FaUserEdit className="me-2" /> Profile
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
                    isActive ? "text-indigo-600 fw-semibold" : "text-dark"
                  }`
                }
              >
                <IoLogIn size={20} /> Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `text-decoration-none d-flex align-items-center gap-1 navHover ${
                    isActive ? "text-indigo-600 fw-semibold" : "text-dark"
                  }`
                }
              >
                <FaRegistered size={20} /> Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
