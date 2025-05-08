/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { updateProduct } from "../../Redux/Services/productServices";
import { BsXCircle } from "react-icons/bs";
import "./form.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../Redux/Services/categoryServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProductForm = ({ product, closeForm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    _id: product?._id,
    name: product?.name || "",
    description: product?.description || "",
    category: product?.categoryInfo?._id || "",
    price: product?.price || "",
    totalStock: product?.totalStock || "",
    images: [], // New images, not the existing ones
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await dispatch(getAllCategories());
      if (response.payload && response.payload.data) {
        setCategories(response.payload.data);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append modified or fallback to existing product data
    data.append("name", formData.name.trim() || product.name);
    data.append(
      "description",
      formData.description.trim() || product.description
    );
    data.append(
      "category",
      formData.category !== "" ? formData.category : product.categoryInfo._id
    );
    data.append("price", formData.price || product.price);
    data.append("totalStock", formData.totalStock || product.totalStock);

    // Handling images:
    if (formData.images.length) {
      formData.images.forEach((file) => {
        data.append("images", file);
      });
    } else {
      product.images.forEach((image) => {
        data.append("existingImages", image);
      });
    }

    try {
      await dispatch(
        updateProduct({ id: product._id, formData: data })
      ).unwrap();

      toast.success("Product updated successfully");
      closeForm();
      navigate(0); // Refresh the page
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(`Error updating product: ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center flex-column w-100 p-4"
    >
      <div className="d-flex justify-content-between w-100">
        <h4>Edit Product</h4>
        <BsXCircle size={20} onClick={() => closeForm()} className="closeBtn" />
      </div>

      {/* Product Name */}
      <div className="w-100">
        <label>Product Name</label>
        <input
          className="inputFields"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="w-100">
        <label>Description</label>
        <textarea
          className="inputFields"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Category */}
      <div className="w-100">
        <label>Category</label>
        <select
          name="category"
          className="inputFields"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="w-100">
        <label>Price</label>
        <input
          className="inputFields"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      {/* Total Stock */}
      <div className="w-100">
        <label>Total Stock</label>
        <input
          className="inputFields"
          name="totalStock"
          type="number"
          value={formData.totalStock}
          onChange={handleChange}
        />
      </div>

      {/* Images */}
      <div className="w-100">
        <label>Images (Max 3)</label>
        <input
          className="inputFields my-3 p-2"
          name="images"
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn addProductBtn"
        style={{ backgroundColor: "#1F3A56" }}
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateProductForm;
