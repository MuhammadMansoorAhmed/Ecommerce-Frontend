import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
} from "../../Redux/Services/productServices";
import { selectIsLoading } from "../../Redux/Features/productSlice";
import { FaRegEdit } from "react-icons/fa";
import AddProductForm from "./AddProductForm";
import UpdateProductForm from "./updateProductForm";

const ManageProductsComponent = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [show, setShow] = useState(false);
  const [addProductForm, setAddProductForm] = useState(false);
  const [editProductForm, setEditProductForm] = useState(false);
  const [products, setProducts] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await dispatch(getAllProducts());
      setProducts(response.payload.data);
    };
    fetchProducts();
  }, [dispatch]);
  // console.log(products);

  const handleShow = (id) => {
    setSelectedProductId(id);
    console.log(selectedProductId);
    setShow(!show);
  };

  const handleVisibilityClick = () => {
    setVisibility(!visibility);
  };

  const handleEditProduct = (product) => {
    setSelectedProductId(product._id);
    setEditProductForm(true);
    setAddProductForm(false); // Close add form if open
  };

  const handleDeleteProduct = async () => {
    if (!selectedProductId) return;
    try {
      const result = await dispatch(deleteProduct(selectedProductId));
      if (result.payload.success) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== selectedProductId)
        );
        setShow(false); // Close modal after successful deletion
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        overflow: "auto",
        paddingBottom: "12px",
        paddingRight: "0px",
        backgroundColor: "#212529",
      }}
    >
      {show ? (
        <>
          <Modal show={show} onHide={() => setShow(false)} variant="dark">
            <Modal.Header
              className=""
              closeButton
              style={{
                backgroundColor: "#1C4240",
                borderRadius: "0px 0px 0px 0px",
              }}
            >
              <Modal.Title className="text-warning">Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="text-white"
              style={{ backgroundColor: "#1C4240" }}
            >
              Are you sure you want to delete this product
            </Modal.Body>
            <Modal.Footer
              style={{
                backgroundColor: "#1C4240",
                borderRadius: "0px 0px 0px 0px",
              }}
            >
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDeleteProduct}>
                Delete Product
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : addProductForm ? (
        <AddProductForm closeForm={() => setAddProductForm(false)} />
      ) : editProductForm ? (
        <UpdateProductForm
          productId={selectedProductId}
          closeForm={() => setEditProductForm(false)}
        />
      ) : (
        <>
          <h2 className="text-center mt-3 mb-4 border-bottom pb-2">
            Product Management
          </h2>

          <div className="d-flex justify-content-end my-3 mx-2 ">
            <Button
              style={{ borderRadius: "8px" }}
              varient="primary"
              onClick={() => setAddProductForm(true)}
            >
              Add Product
            </Button>
          </div>

          <table className="tableLayout ">
            <thead>
              <tr>
                <th className="border border-white p-1">ID</th>
                <th className="border border-white p-1">Name</th>
                <th className="border border-white p-1">Category</th>
                <th className="border border-white p-1">Price</th>
                <th className="border border-white p-1">Stock Status</th>
                <th className="border border-white p-1">Options</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                Array.isArray(products) && products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td
                        className="border border-white p-1 "
                        style={{ wordBreak: "break-all" }}
                      >
                        {product._id}
                      </td>
                      <td className="border border-white p-1">
                        {product.name}
                      </td>
                      <td className="border border-white p-1">
                        {product.categoryInfo.category}
                      </td>
                      <td className="border border-white p-1">
                        PKR: {product.price}
                      </td>
                      <td className="border border-white p-1">
                        {product.inStock ? "TRUE" : "FALSE"}
                      </td>

                      <td className="border border-white p-1 ">
                        {visibility ? (
                          <MdOutlineVisibility
                            size={20}
                            style={{ color: "white", cursor: "pointer" }}
                            onClick={handleVisibilityClick}
                          />
                        ) : (
                          <MdOutlineVisibilityOff
                            size={20}
                            style={{ color: "#888", cursor: "pointer" }}
                            onClick={handleVisibilityClick}
                          />
                        )}
                        <MdOutlineDeleteOutline
                          size={20}
                          style={{ color: "lightCoral", cursor: "pointer" }}
                          onClick={() => {
                            handleShow(product._id);
                          }}
                        />
                        <FaRegEdit
                          size={20}
                          style={{ color: "seaGreen", cursor: "pointer" }}
                          onClick={() => handleEditProduct(product)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No Poduct found</p>
                )
              ) : (
                <div className="d-flex justify-content-center p-1">
                  <Spinner animation="grow" />
                </div>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageProductsComponent;
