import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, FormGroup, Row, Toast } from "react-bootstrap";
import { addOrder } from "../../Redux/Services/orderServices";
import {
  selectIsError,
  selectIsLoading,
} from "../../Redux/Features/orderSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useState } from "react";

const OrderDetailsComponent = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const [showToast, setShowToast] = useState(false);

  const params = useParams();

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal Code is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleOrderSubmit = async (values) => {
    const response = await dispatch(
      addOrder({ formData: values, productId: params.id })
    );

    if (response.meta.requestStatus === "fulfilled") {
      setShowToast(true); // Show the toast on successful order submission
    }
  };

  return (
    <Container style={{ marginTop: "120px" }}>
      <Row>
        <Col sm={12} md={8} lg={8} xl={8} className="border-end mb-4">
          <h3>Order Details</h3>
          <hr className="text-secondary" />
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
            onSubmit={(values, { setSubmitting }) => {
              handleOrderSubmit(values);
              setSubmitting(false);
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
              <Form className="orderForm" onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                  <FormGroup className="my-3 w-100 me-4">
                    <Form.Label>
                      First Name<span className="text-danger">*</span>
                    </Form.Label>
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
                  <FormGroup className="my-3 w-100 ms-4">
                    <Form.Label>
                      Last Name<span className="text-danger">*</span>
                    </Form.Label>
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
                </div>

                <FormGroup className="my-3">
                  <Form.Label>
                    Country<span className="text-danger">*</span>
                  </Form.Label>
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

                <FormGroup className="my-3">
                  <Form.Label>
                    Address<span className="text-danger">*</span>
                  </Form.Label>
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

                <div className="d-flex justify-content-center">
                  <FormGroup className="my-3 w-100 me-4">
                    <Form.Label>
                      City<span className="text-danger">*</span>
                    </Form.Label>
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
                  <FormGroup className="my-3 w-100 ms-4">
                    <Form.Label>
                      State<span className="text-danger">*</span>
                    </Form.Label>
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
                </div>

                <FormGroup className="my-3">
                  <Form.Label>
                    Postal Code<span className="text-danger">*</span>
                  </Form.Label>
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

                <div className="d-flex justify-content-center">
                  <FormGroup className="my-3 w-100 me-4">
                    <Form.Label>
                      Contact Number<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNumber"
                      value={values.contactNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.contactNumber && errors.contactNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactNumber}
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup className="my-3 w-100 ms-4">
                    <Form.Label>
                      Email<span className="text-danger">*</span>
                    </Form.Label>
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
                </div>

                <button
                  className="addToCartBtn my-3 py-2 px-2"
                  type="submit"
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>

                {isError && (
                  <p className="text-danger">
                    Something went wrong. Please try again.
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4}></Col>
      </Row>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <Toast.Body>Order placed successfully</Toast.Body>
      </Toast>
    </Container>
  );
};

export default OrderDetailsComponent;
