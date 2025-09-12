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
              <FaInstagram className="footer-icon" onClick={() => window.open("https://www.instagram.com/ravaahscents/", "_blank")}/>
              <FaFacebook className="footer-icon" onClick={() => window.open("https://www.facebook.com/profile.php?id=61578224380180", "_blank")} />
              <FaXTwitter className="footer-icon" />
              <FaTiktok className="footer-icon" onClick={() => window.open("https://www.tiktok.com/@ravaahstore?_r=1&_d=edbflg1h404emg&sec_uid=MS4wLjABAAAAS337-2UvYAEFNQafcQLBMzZIJOp5P6FDunb48L24YHm4MjV2fHa-u7TZGmGkYev9&share_author_id=7528166952020214800&sharer_language=en&source=h5_m&u_code=e883a0i7bi5ka9&timestamp=1757697626&user_id=7239590894089290757&sec_user_id=MS4wLjABAAAAO0QJg4n9ilzf71V7bm6h4BUvSpcxoXqr-MqYSI5xsLVCaKJtpcq6bRhDd9WfesiJ&item_author_type=2&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7549090565889246994&share_link_id=06cc0898-a409-48f4-96b2-9f9705b58f5a&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b6880%2Cb5836&social_share_type=5&enable_checksum=1", "_blank")} />
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
