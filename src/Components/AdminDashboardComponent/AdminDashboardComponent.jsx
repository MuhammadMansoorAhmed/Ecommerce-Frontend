import { Col, Row } from "react-bootstrap";
import "./AdminDashboardComponent.css";
import DashboardTableComponent from "../DashboardTableComponent/DashboardTableComponent/DashboardTableComponent";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getTotalProductsCategoryStats,
  getTotalProductsStats,
} from "../../Redux/Services/productServices";
import { LineChart, BarChart } from "../Charts/Charts";

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
        background: "var(--background-gradient)",
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
      <Row className="w-100 mt-3">
        <Col md={12} lg={6} className="px-2 mb-3">
          <div className="card p-3">
            <BarChart
              title="Products by Category"
              labels={(rows || []).map((r) => r?.categoryName || r?.category || "-")}
              series={[
                {
                  label: "Total Products",
                  data: (rows || []).map((r) => r?.totalProducts || 0),
                },
                {
                  label: "In Stock",
                  data: (rows || []).map((r) => r?.inStock || 0),
                },
              ]}
            />
          </div>
        </Col>
        <Col md={12} lg={6} className="px-2 mb-3">
          <div className="card p-3">
            <LineChart
              title="Sales & Revenue Overview"
              labels={["Totals"]}
              series={[
                { label: "Total Sales", data: [productStates?.totalSales || 0] },
                { label: "Total Revenue", data: [productStates?.totalRevenue || 0] },
              ]}
            />
          </div>
        </Col>
      </Row>
      <DashboardTableComponent headers={headers} rows={rows} />
    </section>
  );
};

export default AdminDashboardComponent;
