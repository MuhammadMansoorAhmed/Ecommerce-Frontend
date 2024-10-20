/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { BsXCircle } from "react-icons/bs";
import { addSubCategoryTag } from "../../Redux/Services/categoryServices";

const AddTagForm = ({ closeForm }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    tag: Yup.string().required("Tag is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await dispatch(addSubCategoryTag(values));
    if (result.payload.success) {
      alert("Tag added successfully");
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ category: "", tag: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="d-flex justify-content-center flex-column w-100 p-4">
        <div className="d-flex justify-content-between w-100">
          <h4>Add Category Tag</h4>
          <BsXCircle size={20} onClick={closeForm} className="closeBtn" />
        </div>
        <div className="w-100">
          <label>Category</label>
          <Field className="inputFields" name="category" type="text" />
          <ErrorMessage name="category" component="div" className="error" />
        </div>
        <div className="w-100">
          <label>Tag</label>
          <Field className="inputFields" name="tag" type="text" />
          <ErrorMessage name="tag" component="div" className="error" />
        </div>
        <button
          type="submit"
          className="btn addProductBtn mt-3"
          style={{ backgroundColor: "#1F3A56" }}
        >
          Add Tag
        </button>
      </Form>
    </Formik>
  );
};

export default AddTagForm;
