/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { BsXCircle } from "react-icons/bs";
import { addProduct } from "../../Redux/Services/productServices";
import "./form.css";

const AddProductForm = ({ closeForm }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    sku: Yup.string().required("SKU is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    totalStock: Yup.number()
      .required("Total stock is required")
      .positive("Stock must be positive"),
    images: Yup.mixed()
      .required("Images are required")
      .test(
        "fileSize",
        "Maximum 3 images allowed",
        (files) => !files || files.length <= 3
      ),
  });

  // Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "images") {
        values.images.forEach((image, i) =>
          formData.append(`images[${i}]`, image)
        );
      } else {
        formData.append(key, values[key]);
      }
    });

    // Dispatch addProduct action
    const result = await dispatch(addProduct(formData));
    if (result.payload.success) {
      alert("Product added successfully");
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        sku: "",
        category: "",
        price: "",
        totalStock: "",
        images: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="d-flex justify-content-center flex-column w-100 p-4">
          <div className="d-flex justify-content-between w-100">
            <h4>Add New Product</h4>
            <BsXCircle size={20} onClick={closeForm} className="closeBtn" />
          </div>
          <div className="w-100">
            <label>Product Name</label>
            <Field className="inputFields" name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="w-100">
            <label>Description</label>
            <Field className="inputFields" name="description" as="textarea" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>

          {/* <div className="w-100">
            <label>SKU</label>
            <Field className="inputFields" name="sku" type="text" />
            <ErrorMessage name="sku" component="div" className="error" />
          </div> */}

          <div>
            <label>Category</label>
            <Field className="inputFields" name="category" type="text" />
            <ErrorMessage name="category" component="div" className="error" />
          </div>

          <div className="w-100">
            <label>Price</label>
            <Field className="inputFields" name="price" type="number" />
            <ErrorMessage name="price" component="div" className="error" />
          </div>

          <div>
            <label>Total Stock</label>
            <Field className="inputFields" name="totalStock" type="number" />
            <ErrorMessage name="totalStock" component="div" className="error" />
          </div>

          <div className="w-100">
            <label>Images (Max 3)</label>
            <input
              className="inputFields my-3 p-2"
              name="images"
              type="file"
              multiple
              onChange={(event) =>
                setFieldValue("images", Array.from(event.currentTarget.files))
              }
            />
            <ErrorMessage name="images" component="div" className="error" />
          </div>

          <button
            type="submit"
            className="btn addProductBtn"
            style={{ backgroundColor: "#1F3A56" }}
          >
            Add Product
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
