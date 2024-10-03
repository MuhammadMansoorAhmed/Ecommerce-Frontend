import { Col, Row } from "react-bootstrap";
import "./AdminDashboardComponent.css";
import DashboardTableComponent from "../DashboardTableComponent/DashboardTableComponent/DashboardTableComponent";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../Redux/Services/productServices";

const AdminDashboardComponent = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await dispatch(getAllProducts());
      setProducts(response.payload.data);
    };
    getProducts();
  }, [dispatch]);
  console.log(products);
  const headers = [
    "Name",
    "Description",
    "Price",
    "In Stock",
    "Category",
    "UserName",
  ];
  const rows = products;

  return (
    <section
      className=" p-4"
      style={{ height: "100%", width: "100dvw", backgroundColor: "#212529" }}
    >
      <Row className="w-100  ">
        <Col sm={10} md={4} lg={4} xl={4} className="px-2 ">
          <div className="Card1 d-flex flex-column">
            <h3>Total Products</h3>
          </div>
        </Col>
        <Col sm={10} md={4} lg={4} xl={4} className="px-2 ">
          <div className="Card2 d-flex flex-column">
            <h3>Total Sales</h3>
          </div>
        </Col>
        <Col sm={10} md={4} lg={4} xl={4} className="px-2 ">
          <div className="Card3 d-flex flex-column">
            <h3>Total Revenue</h3>
          </div>
        </Col>
      </Row>
      <DashboardTableComponent headers={headers} rows={rows} />
    </section>
  );
};

export default AdminDashboardComponent;
