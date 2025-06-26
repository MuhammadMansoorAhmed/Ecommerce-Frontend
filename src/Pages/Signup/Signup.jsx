import { Button, Form } from "react-bootstrap";
import NavBar from "../../Components/Navbar/NavBar";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../../Redux/Services/authServices";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password and confirm password must match", {
        position: "bottom-right",
      });
    }

    if (
      !formData.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      )
    ) {
      return toast.error(
        "password must be alphanumeric with upto 8 characters",
        {
          position: "bottom-right",
        }
      );
    }

    const response = await dispatch(register(formData));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("User Registration successful");
      return navigate("/login");
    }
    toast.error("User Registration Failed");
  };

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center container h-100 py-3">
        <div
          className="shadow d-flex flex-column p-4 justify-content-center "
          style={{ width: "600px", height: "auto" }}
        >
          <Form onSubmit={handleSignup}>
            <h3 className="w-100  py-2 text-primary">Signup</h3>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Enter Full Name"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
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
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Enter Confirm Password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <div className="d-flex w-100">
                <div className="d-flex flex-column w-100">
                  <Form.Label>Date Of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    placeholder="Date Of Birth"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex flex-column w-100">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="number"
                    name="contact"
                    value={formData.contact}
                    placeholder="Enter Contact"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Text>
                Already Have An Account?{" "}
                <span>
                  <a className="link" href="/login">
                    Login
                  </a>
                </span>
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;
