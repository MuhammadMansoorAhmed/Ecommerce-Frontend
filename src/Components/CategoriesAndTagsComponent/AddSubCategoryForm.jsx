/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { BsXCircle } from "react-icons/bs";
import { addSubCategory } from "../../Redux/Services/categoryServices";

const AddSubcategoryForm = ({ closeForm }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string().required("Subcategory is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await dispatch(addSubCategory(values));
    if (result.payload.success) {
      alert("Subcategory added successfully");
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ category: "", subcategory: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="d-flex justify-content-center flex-column w-100 p-4">
        <div className="d-flex justify-content-between w-100">
          <h4>Add Subcategory</h4>
          <BsXCircle size={20} onClick={closeForm} className="closeBtn" />
        </div>
        <div className="w-100">
          <label>Category</label>
          <Field className="inputFields" name="category" type="text" />
          <ErrorMessage name="category" component="div" className="error" />
        </div>
        <div className="w-100">
          <label>Subcategory</label>
          <Field className="inputFields" name="subcategory" type="text" />
          <ErrorMessage name="subcategory" component="div" className="error" />
        </div>
        <button
          type="submit"
          className="btn addProductBtn mt-3"
          style={{ backgroundColor: "#1F3A56" }}
        >
          Add Subcategory
        </button>
      </Form>
    </Formik>
  );
};

export default AddSubcategoryForm;
