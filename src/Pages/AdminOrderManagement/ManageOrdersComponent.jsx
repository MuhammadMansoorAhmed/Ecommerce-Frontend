import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllOrders } from "../../Redux/Services/orderServices";
import { selectIsLoading } from "../../Redux/Features/orderSlice";
import { FaRegEdit } from "react-icons/fa";
import AddOrderForm from "./AddOrderForm";
import UpdateOrderForm from "./updateOrderForm";


const ManageOrdersComponent = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [show, setShow] = useState(false);
  const [addOrderForm, setAddOrderForm] = useState(false);
  const [editOrderForm, setEditOrderForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await dispatch(getAllOrders());
      setOrders(response.payload.data.orders);
    };
    fetchOrders();
  }, [dispatch]);

  const handleShow = (id) => {
    setSelectedOrderId(id);
    setShow(!show);
  };

  const handleVisibilityClick = () => {
    setVisibility(!visibility);
  };

  const handleEditOrder = (order) => {
    setSelectedOrderId(order._id);
    setEditOrderForm(true);
    setAddOrderForm(false); // Close add form if open
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrderId) return;
    try {
      const result = await dispatch(deleteOrder(selectedOrderId));
      if (result.payload.success) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== selectedOrderId)
        );
        setShow(false); // Close modal after successful deletion
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order", error);
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
              Are you sure you want to delete this order?
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
              <Button variant="danger" onClick={handleDeleteOrder}>
                Delete Order
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : addOrderForm ? (
        <AddOrderForm closeForm={() => setAddOrderForm(false)} />
      ) : editOrderForm ? (
        <UpdateOrderForm
          orderId={selectedOrderId}
          closeForm={() => setEditOrderForm(false)}
        />
      ) : (
        <>
          <h2 className="text-center mt-3 mb-4 border-bottom pb-2">
            Order Management
          </h2>

          <div className="d-flex justify-content-end my-3 mx-2 ">
            <Button
              style={{ borderRadius: "8px" }}
              variant="primary"
              onClick={() => setAddOrderForm(true)}
            >
              Add Order
            </Button>
          </div>

          <table className="tableLayout">
            <thead>
              <tr>
                <th className="border border-white p-1">Product ID</th>
                <th className="border border-white p-1">Customer Name</th>
                <th className="border border-white p-1">Contact Number</th>
                <th className="border border-white p-1">Order Status</th>
                <th className="border border-white p-1">Options</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                orders && Array.isArray(orders) && orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order?._id}>
                      <td
                        className="border border-white p-1"
                        style={{ wordBreak: "break-all" }}
                      >
                        {order?.productId}
                      </td>
                      <td className="border border-white p-1">
                        {order?.firstName} {order?.lastName}
                      </td>
                      <td className="border border-white p-1">
                        {order?.contactNumber}
                      </td>
                      <td className="border border-white p-1">
                        {order?.status}
                      </td>
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
                          style={{ color: "lightCoral", cursor: "pointer" }}
                          onClick={() => handleShow(order._id)}
                        />
                        <FaRegEdit
                          size={20}
                          style={{ color: "seaGreen", cursor: "pointer" }}
                          onClick={() => handleEditOrder(order)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-white">
                      No Orders found
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="5" className="d-flex justify-content-center p-1">
                    <Spinner animation="grow" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageOrdersComponent;
