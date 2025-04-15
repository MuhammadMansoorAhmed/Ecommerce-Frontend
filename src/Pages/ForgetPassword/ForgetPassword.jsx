import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../Redux/Services/authServices";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
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
    const response = await dispatch(forgetPassword(formData));
    console.log(response.meta.requestStatus === "fulfilled");
    if (!response.meta.aborted) {
      toast.success("Recovery Email sent");
      return;
    }
    console.log(response);
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
            Send Email
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
