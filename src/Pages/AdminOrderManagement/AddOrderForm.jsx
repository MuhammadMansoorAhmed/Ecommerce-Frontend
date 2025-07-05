/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { BsXCircle } from "react-icons/bs";
import { addOrder } from "../../Redux/Services/orderServices";
import { toast } from "react-toastify";

const AddOrderForm = ({ closeForm }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .max(16, "First name must be at most 16 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .max(16, "Last name must be at most 16 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string()
      .required("Address is required")
      .max(80, "Address must be at most 80 characters"),
    country: Yup.string()
      .required("Country is required")
      .max(24, "Country name must be at most 24 characters"),
    state: Yup.string()
      .required("State is required")
      .max(20, "State must be at most 20 characters"),
    city: Yup.string()
      .required("City is required")
      .max(16, "City must be at most 16 characters"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .matches(/^[0-9]{5,6}$/, "Postal code must be 5 or 6 digits"),
    contactNumber: Yup.string()
      .required("Contact number is required")
      .matches(
        /^03[0-9]{9}$/,
        "Contact number must be a valid Pakistani number (e.g., 03123456789)"
      ),
  });
  // Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    const result = await dispatch(addOrder(values));
    if (result.payload.success) {
      toast.success("Order added successfully");
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        contactNumber: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="d-flex justify-content-center flex-column w-100 p-4">
          <div className="d-flex justify-content-between w-100">
            <h4>Add New Order</h4>
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
            Add Order
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrderForm;
