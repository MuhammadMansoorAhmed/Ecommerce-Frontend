/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { updateOrder } from "../../Redux/Services/orderServices";
import { BsXCircle } from "react-icons/bs";
// import "./form.css";

const UpdateOrderForm = ({ order, closeForm }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal code is required"),
    contactNumber: Yup.string()
      .matches(
        /^[0-9]{10,15}$/,
        "Contact number must be between 10 and 15 digits"
      )
      .required("Contact number is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    // const result = await dispatch(updateOrder({ id: order._id, values }));
    // if (result.payload.success) {
    //   alert("Order updated successfully");
    // }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        firstName: order?.firstName,
        lastName: order?.lastName,
        email: order?.email,
        address: order?.address,
        country: order?.country,
        state: order?.state,
        city: order?.city,
        postalCode: order?.postalCode,
        contactNumber: order?.contactNumber,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="d-flex justify-content-center flex-column w-100 p-4">
          <div className="d-flex justify-content-between w-100">
            <h4>Update Order</h4>
            <BsXCircle size={20} onClick={closeForm} className="closeBtn" />
          </div>
          <div className="w-100">
            <label>First Name</label>
            <Field className="inputFields" name="firstName" type="text" />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>
          <div className="w-100">
            <label>Last Name</label>
            <Field className="inputFields" name="lastName" type="text" />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>
          <div className="w-100">
            <label>Email</label>
            <Field className="inputFields" name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="w-100">
            <label>Address</label>
            <Field className="inputFields" name="address" type="text" />
            <ErrorMessage name="address" component="div" className="error" />
          </div>
          <div className="w-100">
            <label>Country</label>
            <Field className="inputFields" name="country" type="text" />
            <ErrorMessage name="country" component="div" className="error" />
          </div>
          <div className="w-100">
            <label>State</label>
            <Field className="inputFields" name="state" type="text" />
            <ErrorMessage name="state" component="div" className="error" />
          </div>
          <div className="w-100">
            <label>City</label>
            <Field className="inputFields" name="city" type="text" />
            <ErrorMessage name="city" component="div" className="error" />
          </div>
          <div className="w-100">
            <label>Postal Code</label>
            <Field className="inputFields" name="postalCode" type="text" />
            <ErrorMessage name="postalCode" component="div" className="error" />
          </div>
          <div className="w-100">
            <label>Contact Number</label>
            <Field className="inputFields" name="contactNumber" type="text" />
            <ErrorMessage
              name="contactNumber"
              component="div"
              className="error"
            />
          </div>
          <button
            type="submit"
            className="btn addProductBtn"
            style={{ backgroundColor: "#1F3A56" }}
          >
            Update Order
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateOrderForm;
