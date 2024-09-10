import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
const OrderDetailsComponent = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col sm={12} md={8} lg={8} xl={8} className="border-end">
          <h3>Order Details</h3>
          <hr className="text-secondary" />
          <Form className="orderForm">
            <div className="d-flex justify-content-center">
              <FormGroup className="my-3 w-100 me-4">
                <Form.Label>
                  First Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </FormGroup>
              <FormGroup className="my-3 w-100 ms-4">
                <Form.Label>
                  Last Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </FormGroup>
            </div>
            <FormGroup className="my-3">
              <Form.Label>
                Country<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control type="text" placeholder="Country" />
            </FormGroup>
            <FormGroup className="my-3">
              <Form.Label>
                Address<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control type="text" placeholder="address" />
            </FormGroup>
            <div className="d-flex justify-content-center ">
              <FormGroup className="my-3 w-100 me-4">
                <Form.Label>
                  City<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="City" />
              </FormGroup>
              <FormGroup className="my-3 w-100 ms-4">
                <Form.Label>
                  State<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="State" />
              </FormGroup>
            </div>
            <FormGroup className="my-3">
              <Form.Label>
                Postal Code<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control type="text" placeholder="e.g:46456" />
            </FormGroup>
            <div className="d-flex justify-content-center ">
              <FormGroup className="my-3 w-100 me-4">
                <Form.Label>
                  Contact Number<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="e.g:355223555" />
              </FormGroup>
              <FormGroup className="my-3 w-100 ms-4">
                <Form.Label>
                  Email<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="e.g:example@gmail.com" />
              </FormGroup>
            </div>
            <button className="addToCartBtn my-3 py-2 px-2">Submit</button>
          </Form>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4}></Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsComponent;
