import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Services/authServices";
import { MdDashboard } from "react-icons/md";
import { PiDotOutlineFill } from "react-icons/pi";
import { Container, Col, ListGroup, Button } from "react-bootstrap";
import "./AdminDashboardSidebar.css";

// eslint-disable-next-line react/prop-types
const AdminDashboardSidebar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
  };

  const renderSubItems = (menu, items) =>
    activeMenu === menu && (
      <ListGroup variant="flush" className="bg-transparent">
        {items.map((item, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => navigate(item.path)}
            className="bg-transparent text-white ps-4 py-2 border-0"
            style={{ fontSize: "14px" }}
          >
            <PiDotOutlineFill size={16} className="me-2" /> {item.label}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );

  const sidebarItems = [
    {
      label: "Products",
      key: "Products",
      items: [
        { label: "Manage products", path: "/EBS-admin/manage-products" },
        { label: "Categories and tags", path: "/EBS-admin/categories&tags" },
        {
          label: "Inventory management",
          path: "/EBS-admin/inventory-management",
        },
        {
          label: "Discounts and promotions",
          path: "/EBS-admin/discounts&promotions",
        },
      ],
    },
    {
      label: "Orders",
      key: "Orders",
      items: [
        { label: "View all orders", path: "/EBS-admin/view-all-orders" },
        { label: "Order status updates", path: "/EBS-admin/order-status" },
        { label: "Shipping information", path: "/EBS-admin/shipping-info" },
        { label: "Payment details", path: "/EBS-admin/payment-details" },
      ],
    },
    {
      label: "Customers",
      key: "Customers",
      items: [
        {
          label: "Manage customer profiles",
          path: "/EBS-admin/manage-customers",
        },
        { label: "Order history", path: "/EBS-admin/order-history" },
        {
          label: "Customer support tickets",
          path: "/EBS-admin/customer-support",
        },
      ],
    },
    {
      label: "Analytics",
      key: "Analytics",
      items: [
        { label: "Sales reports", path: "/EBS-admin/sales-reports" },
        {
          label: "Product performance",
          path: "/EBS-admin/product-performance",
        },
        { label: "Customer behavior", path: "/EBS-admin/customer-behaviour" },
      ],
    },
    {
      label: "User Management",
      key: "User-Management",
      items: [
        { label: "Admin and staff roles", path: "/EBS-admin/roles" },
        { label: "Permissions", path: "/EBS-admin/permissions" },
        { label: "Activity logs", path: "/EBS-admin/activity-logs" },
      ],
    },
    {
      label: "Promotions",
      key: "Promotions",
      items: [
        { label: "Manage discount codes", path: "/EBS-admin/discounts-codes" },
        { label: "Sales events", path: "/EBS-admin/sales-events" },
      ],
    },
    {
      label: "Reviews",
      key: "Reviews",
      items: [
        {
          label: "Manage product reviews",
          path: "/EBS-admin/manage-product-reciews",
        },
        {
          label: "Respond to customer feedback",
          path: "/EBS-admin/customer-feedback",
        },
      ],
    },
    {
      label: "Settings",
      key: "Settings",
      items: [
        { label: "Store settings", path: "/EBS-admin/store-settings" },
        { label: "Payment gateway", path: "/EBS-admin/payment-gateway" },
        { label: "Email templates", path: "/EBS-admin/email-template" },
        {
          label: "General store information",
          path: "/EBS-admin/general-store-informations",
        },
      ],
    },
    {
      label: "Support",
      key: "Support",
      items: [
        {
          label: "Customer support inquiries",
          path: "/EBS-admin/customer-support-inquiries",
        },
        { label: "FAQs and help center", path: "/EBS-admin/help-center" },
      ],
    },
  ];

  return (
    <Container fluid className="px-0 d-flex" style={{ height: "100vh" }}>
      <Col
        md={3}
        className="bg-dark text-white py-3 px-2 d-flex flex-column"
        style={{ minWidth: "250px", maxWidth: "280px" }}
      >
        <div
          className="d-flex justify-content-between align-items-center mb-4 px-2"
          onClick={() => navigate("/EBS-admin")}
          style={{ cursor: "pointer" }}
        >
          <h5 className="mb-0">Dashboard</h5>
          <MdDashboard size={24} />
        </div>

        <ListGroup variant="flush">
          {sidebarItems.map(({ label, key, items }) => (
            <>
              <ListGroup.Item
                action
                onClick={() => handleMenuClick(key)}
                className="bg-transparent text-white fw-semibold border-0"
                key={key}
              >
                {label}
              </ListGroup.Item>
              {renderSubItems(key, items)}
            </>
          ))}
        </ListGroup>

        <div className="mt-auto">
          <Button
            variant="outline-light"
            className="w-100 mt-3"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Col>

      <Col className="bg-secondary overflow-auto p-3">{children}</Col>
    </Container>
  );
};

export default AdminDashboardSidebar;
