import { Col, Form, Row } from "react-bootstrap";
import "./Contact.css";

const ContactForm = () => {
  return (
    <div>
      <Row
        className="d-flex justify-content-center p-5 "
        style={{ backgroundColor: "#E9EBF1" }}
      >
        <Col sm={10} md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={3}
                type="text"
                placeholder="message"
              />
            </Form.Group>
            <button
              className={`px-4 py-2 btnClass mt-3`}
              style={{ zIndex: "2" }}
            >
              Contact Us
            </button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ContactForm;
