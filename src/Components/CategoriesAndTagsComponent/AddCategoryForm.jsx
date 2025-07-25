/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { BsXCircle } from "react-icons/bs";
import {
  addCategory,
  getAllCategories,
} from "../../Redux/Services/categoryServices";
import { toast } from "react-toastify";

const AddCategoryForm = ({ closeForm, setCategories }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    category: Yup.string()
      .required("Category is required")
      .min(3, "category must be minimun 3 character")
      .max(30, "category must not exceed 30 characters"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await dispatch(addCategory(values));
    if (result.payload.success) {
      toast.success("Category added successfully");
      const reFetchCategories = await dispatch(getAllCategories());
      if (reFetchCategories.meta.requestStatus === "fulfilled") {
        setCategories(reFetchCategories.payload.data);
      }
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ category: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="d-flex justify-content-center flex-column w-100 p-4">
        <div className="d-flex justify-content-between w-100">
          <h4>Add Category</h4>
          <BsXCircle size={20} onClick={closeForm} className="closeBtn" />
        </div>
        <div className="w-100">
          <label>Category Name</label>
          <Field className="inputFields" name="category" type="text" />
          <ErrorMessage name="category" component="div" className="error" />
        </div>
        <button
          type="submit"
          className="btn addProductBtn mt-3"
          style={{ backgroundColor: "#1F3A56" }}
        >
          Add Category
        </button>
      </Form>
    </Formik>
  );
};

export default AddCategoryForm;
