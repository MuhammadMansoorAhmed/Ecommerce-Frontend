import { Button, Form } from "react-bootstrap";
import NavBar from "../../Components/Navbar/NavBar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../Redux/Services/authServices";
import { toast } from "react-toastify";
import logo from "../../../public/Ravaah.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(login(formData));

    if (response.meta.requestStatus === "fulfilled") {
      const role = response?.payload?.user?.role;

      if (role) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", role);
        toast.success("Login successful");

        if (role === "admin") {
          navigate("/EBS-admin");
        } else {
          navigate("/");
        }
      } else {
        console.warn("User role is missing from login response.");
        toast.error("Login response malformed.");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_ROUTE
    }/api/auth/google`;
  };

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center container vh-100 py-3">
        <div
          className="shadow d-flex flex-column p-5 justify-content-center "
          style={{ width: "450px", height: "auto" }}
        >
          <img src={logo} alt="company" style={{ maxWidth: "100px" }} />
          <h5 className="w-100  py-2 " style={{ color: "#0A557E" }}>
            Login
          </h5>
          <div className="flex justify-content-center">
            <button
              style={{
                width: "100%",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                color: "#444",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                justifyContent: "center",
              }}
              onClick={handleGoogleLogin}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "12px",
                }}
              />
              Login with Google
            </button>
          </div>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Text>
                Forget Password?
                <span>
                  {" "}
                  <a
                    className="link"
                    href="/forget-password"
                    style={{ color: "#0A557E" }}
                  >
                    Forget Passwrod
                  </a>
                </span>
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Text>
                Don&apos;t Have An Account?
                <span>
                  {" "}
                  <a
                    className="link"
                    href="/signup"
                    style={{ color: "#0A557E" }}
                  >
                    Signup
                  </a>
                </span>
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
