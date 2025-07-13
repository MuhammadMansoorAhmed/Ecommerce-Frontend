import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import "./HomeFooter.css";
import { useNavigate } from "react-router-dom";

const HomeFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-light border-top pt-4 mt-5">
      <Container>
        <Row className="gy-4 justify-content-between">
          {/* Column 1 */}
          <Col xs={12} md={3}>
            <h6 className="fw-semibold mb-3">Account</h6>
            <ul className="list-unstyled text-muted small">
              <li className="mb-1">My Account</li>
              <li className="mb-1">Order Tracking</li>
              <li className="mb-1">Checkout</li>
              <li className="mb-1">Wishlist</li>
            </ul>
          </Col>

          {/* Column 2 */}
          <Col xs={12} md={3}>
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled text-muted small">
              <li className="mb-1">About</li>
              <li className="mb-1">Blogs</li>
              <li className="mb-1">Contact</li>
              <li className="mb-1">FAQ</li>
            </ul>
          </Col>

          {/* Column 3 */}
          <Col xs={12} md={3} className="d-flex flex-column">
            <h6 className="fw-semibold mb-3">Support</h6>
            <ul className="list-unstyled text-muted small">
              <li
                className="mb-1"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/policies/${"return-and-refund-policy"}`);
                }}
              >
                Shipping Policy
              </li>
              <li
                onClick={() => {
                  navigate(`/policies/${"return-and-refund-policy"}`);
                }}
                className="mb-1 "
                style={{ cursor: "pointer" }}
              >
                Return Policy
              </li>
              <li
                className="mb-1"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/policies/${"privacy-policy"}`);
                }}
              >
                Privacy Policy
              </li>
              <li
                className="mb-1"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/policies/${"terms-of-services"}`);
                }}
              >
                Terms of Service
              </li>
            </ul>
          </Col>

          {/* Column 4 - Newsletter */}
          <Col xs={12} md={3}>
            <h6 className="fw-semibold mb-3">Subscribe</h6>
            <div className="bg-white rounded-pill p-1 d-flex">
              <input
                type="email"
                placeholder="Enter email"
                className="form-control border-0 rounded-pill shadow-none ps-3"
                style={{ fontSize: "0.9rem" }}
              />
              <button className="btn btn-dark btn-sm px-3 rounded-pill ms-2">
                Subscribe
              </button>
            </div>

            <div className="d-flex gap-3 mt-3 justify-content-start">
              <FaInstagram className="footer-icon" />
              <FaFacebook className="footer-icon" />
              <FaXTwitter className="footer-icon" />
              <FaTiktok className="footer-icon" />
              <FaPinterest className="footer-icon" />
            </div>
          </Col>
        </Row>

        <hr className="my-3" />
        <p className="text-center text-muted small mb-0">
          &copy; {new Date().getFullYear()} Your Brand Name. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
};

export default HomeFooter;
