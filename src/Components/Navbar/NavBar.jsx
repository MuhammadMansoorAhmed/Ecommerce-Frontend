import { Navbar } from "react-bootstrap";
import { FaRegistered, FaUser } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { RiBloggerFill, RiContactsBook2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Services/authServices";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  // console.log(isLoggedIn);

  const handleLogout = async () => {
     await dispatch(logout());
     localStorage.removeItem("isLoggedIn");
     localStorage.removeItem("role");
  };

  return (
    <Navbar
      expand="lg"
      className={`py-0 position-md-relative position-lg-relative position-md-fixed w-100  border-bottom sticky-top
        
      }`}
      style={{
        top: 0,
        left: 0,
        transition: "top 0.3s",
        backgroundColor: "#FFFFFF99",
      }}
    >
      <div className="p-3 w-100">
        <Navbar.Toggle aria-controls="basic-navbar-nav bg-sm-light" />
        <Navbar.Collapse id="basic-navbar-nav border ">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex me-auto">
              <Link className="navHover mx-2" to={"/"}>
                <IoMdHome size={20} className="mb-1" /> Home
              </Link>
              <Link className="navHover mx-2" to={"/blog"}>
                <RiBloggerFill size={20} className="mb-1" /> Blog
              </Link>
              <Link className="navHover mx-2" to={"/contact"}>
                <RiContactsBook2Fill size={20} className="mb-1" />
                Contact
              </Link>
            </div>
            <div className="d-flex ms-auto">
              {isLoggedIn === "true" ? (
                <div className="position-relative">
                  <Link
                    className="navHover mx-2"
                    to={""}
                    onClick={handleLogout}
                  >
                    <IoLogOut size={20} className="mb-1" /> Logout
                  </Link>

                  <Link
                    className="navHover mx-2"
                    to={""}
                    onClick={() => setShowUserOptions(!showUserOptions)}
                  >
                    <FaUser size={20} className="mb-1" />
                  </Link>
                  {showUserOptions && (
                    <div
                      className="position-absolute d-flex flex-column justify-content-center align-items-center w-100 rounded-3 px-2"
                      style={{
                        zIndex: 2,
                        top: "100%",
                        right: 0,
                        backgroundColor: "rgba(196, 204, 216, 0.56)",
                        transition: "all .4s smooth",
                      }}
                    >
                      <div
                        className="d-flex justify-content-center m-2 navHover cursor-pointer"
                        onClick={() => navigate("/user-profile")}
                      >
                        <FaUserEdit size={20} />
                        <p className="m-0">
                          {" "}
                          <Link className="nav-link mx-2" to={""}>
                            Profile
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link className="navHover mx-2" to={"/login"}>
                    <IoLogIn size={20} className="mb-1" /> Login
                  </Link>
                  <Link className="navHover mx-2" to={"/signup"}>
                    <FaRegistered size={20} className="mb-1 me-1" />
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
