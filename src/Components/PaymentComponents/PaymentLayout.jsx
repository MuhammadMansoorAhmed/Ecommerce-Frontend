import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  FormGroup,
} from "react-bootstrap";
import { BsCashCoin, BsShieldLockFill } from "react-icons/bs";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import "./PaymentLayout.css";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addOrder } from "../../Redux/Services/orderServices";
import {
  selectIsError,
  selectIsLoading,
} from "../../Redux/Features/orderSlice";
import { getAllCartItemsByUserId } from "../../Redux/Services/cartServices";

const totalPrice = (products) => {
  let total = 0;
  products.forEach((product) => {
    total += product.productId.price;
  });
  return total;
};

const PaymentLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const [cartProducts, setCartProducts] = useState([]);

  // Get params for order details
  const { productId, quantity } = useParams();
  const params = new URLSearchParams(location.search);
  const color = params.get("color");

  useEffect(() => {
    const fetchCart = async () => {
      const res = await dispatch(getAllCartItemsByUserId());
      setCartProducts(res.payload.data);
    };
    fetchCart();
  }, [dispatch]);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    cvv: "",
    expiry: "",
    name: "",
  });

  const [cardErrors, setCardErrors] = useState({});

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setCardErrors({});
  };

  const validateCardForm = () => {
    const errs = {};
    if (paymentMethod === "card") {
      if (!cardDetails.number.match(/^\d{16}$/)) {
        errs.number = "Enter a valid 16-digit card number";
      }
      if (!cardDetails.cvv.match(/^\d{3}$/)) {
        errs.cvv = "Enter a valid 3-digit CVV";
      }
      if (!cardDetails.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        errs.expiry = "Use format MM/YY";
      }
      if (!cardDetails.name.trim()) {
        errs.name = "Cardholder name is required";
      }
    }
    setCardErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCardCheckout = () => {
    if (!validateCardForm()) return;
    const payload = {
      method: paymentMethod,
      ...(paymentMethod === "card" ? cardDetails : {}),
    };
    console.log("Sending payment data:", payload);
    toast.success("✅ Payment processed successfully (mock)!");
  };

  // Validation schema for COD order details
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

  // Handle COD order submission
  const handleOrderSubmit = async (values) => {
    values.quantity = quantity;
    values.color = color;
    values.paymentMethod = paymentMethod; // Add payment method to order

    const response = await dispatch(
      addOrder({ formData: values, productId: productId })
    );

    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Order Placed Successfully");
      return response.payload.data.createdOrder;
    } else {
      throw new Error("Order submission failed");
    }
  };

  return (
    <Container className="py-5">
      <Row>
        {/* Left: Payment Method */}
        <Col md={7} className="mb-4">
          <h3 className="mb-4 fw-bold">Payment Details</h3>

          {/* COD Payment Method */}
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Form.Check
                type="radio"
                id="cod"
                name="paymentMethod"
                checked={paymentMethod === "cod"}
                onChange={() => handlePaymentMethodChange("cod")}
                label={
                  <div>
                    <strong>
                      <BsCashCoin className="me-2 text-primary" size={18} />
                      Cash On Delivery (COD)
                    </strong>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Pay once you receive the package
                    </p>
                  </div>
                }
              />

              {/* COD Order Details Form */}
              {paymentMethod === "cod" && (
                <div className="mt-4">
                  <h5 className="mb-3">Shipping Information</h5>
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
                        const order = await handleOrderSubmit(values);
                        if (order && order._id) {
                          console.log(order);
                          navigate(
                            `/products/oder/userOrderDetails/${order._id}`
                          );
                        } else {
                          toast.error(
                            "Something went wrong while placing your order."
                          );
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
                      <Form
                        className="modern-order-form"
                        onSubmit={handleSubmit}
                      >
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
                                isInvalid={
                                  touched.firstName && errors.firstName
                                }
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
                          <Form.Label>Country</Form.Label>
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
                          className="modern-submit-btn mt-3 w-100"
                          disabled={isSubmitting || isLoading}
                        >
                          {isLoading || isSubmitting
                            ? "Placing Order..."
                            : "Place COD Order"}
                        </Button>

                        {isError && (
                          <p className="text-danger mt-2">
                            Something went wrong. Please try again.
                          </p>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Credit/Debit Card Payment Method */}
          <Card className="shadow-sm">
            <Card.Body>
              <Form.Check
                type="radio"
                id="card"
                name="paymentMethod"
                checked={paymentMethod === "card"}
                onChange={() => handlePaymentMethodChange("card")}
                label={
                  <div>
                    <strong>
                      <FaCcVisa size={20} className="me-1 text-primary" />
                      <FaCcMastercard size={20} className="me-1 text-danger" />
                      <FaCcAmex size={20} className="me-1 text-info" />
                      Credit / Debit Card
                    </strong>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Supports Visa, Mastercard, Amex.
                    </p>
                  </div>
                }
              />

              {paymentMethod === "card" && (
                <Form className="mt-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      isInvalid={!!cardErrors.number}
                    />
                    <Form.Control.Feedback type="invalid">
                      {cardErrors.number}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          isInvalid={!!cardErrors.cvv}
                        />
                        <Form.Control.Feedback type="invalid">
                          {cardErrors.cvv}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          isInvalid={!!cardErrors.expiry}
                        />
                        <Form.Control.Feedback type="invalid">
                          {cardErrors.expiry}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={handleCardChange}
                      isInvalid={!!cardErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {cardErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Right: Summary Section */}
        <Col md={5}>
          <h4 className="fw-semibold mb-3">Order Summary</h4>

          <Card className="shadow-sm mb-3">
            <Card.Body>
              {cartProducts &&
                cartProducts?.map((product) => (
                  <div
                    key={product.productId._id}
                    className="d-flex justify-content-between mb-3"
                  >
                    <span>{product.productId.name}</span>
                    <span>{product.productId.price}</span>
                  </div>
                ))}
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>PKR 200</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong style={{ color: "green" }}>
                  {totalPrice(cartProducts || []) + 200}
                </strong>
              </div>
            </Card.Body>
          </Card>

          <div className="mb-3 text-muted small">
            <BsShieldLockFill className="me-2 text-success" />
            Your payment is secured with end-to-end encryption.
          </div>

          {/* Show checkout button only for card payments */}
          {paymentMethod === "card" && (
            <>
              <Button
                className="checkout-btn w-100 py-2 fw-semibold"
                onClick={handleCardCheckout}
              >
                Checkout {"->"}
              </Button>

              <div
                className="text-center text-muted mt-3"
                style={{ fontSize: "0.85rem" }}
              >
                By continuing, you agree to our{" "}
                <a href="#" className="text-decoration-underline">
                  terms & conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-decoration-underline">
                  refund policy
                </a>
                .
              </div>
            </>
          )}

          {/* Show message for COD */}
          {paymentMethod === "cod" && (
            <div className="text-center text-muted">
              <p className="mb-2">
                Fill in your shipping details above to place your COD order.
              </p>
              <small>
                You&apos;ll pay when the package is delivered to your address.
              </small>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentLayout;
