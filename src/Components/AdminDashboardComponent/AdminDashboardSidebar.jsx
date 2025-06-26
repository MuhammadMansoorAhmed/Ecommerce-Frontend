/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { PiDotOutlineFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardSidebar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Services/authServices";

const AdminDashboardSidebar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [itemMenu, setitemMenu] = useState(null);

  const handleItemMenu = (item) => {
    setitemMenu(item === itemMenu ? null : item);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
  };

  return (
    <>
      <div
        className="d-flex position-relative w-100"
        // style={{ paddingInline: "12%" }}
      >
        <div
          className="adminAidebarContent text-white flex-column h-100 "
          style={{ backgroundColor: "#43655A", width: "280px" }}
        >
          <div
            className={`d-flex justify-content-md-center justify-content-center align-items-center px-md-2 mb-2 mx-2  `}
            style={{
              borderRadius: "6px",
              backgroundColor: "transparent",
              // color: "#889FA5",
              color: "#fff",
            }}
          >
            {" "}
            <h4
              className={`  my-md-2 fw-bold`}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/EBS-admin")}
            >
              Dashboard
            </h4>
            <MdDashboard
              size={25}
              className="my-1 me-3 ms-5  "
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => navigate("/EBS-admin")}
            />
          </div>
          <div className="d-flex flex-column">
            {/* Products */}
            <div
              className="hoverEffect d-flex bg-transparent align-items-center  align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={() => handleItemMenu("Products")}
              >
                <span className="adminDashboardSidebarItem ">Products</span>
              </a>
              {itemMenu === "Products" && (
                <div className="d-flex flex-column align-items-md-start align-items-center w-100 bg-transparent">
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent adminDashboardSidebarSubitems"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/manage-products")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Manage products
                    </span>
                  </div>

                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/categories&tags")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Categories and tags
                    </span>
                  </div>
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent "
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/inventory-management")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Inventory management
                    </span>
                  </div>
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent "
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/discounts&promotions")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Discounts and promotions
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Orders */}
            <div
              className="hoverEffect d-flex bg-transparent align-items-center align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={() => handleItemMenu("Orders")}
              >
                <span className="adminDashboardSidebarItem ">Orders</span>
              </a>
              {itemMenu === "Orders" && (
                <div className="d-flex flex-column align-items-md-start align-items-center w-100 bg-transparent">
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent adminDashboardSidebarSubitems"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/view-all-orders")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      View all orders
                    </span>
                  </div>

                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/order-status")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Order status updates
                    </span>
                  </div>
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent "
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/shipping-info")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Shipping information
                    </span>
                  </div>
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent "
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/payment-details")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Payment details
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Customers */}
            <div
              className="hoverEffect d-flex bg-transparent align-items-center align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={() => handleItemMenu("Customers")}
              >
                <span className="adminDashboardSidebarItem ">Customers</span>
              </a>
              {itemMenu === "Customers" && (
                <div className="d-flex flex-column align-items-md-start align-items-center w-100 bg-transparent">
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent adminDashboardSidebarSubitems"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/manage-customers")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Manage customer profiles
                    </span>
                  </div>

                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/order-history")}
                  >
                    <PiDotOutlineFill size={20} className="text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Order history
                    </span>
                  </div>
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent "
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/customer-support")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Customer support tickets
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Analytics */}
            <div
              className="hoverEffect d-flex bg-transparent align-items-center align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={() => handleItemMenu("Analytics")}
              >
                <span className="adminDashboardSidebarItem ">Analytics</span>
              </a>
              {itemMenu === "Analytics" && (
                <div className="d-flex flex-column align-items-md-start align-items-center w-100 bg-transparent">
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent adminDashboardSidebarSubitems"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/sales-reports")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Sales reports
                    </span>
                  </div>

                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/product-performance")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Product performance
                    </span>
                  </div>
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent "
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/customer-behaviour")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Customer behavior
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* User Management */}
            <div
              className="hoverEffect d-flex bg-transparent align-items-center align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={() => handleItemMenu("User-Management")}
              >
                <span className="adminDashboardSidebarItem ">
                  User Management
                </span>
              </a>
              {itemMenu === "User-Management" && (
                <div className="d-flex flex-column align-items-md-start align-items-center w-100 bg-transparent">
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent adminDashboardSidebarSubitems"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/roles")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Admin and staff roles
                    </span>
                  </div>

                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/permissions")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Permissions
                    </span>
                  </div>
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent "
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/activity-logs")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Activity logs
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Promotions */}
            <div
              className="hoverEffect d-flex bg-transparent align-items-center align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={() => handleItemMenu("Promotions")}
              >
                <span className="adminDashboardSidebarItem ">Promotions </span>
              </a>
              {itemMenu === "Promotions" && (
                <div className="d-flex flex-column align-items-md-start align-items-center w-100 bg-transparent">
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent adminDashboardSidebarSubitems"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/discounts-codes")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Manage discount codes
                    </span>
                  </div>

                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/sales-events")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Sales events
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Reviews */}
            <div
              className="hoverEffect d-flex bg-transparent align-items-center align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={() => handleItemMenu("Reviews")}
              >
                <span className="adminDashboardSidebarItem ">Reviews </span>
              </a>
              {itemMenu === "Reviews" && (
                <div className="d-flex flex-column align-items-md-start align-items-center w-100 bg-transparent">
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent adminDashboardSidebarSubitems"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() =>
                      navigate("/EBS-admin/manage-product-reciews")
                    }
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Manage product reviews
                    </span>
                  </div>

                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/customer-feedback")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Respond to customer feedback
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Settings */}
            <div
              className="hoverEffect d-flex bg-transparent align-items-center align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={() => handleItemMenu("Settings")}
              >
                <span className="adminDashboardSidebarItem ">Settings </span>
              </a>
              {itemMenu === "Settings" && (
                <div className="d-flex flex-column align-items-md-start align-items-center w-100 bg-transparent">
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent adminDashboardSidebarSubitems"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/store-settings")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Store settings
                    </span>
                  </div>

                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/payment-gateway")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Payment gateway
                    </span>
                  </div>
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/email-template")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Email templates
                    </span>
                  </div>
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() =>
                      navigate("/EBS-admin/general-store-informations")
                    }
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      General store information
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Support */}
            <div
              className="hoverEffect d-flex bg-transparent align-items-center align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={() => handleItemMenu("Support")}
              >
                <span className="adminDashboardSidebarItem ">Support </span>
              </a>
              {itemMenu === "Support" && (
                <div className="d-flex flex-column align-items-md-start align-items-center w-100 bg-transparent">
                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent adminDashboardSidebarSubitems"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() =>
                      navigate("/EBS-admin/customer-support-inquiries")
                    }
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      className="adminDashboardSidebarSubitems "
                      style={{ fontWeight: 600 }}
                    >
                      Customer support inquiries
                    </span>
                  </div>

                  <div
                    className={`${
                      itemMenu
                        ? "d-flex justify-content-start w-100 px-md-4 px-4 py-2  bg-transparent"
                        : "d-none"
                    } `}
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate("/EBS-admin/help-center")}
                  >
                    <PiDotOutlineFill size={20} className=" text-white" />
                    <span
                      // className="adminDashboardSidebarSubitems"
                      style={{ fontWeight: 600 }}
                    >
                      FAQs and help center
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex flex-column mt-auto">
            <div
              className="hoverEffect d-flex bg-transparent align-items-center align-items-md-start flex-column  mx-2 my-2 border-white border-top border-bottom"
              style={{ borderRadius: "6px" }}
            >
              <a
                className="adminDashboardSidebarItem text-white  d-flex justify-content-center mb-0   "
                onClick={handleLogout}
              >
                <span className="adminDashboardSidebarItem ">Logout </span>
              </a>
            </div>
          </div>
        </div>
        <main className="adminMainDashboard  ">{children}</main>
      </div>
    </>
  );
};

export default AdminDashboardSidebar;
