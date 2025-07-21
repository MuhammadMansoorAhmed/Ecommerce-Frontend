import { Button, Form } from "react-bootstrap";
import NavBar from "../../Components/Navbar/NavBar";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../../Redux/Services/authServices";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/Ravaah.png";

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
    policyAggrement: false,
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          error = "Enter a valid email";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
        )
          error = "Password must be alphanumeric and at least 8 characters";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Passwords do not match";
        break;
      case "policyAggrement":
        if (!value) error = "You must accept the terms and privacy policy";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Trigger validation on each keystroke
    validateField(name, fieldValue);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Revalidate everything before submit
    Object.entries(formData).forEach(([key, value]) =>
      validateField(key, value)
    );

    // Check for any errors
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      return toast.error("Please fix the highlighted fields.", {
        position: "bottom-right",
      });
    }

    const newErrors = {};

    // Basic validations
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.policyAggrement)
      newErrors.policyAggrement =
        "You must accept the terms and privacy policy";

    if (
      formData.password &&
      !formData.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      )
    ) {
      newErrors.password =
        "Password must be alphanumeric and at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return toast.error("Please fix the highlighted fields.", {
        position: "bottom-right",
      });
    }

    setErrors({}); // Clear errors if no validation issues

    const response = await dispatch(register(formData));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("User Registration successful");
      return navigate("/login");
    }

    toast.error("User Registration Failed");
  };

  const handleGoogleSignup = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_ROUTE
    }/api/auth/google`;
  };
  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center container h-100 py-3">
        <div
          className="shadow d-flex flex-column p-5 justify-content-center "
          style={{ width: "600px", height: "auto" }}
        >
          <img src={logo} alt="company" style={{ maxWidth: "100px" }} />
          <h5 className="w-100  py-2 " style={{ color: "#0A557E" }}>
            Signup
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
              onClick={handleGoogleSignup}
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
              Signup with Google
            </button>
          </div>
          <Form onSubmit={handleSignup}>
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
              {errors.fullName && (
                <Form.Text className="text-danger">{errors.fullName}</Form.Text>
              )}
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
              <br />
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
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
              {errors.password && (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              )}
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
              {errors.confirmPassword && (
                <Form.Text className="text-danger">
                  {errors.confirmPassword}
                </Form.Text>
              )}
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
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="policyAggrement">
              <Form.Check
                type="checkbox"
                className=""
                name="policyAggrement"
                checked={formData.policyAggrement}
                onChange={handleChange}
                required
                label={
                  <>
                    I agree to the
                    <a
                      href={`/policies/${"terms-of-services"}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                      style={{ color: "#0A557E" }}
                    >
                      {" "}
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href={`/privacy/${"privacy-policy"}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                      style={{ color: "#0A557E" }}
                    >
                      Privacy Policy
                    </a>
                    .
                  </>
                }
              />
              {errors.policyAggrement && (
                <Form.Text className="text-danger">
                  {errors.policyAggrement}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Text>
                Already Have An Account?{" "}
                <span>
                  <a
                    className="link"
                    href="/login"
                    style={{ color: "#0A557E" }}
                  >
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
