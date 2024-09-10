import { Col, Row } from "react-bootstrap";
import "./AdminDashboardComponent.css";

const AdminDashboardComponent = () => {
  return (
    <section
      className=" p-4"
      style={{ height: "100dvh", width: "100dvw", backgroundColor: "#212529" }}
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
      <table className="tableLayout text-white mt-4">
        <thead>
          <tr className="border-white border">
            <th className="p-1 border border-white">Product Category </th>
            <th className="p-1 border border-white">Total Products </th>
            <th className="p-1 border border-white">Total Products Sold </th>
            <th className="p-1 border border-white">
              Total Products In Stock{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="p-1 border border-white">
            <td className="p-1 border border-white">Cloth</td>
            <td className="p-1 border border-white">200</td>
            <td className="p-1 border border-white">20</td>
            <td className="p-1 border border-white">180</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default AdminDashboardComponent;
