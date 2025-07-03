import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
} from "../../Redux/Services/productServices";
import { selectIsLoading } from "../../Redux/Features/productSlice";
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
  const [productItem, setProductItem] = useState(null);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await dispatch(getAllProducts());
      setProducts(response.payload.data);
    };
    fetchProducts();
  }, [dispatch]);

  const handleShow = (id) => {
    setSelectedProductId(id);
    setShow(true);
  };

  const handleVisibilityClick = () => {
    setVisibility(!visibility);
  };

  const handleEditProduct = (product) => {
    setProductItem(product);
    setEditProductForm(true);
    setAddProductForm(false);
  };

  const handleDeleteProduct = async () => {
    if (!selectedProductId) return;
    try {
      const result = await dispatch(deleteProduct(selectedProductId));
      if (result.payload.success) {
        setProducts((prev) =>
          prev.filter((product) => product._id !== selectedProductId)
        );
        setShow(false);
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <Container
      fluid
      className="bg-dark text-white py-4 px-3"
      style={{ minHeight: "100vh" }}
    >
      {show && (
        <Modal show onHide={() => setShow(false)} centered>
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            Are you sure you want to delete this product?
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {addProductForm ? (
        <AddProductForm closeForm={() => setAddProductForm(false)} />
      ) : editProductForm ? (
        <UpdateProductForm
          product={productItem}
          closeForm={() => setEditProductForm(false)}
        />
      ) : (
        <>
          <Row className="mb-4">
            <Col>
              <h2 className="text-center border-bottom pb-2">
                Product Management
              </h2>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col className="text-end">
              <Button variant="primary" onClick={() => setAddProductForm(true)}>
                Add Product
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Table bordered hover variant="dark" responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading ? (
                    Array.isArray(products) && products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td>{product?.name}</td>
                          <td>{product?.categoryInfo?.name}</td>
                          <td>PKR: {product?.price}</td>
                          <td>{product?.inStock ? "YES" : "NO"}</td>
                          <td>
                            {visibility ? (
                              <MdOutlineVisibility
                                size={20}
                                className="text-white me-2"
                                style={{ cursor: "pointer" }}
                                onClick={handleVisibilityClick}
                              />
                            ) : (
                              <MdOutlineVisibilityOff
                                size={20}
                                className="text-secondary me-2"
                                style={{ cursor: "pointer" }}
                                onClick={handleVisibilityClick}
                              />
                            )}
                            <MdOutlineDeleteOutline
                              size={20}
                              className="text-danger me-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleShow(product._id)}
                            />
                            <FaRegEdit
                              size={20}
                              className="text-success"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditProduct(product)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No products found.
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <Spinner animation="border" variant="light" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ManageProductsComponent;
