/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { BsXCircle } from "react-icons/bs";
import { addProduct } from "../../Redux/Services/productServices";
import { getAllCategories } from "../../Redux/Services/categoryServices";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col, FloatingLabel, Alert } from "react-bootstrap";
import "./form.css";

const AddProductForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    category: "",
    price: "",
    totalStock: "",
    discount: "",
    discountedPrice: "",
    images: [],
    colors: [],
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

  useEffect(() => {
    const price = parseFloat(formData.price);
    const discount = parseFloat(formData.discount);

    // If discount is empty or not a number, clear the discountedPrice
    if (
      formData.discount === "" ||
      isNaN(discount) ||
      discount < 0 ||
      discount > 100
    ) {
      setFormData((prev) => ({ ...prev, discountedPrice: "" }));
      return;
    }

    // Only update if price is valid too
    if (!isNaN(price) && price > 0) {
      const discounted = price - (price * discount) / 100;
      setFormData((prev) => ({
        ...prev,
        discountedPrice: discounted.toFixed(2),
      }));
    }
  }, [formData.price, formData.discount]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Product name is required";
    else if (formData.name.length > 100)
      newErrors.name = "Name can't exceed 100 characters";

    if (!formData.description)
      newErrors.description = "Description is required";
    else if (formData.description.length > 500)
      newErrors.description = "Description can't exceed 500 characters";

    if (!formData.category) newErrors.category = "Category is required";

    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be positive";

    if (formData.discount && (formData.discount < 0 || formData.discount > 100))
      newErrors.discount = "Discount must be between 0 and 100";

    if (formData.discountedPrice <= 0)
      newErrors.discountedPrice = "Discounted price must be positive";

    if (!formData.totalStock || formData.totalStock <= 0)
      newErrors.totalStock = "Total stock must be positive";

    if (!formData.images.length) newErrors.images = "Images are required";
    if (formData.images.length > 3)
      newErrors.images = "Maximum 3 images allowed";

    if (
      !formData.colors ||
      formData.colors.length === 0 ||
      formData.colors.every((c) => c.trim() === "")
    ) {
      newErrors.colors = "At least one color is required";
    }

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

    return `${nameInitials}-${categoryInitials}-${randomNumber}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      formData.sku = generateSKU(formData.name, formData.category);
      let data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("sku", formData.sku);
      data.append("totalStock", formData.totalStock);
      data.append("discount", formData.discount || 0);
      data.append("discountedPrice", formData.discountedPrice || 0);
      formData.colors.forEach((color) => {
        data.append("colors", color);
      });
      formData.images.forEach((file) => data.append("images", file));

      await dispatch(addProduct(data));
      alert("Product added successfully");
    } catch (error) {
      console.log("Error while adding product", error);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-dark text-white p-4 rounded shadow"
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Add New Product</h4>
        <BsXCircle
          size={24}
          className="text-danger"
          onClick={closeForm}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Name & Category */}
      <Row className="mb-3">
        <Col>
          <FloatingLabel label="Product Name" className="text-white ">
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              style={{ backgroundColor: "#696969", color: "#f1f1f1" }}
            />
          </FloatingLabel>
          {errors.name && (
            <Alert variant="danger" className="mt-1 py-1">
              {errors.name}
            </Alert>
          )}
        </Col>
        <Col>
          <FloatingLabel label="Category" className="text-white ">
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value=""></option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {errors.category && (
            <Alert variant="danger" className="mt-1 py-1">
              {errors.category}
            </Alert>
          )}
        </Col>
      </Row>

      {/* Description */}
      <FloatingLabel label="Description" className="text-white mb-3">
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{ height: "100px" }}
        />
      </FloatingLabel>
      {errors.description && (
        <Alert variant="danger" className="mb-3 py-1">
          {errors.description}
        </Alert>
      )}

      {/* Price, Stock */}
      <Row className="mb-3">
        <Col>
          <FloatingLabel label="Price" className="text-white">
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={{ backgroundColor: "#696969", color: "#f1f1f1" }}
            />
          </FloatingLabel>
          {errors.price && (
            <Alert variant="danger" className="mt-1 py-1">
              {errors.price}
            </Alert>
          )}
        </Col>
        <Col>
          <FloatingLabel label="Total Stock" className="text-white">
            <Form.Control
              type="number"
              name="totalStock"
              value={formData.totalStock}
              onChange={handleChange}
            />
          </FloatingLabel>
          {errors.totalStock && (
            <Alert variant="danger" className="mt-1 py-1">
              {errors.totalStock}
            </Alert>
          )}
        </Col>
      </Row>

      {/* Discount */}
      <Row className="mb-3">
        <Col>
          <FloatingLabel label="Discount (%)" className="text-white">
            <Form.Control
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </FloatingLabel>
          {errors.discount && (
            <Alert variant="danger" className="mt-1 py-1">
              {errors.discount}
            </Alert>
          )}
        </Col>
        <Col>
          <FloatingLabel label="Discounted Price" className="text-white">
            <Form.Control
              type="number"
              readOnly
              name="discountedPrice"
              value={formData.discountedPrice}
              placeholder="Auto-calculated"
              style={{ backgroundColor: "#696969", color: "#f1f1f1" }}
            />
          </FloatingLabel>
          {errors.discountedPrice && (
            <Alert variant="danger" className="mt-1 py-1">
              {errors.discountedPrice}
            </Alert>
          )}
        </Col>
      </Row>

      {/* Images */}
      <Form.Group className="mb-3">
        <Form.Label>Images (Max 3)</Form.Label>
        <Form.Control
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
        />
        {errors.images && (
          <Alert variant="danger" className="mt-1 py-1">
            {errors.images}
          </Alert>
        )}
      </Form.Group>

      {/* Colors */}
      <Form.Group className="mb-3">
        <Form.Label className="text-white">Colors</Form.Label>
        {formData.colors.map((color, index) => (
          <div key={index} className="d-flex align-items-center gap-2 mb-2">
            <Form.Control
              type="color"
              value={color}
              onChange={(e) => {
                const newColors = [...formData.colors];
                // ensure it's always in hex format (though input gives it in hash format already)
                const hex = e.target.value.toLowerCase(); // already in #xxxxxx
                newColors[index] = hex;
                setFormData((prev) => ({ ...prev, colors: newColors }));
              }}
              style={{
                width: "60px",
                height: "40px",
                padding: 0,
                border: "none",
              }}
            />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                const newColors = formData.colors.filter((_, i) => i !== index);
                setFormData((prev) => ({ ...prev, colors: newColors }));
              }}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          variant="outline-light"
          size="sm"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              colors: [...prev.colors, "#000000"], // default color added in hash
            }))
          }
        >
          Add Color
        </Button>
      </Form.Group>

      {errors.colors && (
        <Alert variant="danger" className="mb-3 py-1">
          {errors.colors}
        </Alert>
      )}

      {/* Submit */}
      <Button type="submit" variant="secondary" className="mt-3 w-100">
        Add Product
      </Button>
    </Form>
  );
};

export default AddProductForm;
