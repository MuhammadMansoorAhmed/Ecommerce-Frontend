import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineDeleteOutline,
} from "react-icons/md";

const ManageProductsComponent = () => {
  const [visibility, setVisibility] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleVisibilityClick = () => {
    setVisibility(!visibility);
  };

  const handleDeleteProduct = () => {
    setDeleteProduct(true);
    console.log("delete product", deleteProduct);

    setShow(!show);
  };

  return (
    <div>
      {show ? (
        <>
          <Modal show={show} onHide={handleShow} variant="dark">
            <Modal.Header
              className=" "
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
              <Button variant="secondary" onClick={handleShow}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDeleteProduct}>
                Delete Product
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <h2 className="text-center mt-3 mb-4">Product Management</h2>
          <table className="tableLayout">
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
              <tr>
                <td className="border border-white p-1">5628493075</td>
                <td className="border border-white p-1">Iphone</td>
                <td className="border border-white p-1">Electronics</td>
                <td className="border border-white p-1">$800</td>
                <td className="border border-white p-1">Yes</td>
                <td className="border border-white p-1">
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
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => setShow(!show)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageProductsComponent;
