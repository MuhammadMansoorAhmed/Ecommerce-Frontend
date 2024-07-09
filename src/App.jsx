import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Sidebar from "./Components/CategoryPageComponents/Sidebar";
import Layout from "./Components/CategoryPageComponents/Layout";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import ProductDisplay from "./Pages/ProductDisplay/ProductDisplay";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDisplay />} />

          <Route
            path="/category/:product-type/:categoryId"
            element={
              <Sidebar>
                <Layout>
                  <CategoryPage />
                </Layout>
              </Sidebar>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
