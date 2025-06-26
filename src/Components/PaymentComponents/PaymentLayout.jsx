import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const PaymentLayout = () => {
  // -------------------- State --------------------
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    cvv: "",
    expiry: "",
    name: "",
  });

  const [errors, setErrors] = useState({});

  // -------------------- Handle Input --------------------
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

  // -------------------- Validation --------------------
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

  // -------------------- Handle Checkout --------------------
  const handleCheckout = () => {
    if (!validateForm()) return;

    const payload = {
      method: paymentMethod,
      ...(paymentMethod === "card" ? cardDetails : {}),
    };

    console.log("Sending payment data:", payload);
    alert("Payment processed successfully (mock)!");
    // Here you’d send `payload` to backend or payment gateway API.
  };

  return (
    <Container className="py-5">
      <Row>
        {/* Payment Method */}
        <Col md={7}>
          <h4 className="mb-4">Choose your payment method</h4>

          {/* PayPal Option */}
          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-start">
              <Form.Check
                type="radio"
                id="paypal"
                name="payment"
                checked={paymentMethod === "paypal"}
                onChange={() => handlePaymentMethodChange("paypal")}
                label={
                  <div>
                    <strong>PayPal</strong>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                      Safe payment online. Credit card needed. PayPal account is
                      not necessary.
                    </div>
                  </div>
                }
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                height={30}
              />
            </Card.Body>
          </Card>

          {/* Credit Card Option */}
          <Card>
            <Card.Body>
              <Form.Check
                type="radio"
                id="card"
                name="payment"
                checked={paymentMethod === "card"}
                onChange={() => handlePaymentMethodChange("card")}
                label={
                  <div>
                    <strong>Credit Card</strong>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                      Safe money transfer using your bank account. Visa,
                      Mastercard, Discover, American Express.
                    </div>
                  </div>
                }
              />

              {paymentMethod === "card" && (
                <Form className="mt-4">
                  <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Label>Credit Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="6655 8444 2233 5559"
                      name="number"
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
                      <Form.Group className="mb-3" controlId="cvvCode">
                        <Form.Label>CVV Code</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="123"
                          name="cvv"
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
                      <Form.Group className="mb-3" controlId="expiryDate">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="MM / YY"
                          name="expiry"
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

                  <Form.Group className="mb-3" controlId="nameOnCard">
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      name="name"
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

          <Button variant="outline-secondary" className="mt-4">
            GO BACK
          </Button>
        </Col>

        {/* Summary Section */}
        <Col md={5}>
          <h5>Summary</h5>
          <Card className="mb-3">
            <Card.Body>
              <p className="mb-1">
                <strong>Packet:</strong> Full package (100+ channels)
              </p>
              <p className="mb-1">
                <strong>Duration:</strong> 3m
              </p>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Transaction:</span>
                <span>€ 159.99</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Discount for points:</span>
                <span>€ 0.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Gift card discount:</span>
                <span>€ 0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong style={{ color: "green" }}>€ 159.99</strong>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <strong>📦 Streaming box shipping information</strong>
              <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                Lorem ipsum is sheer actual model text, and a search for will
                uncover many web.
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <strong>🔁 30-day money back guarantee</strong>
              <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                Contrary to popular belief, Lorem Ipsum is not simply random.
              </p>
            </Card.Body>
          </Card>

          <Button
            variant="success"
            size="lg"
            className="w-100"
            onClick={handleCheckout}
          >
            CHECK OUT →
          </Button>
        </Col>
      </Row>

      <p className="text-center text-muted mt-4" style={{ fontSize: "0.8rem" }}>
        By clicking checkout you agree with our{" "}
        <a href="#">terms and conditions</a> and{" "}
        <a href="#">money-back guarantee</a>.
      </p>
    </Container>
  );
};

export default PaymentLayout;
