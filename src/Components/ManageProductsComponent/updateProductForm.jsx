/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProduct } from "../../Redux/Services/productServices";
import { BsXCircle } from "react-icons/bs";
import "./form.css";

const UpdateProductForm = ({ product, closeForm }) => {
  const dispatch = useDispatch();

  // Function to generate SKU based on the product name and category
  const generateSKU = (name, category) => {
    const namePart = name ? name.slice(0, 3).toUpperCase() : "PRD";
    const categoryPart = category ? category.slice(0, 3).toUpperCase() : "CAT";
    const randomNum = Math.floor(Math.random() * 10000); // Generate a random number for uniqueness
    return `${namePart}-${categoryPart}-${randomNum}`;
  };

  // Validation schema remains the same
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    totalStock: Yup.number()
      .required("Total stock is required")
      .positive("Stock must be positive"),
    images: Yup.mixed().test(
      "fileSize",
      "Maximum 3 images allowed",
      (files) => !files || files.length <= 3
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    // Generate SKU dynamically based on the product name and category
    const sku = generateSKU(values.name, values.category);

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

    // Append the generated SKU to the form data
    formData.append("sku", sku);

    const result = await dispatch(updateProduct({ id: product._id, formData }));
    if (result.payload.success) {
      alert("Product updated successfully");
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        name: product?.name,
        description: product?.description,
        category: product?.category,
        price: product?.price,
        totalStock: product?.totalStock,
        images: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="d-flex justify-content-center flex-column w-100 p-4">
          <div className="d-flex justify-content-between w-100">
            <h4>Update Product</h4>
            <BsXCircle size={20} onClick={closeForm} className="closeBtn" />
          </div>
          <div className="w-100">
            <label>Product Name</label>
            <Field className="inputFields" name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label>Description</label>
            <Field className="inputFields" name="description" as="textarea" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label>Category</label>
            <Field className="inputFields" name="category" type="text" />
            <ErrorMessage name="category" component="div" className="error" />
          </div>

          <div>
            <label>Price</label>
            <Field className="inputFields" name="price" type="number" />
            <ErrorMessage name="price" component="div" className="error" />
          </div>

          <div>
            <label>Total Stock</label>
            <Field className="inputFields" name="totalStock" type="number" />
            <ErrorMessage name="totalStock" component="div" className="error" />
          </div>

          <div>
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
            className="btn addProductBtn"
            type="submit"
            style={{ backgroundColor: "#1F3A56" }}
          >
            Update Product
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProductForm;
