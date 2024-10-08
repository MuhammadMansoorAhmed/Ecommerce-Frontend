import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Sidebar from "./Components/CategoryPageComponents/Sidebar";
import Layout from "./Components/CategoryPageComponents/Layout";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import ProductDisplay from "./Pages/ProductDisplay/ProductDisplay";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AdminDashboardSidebar from "./Components/AdminDashboardComponent/AdminDashboardSidebar";
import ManageProducts from "./Pages/ManageProducts/ManageProducts";
import CategoriesAndTags from "./Pages/Category&Tags/CategoriesAndTags";
import InventoryManagement from "./Pages/InventoryManagement/InventoryManagement";
import DiscountAndPromotion from "./Pages/DiscountAndPromotion/DiscountAndPromotion";
import OrderDisplay from "./Pages/OrderDetails/OrderDetails";
import ViewAllOrders from "./Pages/AdminOrderManagement/ViewAllOrders";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDisplay />} />
          <Route path="/order/:id" element={<OrderDisplay />} />

          <Route
            path="/category/:product-type/:category"
            element={
              <Sidebar>
                <Layout>
                  <CategoryPage />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/EBS-admin"
            element={
              <AdminDashboardSidebar>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </AdminDashboardSidebar>
            }
          />
          <Route
            path="/EBS-admin/manage-products"
            element={
              <AdminDashboardSidebar>
                <Layout>
                  <ManageProducts />
                </Layout>
              </AdminDashboardSidebar>
            }
          />
          <Route
            path="/EBS-admin/categories&tags"
            element={
              <AdminDashboardSidebar>
                <Layout>
                  <CategoriesAndTags />
                </Layout>
              </AdminDashboardSidebar>
            }
          />
          <Route
            path="/EBS-admin/inventory-management"
            element={
              <AdminDashboardSidebar>
                <Layout>
                  <InventoryManagement />
                </Layout>
              </AdminDashboardSidebar>
            }
          />
          <Route
            path="/EBS-admin/discounts&promotions"
            element={
              <AdminDashboardSidebar>
                <Layout>
                  <DiscountAndPromotion />
                </Layout>
              </AdminDashboardSidebar>
            }
          />
          <Route
            path="/EBS-admin/view-all-orders"
            element={
              <AdminDashboardSidebar>
                <Layout>
                  <ViewAllOrders />
                </Layout>
              </AdminDashboardSidebar>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
