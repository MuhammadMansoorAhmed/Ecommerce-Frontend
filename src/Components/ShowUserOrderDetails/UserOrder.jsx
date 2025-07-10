import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../Redux/Services/orderServices";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const UserOrder = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrderById = async () => {
      const response = await dispatch(getOrderById(orderId));
      console.log(response.payload.data.userOrderById);
      if (response.meta.requestStatus === "fulfilled") {
        setOrder(response.payload.data.userOrderById);
        return;
      }
      toast.error("failed to fetch Order Summary");
    };
    fetchOrderById();
  }, [dispatch]);

  return (
    <Container className="py-4">
      <Row className="p-3 d-flex justify-content-center">
        <Col
          sm={12}
          md={10}
          lg={10}
          xl={10}
          className="p-3 d-flex justify-content-start shadow flex-column"
          style={{ borderRadius: "8px", backgroundColor: "#f8f8f8" }}
        >
          <h3 className="mx-2 py-3 fw-bold">Order Summary</h3>
          <Row
            className="d-flex justify-content-center align-items-center border-bottom pb-3 mx-2 mb-2"
            style={{ borderColor: "#020202" }}
          >
            <Col sm={12} md={6} lg={6} xl={6}>
              <img
                src={order.productId?.images[0]?.url}
                alt="product image"
                className="w-100"
                style={{ maxWidth: "180px", borderRadius: "8px" }}
              />
            </Col>
            <Col sm={12} md={6} lg={6} xl={6}>
              <p className="fw-semibold my-2">{order.productId.name}</p>
              <p className="">
                PKR:{" "}
                <span className="fw-bold m-0">{order.productId.price}</span>
              </p>
              <p>
                Quantity <span>{order.quantity}</span>
              </p>
            </Col>
          </Row>
          <Row
            className="d-flex justify-content-center align-items-center border-bottom pb-3 mx-2 mb-2"
            style={{ borderColor: "#020202" }}
          >
            <Col sm={12} md={6} lg={6} xl={6}>
              <p className="my-2">SubTotal</p>
            </Col>
            <Col sm={12} md={6} lg={6} xl={6}>
              <p className="fw-semibold my-2">
                PKR {order.productId.price * order.quantity}
              </p>
            </Col>
          </Row>
          <Row
            className="d-flex justify-content-center align-items-center border-bottom pb-3 mx-2 mb-2"
            style={{ borderColor: "#020202" }}
          >
            <Col sm={12} md={6} lg={6} xl={6}>
              <p className="my-2">After Discount</p>
            </Col>
            <Col sm={12} md={6} lg={6} xl={6}>
              <p className="my-2">
                PKR {order.productId.price - order.productId.discountedPrice}
              </p>
            </Col>
          </Row>
          <Row
            className="d-flex justify-content-center align-items-center border-bottom pb-3 mx-2 mb-2"
            style={{ borderColor: "#020202" }}
          >
            <Col sm={12} md={6} lg={6} xl={6}>
              <p className="my-2">Final Total</p>
            </Col>
            <Col sm={12} md={6} lg={6} xl={6}>
              <p className="my-2">
                PKR {order.productId.price - order.productId.discountedPrice}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrder;
