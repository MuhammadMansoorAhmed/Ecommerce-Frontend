/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { BsXCircle } from "react-icons/bs";
import { addProduct } from "../../Redux/Services/productServices";
import { getAllCategories } from "../../Redux/Services/categoryServices";
import { useEffect, useState } from "react";
import "./form.css";

const AddProductForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    category: "",
    price: "",
    totalStock: "",
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Product name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be positive";
    if (!formData.totalStock || formData.totalStock <= 0)
      newErrors.totalStock = "Total stock must be positive";
    if (!formData.images.length) newErrors.images = "Images are required";
    if (formData.images.length > 3)
      newErrors.images = "Maximum 3 images allowed";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  function generateSKU(productName, category, length = 8) {
    const getInitials = (str) =>
      str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
    const nameInitials = getInitials(productName);
    const categoryInitials = getInitials(category);

    const randomNumber = Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, "0");

    const sku = `${nameInitials}-${categoryInitials}-${randomNumber}`;
    return sku;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    formData.sku = generateSKU(formData.name, formData.category);
    let data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("sku", formData.sku);
    data.append("totalStock", formData.totalStock);
    formData.images.forEach((file) => data.append("images", file));
    await dispatch(addProduct(data));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center flex-column w-100 p-4"
    >
      <div className="d-flex justify-content-between w-100">
        <h4>Add New Product</h4>
        <BsXCircle size={20} onClick={closeForm} className="closeBtn" />
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
        {errors.name && <div className="error">{errors.name}</div>}
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
        {errors.description && (
          <div className="error">{errors.description}</div>
        )}
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
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        {errors.category && <div className="error">{errors.category}</div>}
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
        {errors.price && <div className="error">{errors.price}</div>}
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
        {errors.totalStock && <div className="error">{errors.totalStock}</div>}
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
        {errors.images && <div className="error">{errors.images}</div>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn addProductBtn"
        style={{ backgroundColor: "#1F3A56" }}
        // onClick={handleSubmit}
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
