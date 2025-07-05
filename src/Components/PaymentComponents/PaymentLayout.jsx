import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { BsShieldLockFill } from "react-icons/bs";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from "react-icons/fa";
import "./PaymentLayout.css";
import { toast } from "react-toastify";

const PaymentLayout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    cvv: "",
    expiry: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setErrors({});
  };

  const validateForm = () => {
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
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckout = () => {
    if (!validateForm()) return;
    const payload = {
      method: paymentMethod,
      ...(paymentMethod === "card" ? cardDetails : {}),
    };
    console.log("Sending payment data:", payload);
    toast.success("✅ Payment processed successfully (mock)!");
  };

  return (
    <Container className="py-5">
      <Row>
        {/* Left: Payment Method */}
        <Col md={7} className="mb-4">
          <h3 className="mb-4 fw-bold">Payment Details</h3>

          {/* Payment Method Switch */}
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Form.Check
                type="radio"
                id="paypal"
                name="payment"
                checked={paymentMethod === "paypal"}
                onChange={() => handlePaymentMethodChange("paypal")}
                label={
                  <div>
                    <strong>
                      <FaPaypal className="me-2 text-primary" size={18} />
                      PayPal
                    </strong>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Secure checkout via PayPal.
                    </p>
                  </div>
                }
              />
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <Form.Check
                type="radio"
                id="card"
                name="payment"
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
                      onChange={handleChange}
                      isInvalid={!!errors.number}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.number}
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
                          onChange={handleChange}
                          isInvalid={!!errors.cvv}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cvv}
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
                          onChange={handleChange}
                          isInvalid={!!errors.expiry}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.expiry}
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
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
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
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>PKR 5,999</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>PKR 200</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong style={{ color: "green" }}>PKR 6,199</strong>
              </div>
            </Card.Body>
          </Card>

          <div className="mb-3 text-muted small">
            <BsShieldLockFill className="me-2 text-success" />
            Your payment is secured with end-to-end encryption.
          </div>

          <Button
            className="checkout-btn w-100 py-2 fw-semibold"
            onClick={handleCheckout}
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
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentLayout;
