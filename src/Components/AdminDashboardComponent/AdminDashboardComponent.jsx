import { Col, Row } from "react-bootstrap";
import "./AdminDashboardComponent.css";
import DashboardTableComponent from "../DashboardTableComponent/DashboardTableComponent/DashboardTableComponent";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getTotalProductsCategoryStats,
  getTotalProductsStats,
} from "../../Redux/Services/productServices";

const AdminDashboardComponent = () => {
  const dispatch = useDispatch();
  const [productStates, setProductStates] = useState([]);
  const [productCategoryStates, setProductCategoryStates] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const responseProductStates = await dispatch(getTotalProductsStats());
      const responseProductCategoryStates = await dispatch(
        getTotalProductsCategoryStats()
      );
      setProductStates(responseProductStates?.payload?.data);
      setProductCategoryStates(responseProductCategoryStates?.payload?.data);
    };
    getProducts();
  }, [dispatch]);
  const headers = [
    "Category",
    "In Stock",
    "Out oF Stock",
    "Total Product",
    "Total Sales",
  ];
  const rows = productCategoryStates;

  return (
    <section
      className=" p-4"
      style={{
        height: "100vh",
        width: "100dvw",
        backgroundColor: "#212529",
        overflow: "auto",
      }}
    >
      <Row className="w-100  ">
        <Col sm={10} md={4} lg={4} xl={4} className="px-2 ">
          <div className="Card1 flex-column">
            <h4>Total Products: {productStates?.totalProducts}</h4>
          </div>
        </Col>
        <Col sm={10} md={4} lg={4} xl={4} className="px-2 ">
          <div className="Card2 flex-column">
            <h4>Total Sales: {productStates?.totalSales}</h4>
          </div>
        </Col>
        <Col sm={10} md={4} lg={4} xl={4} className="px-2 ">
          <div className="Card3 flex-column">
            <h4>Total Revenue: {productStates?.totalRevenue}</h4>
          </div>
        </Col>
      </Row>
      <DashboardTableComponent headers={headers} rows={rows} />
    </section>
  );
};

export default AdminDashboardComponent;
