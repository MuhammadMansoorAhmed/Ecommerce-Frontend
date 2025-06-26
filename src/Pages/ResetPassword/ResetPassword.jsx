import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { resetPassword } from "../../Redux/Services/authServices";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [confirmPassword, setComfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password === confirmPassword) {
      toast.error("Password did not matched");
      return;
    }

    const response = await dispatch(resetPassword(formData));
    if (!response.meta.aborted) {
      toast.success("Password Reste Succcessful");
      return;
    }
    toast.error("Failed To Send Recovery Email");
  };
  return (
    <div className="d-flex justify-content-center align-items-center container vh-100 py-3">
      <div
        className="shadow d-flex flex-column p-4 justify-content-center "
        style={{ width: "450px", height: "auto" }}
      >
        <Form onSubmit={handleSubmit}>
          <h3 className="w-100  py-2 text-primary">Forget Password</h3>
          <Form.Group className="mb-3">
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.email}
              placeholder="Enter new Password"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              onChange={(e) => setComfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Text>
              Back To
              <span>
                {" "}
                <a className="link" href="/login">
                  Login
                </a>
              </span>
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
