import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, FormGroup, Row, Button } from "react-bootstrap";
import { addOrder } from "../../Redux/Services/orderServices";
import {
  selectIsError,
  selectIsLoading,
} from "../../Redux/Features/orderSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetailsComponent.css";
import { toast } from "react-toastify";

const OrderDetailsComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const { productId, quantity } = useParams();
  const params = new URLSearchParams(location.search);
  const color = params.get("color");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .max(16, "First Name must be at most 16 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .max(16, "Last Name must be at most 16 characters"),
    address: Yup.string()
      .required("Address is required")
      .max(80, "Address must be at most 80 characters"),
    city: Yup.string()
      .required("City is required")
      .max(16, "City must be at most 16 characters"),
    state: Yup.string()
      .required("State is required")
      .max(20, "State must be at most 20 characters"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .matches(/^[0-9]{5,6}$/, "Postal code must be 5 or 6 digits"),
    contactNumber: Yup.string()
      .required("Contact Number is required")
      .matches(
        /^03[0-9]{9}$/,
        "Must be a valid Pakistani number (e.g., 03123456789)"
      ),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleOrderSubmit = async (values) => {
    values.quantity = quantity;
    values.color = color;
    const response = await dispatch(
      addOrder({ formData: values, productId: productId })
    );
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Order Placed Successfully");
      // console.log(response.payload.data);
      return response.payload.data.createdOrder;
    }
  };

  return (
    <Container className="order-page py-5">
      <Row>
        <Col md={8} className="pe-md-5">
          <h2 className="mb-4 fw-bold">Shipping Information</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              country: "",
              address: "",
              city: "",
              state: "",
              postalCode: "",
              contactNumber: "",
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              try {
                const order = await handleOrderSubmit(values); // ✅ Await here
                if (order && order._id) {
                  console.log(order);
                  navigate(`/products/oder/userOrderDetails/${order._id}`);
                } else {
                  toast.error("Something went wrong while placing your order.");
                }
              } catch (error) {
                console.error("Order submission failed:", error);
                toast.error("Failed to place order. Please try again.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form className="modern-order-form" onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.firstName && errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.lastName && errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="mb-3">
                  <Form.Label>Country </Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.country && errors.country}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.address && errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </FormGroup>

                <Row>
                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.city && errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Form.Label>State *</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.state && errors.state}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="mb-3">
                  <Form.Label>Postal Code *</Form.Label>
                  <Form.Control
                    type="text"
                    name="postalCode"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.postalCode && errors.postalCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.postalCode}
                  </Form.Control.Feedback>
                </FormGroup>

                <Row>
                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Form.Label>Contact Number *</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactNumber"
                        value={values.contactNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.contactNumber && errors.contactNumber
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contactNumber}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  className="modern-submit-btn mt-3"
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Order"}
                </Button>

                {isError && (
                  <p className="text-danger mt-2">
                    Something went wrong. Please try again.
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </Col>

        <Col md={4} className="pt-md-5">
          {/* You can display order summary or product card preview here */}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsComponent;