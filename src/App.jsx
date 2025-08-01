import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Layout from "./Components/CategoryPageComponents/Layout";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import ProductDisplay from "./Pages/ProductDisplay/ProductDisplay";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AdminDashboardSidebar from "./Components/AdminDashboardComponent/AdminDashboardSidebar";
import ManageProducts from "./Pages/ManageProducts/ManageProducts";
import CategoriesAndTags from "./Pages/AdminCategory&Tags/CategoriesAndTags";
import InventoryManagement from "./Pages/InventoryManagement/InventoryManagement";
import DiscountAndPromotion from "./Pages/DiscountAndPromotion/DiscountAndPromotion";
import OrderDisplay from "./Pages/OrderDetails/OrderDetails";
import ViewAllOrders from "./Pages/AdminOrderManagement/ViewAllOrders";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserLoginStatus } from "./Redux/Services/authServices";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Cart from "./Pages/Cart/Cart";
import axios from "axios";
import ProtectedRoute from "./Components/ProtectedRoutesComponent/ProtectedRoutesComponent";
import Spinner from "react-bootstrap/Spinner";
import Payment from "./Pages/Payment/Payment";
import ShowUserOrderDetails from "./Pages/ShowUserOrderDetails/ShowUserOrderDetails";
import Profile from "./Pages/Profile/Profile";
import Policies from "./Pages/Policies/Policies";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const [loginAccess, setLoginAccess] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      window.location.replace("/dashboard");
    }
  }, []);

  useEffect(() => {
    const verifyLoginStatus = async () => {
      try {
        const response = await dispatch(getUserLoginStatus()).unwrap();

        if (response.isLoggedIn && response.user.role) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", response.user.role);
          setLoginAccess(true);
        } else {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("role");
          setLoginAccess(false);
        }
      } catch (error) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        setLoginAccess(false);
      }
    };

    verifyLoginStatus();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/policies/:policyName" element={<Policies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/resetPassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/product/:id" element={<ProductDisplay />} />
          <Route
            path="/:productId/order/:quantity"
            element={<OrderDisplay />}
          />
          <Route
            path="/cart"
            element={
              loginAccess === null ? (
                <Spinner animation="grow" />
              ) : loginAccess ? (
                <Cart />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/products/category/:category"
            element={<CategoryPage />}
          />
          <Route
            path="/products/oder/userOrderDetails/:orderId"
            element={<ShowUserOrderDetails />}
          />

          <Route
            path="/EBS-admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardSidebar>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </AdminDashboardSidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/EBS-admin/manage-products"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardSidebar>
                  <Layout>
                    <ManageProducts />
                  </Layout>
                </AdminDashboardSidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/EBS-admin/categories&tags"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardSidebar>
                  <Layout>
                    <CategoriesAndTags />
                  </Layout>
                </AdminDashboardSidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/EBS-admin/inventory-management"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardSidebar>
                  <Layout>
                    <InventoryManagement />
                  </Layout>
                </AdminDashboardSidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/EBS-admin/discounts&promotions"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardSidebar>
                  <Layout>
                    <DiscountAndPromotion />
                  </Layout>
                </AdminDashboardSidebar>
              </ProtectedRoute>
            }
          />
          <Route
            path="/EBS-admin/view-all-orders"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardSidebar>
                  <Layout>
                    <ViewAllOrders />
                  </Layout>
                </AdminDashboardSidebar>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
