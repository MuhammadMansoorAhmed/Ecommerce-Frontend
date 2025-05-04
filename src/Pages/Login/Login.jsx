import { Button, Form } from "react-bootstrap";
import NavBar from "../../Components/Navbar/NavBar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../Redux/Services/authServices";
import { toast } from "react-toastify";

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
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", response.payload.user.role);
    toast.success("Login successful");

    const userRole = response.payload.user.role;
    if (userRole === "admin") {
      navigate("/EBS-admin");
    } else {
      navigate("/");
    }
  } else {
    toast.error("Login failed. Please try again.");
  }
};

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center container vh-100 py-3">
        <div
          className="shadow d-flex flex-column p-4 justify-content-center "
          style={{ width: "450px", height: "auto" }}
        >
          <Form onSubmit={handleLogin}>
            <h3 className="w-100  py-2 text-primary">Login</h3>
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
                  <a className="link" href="/forget-password">
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
                  <a className="link" href="/signup">
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
