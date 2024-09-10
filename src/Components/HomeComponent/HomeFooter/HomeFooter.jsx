import { Container } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "./HomeFooter.css";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const HomeFooter = () => {
  return (
    <Container className="border-top">
      <Row>
        <Col></Col>
      </Row>
      <Row className="d-flex justify-content-evenly py-4">
        <Col sm={5} md={3} lg={3} xl={3}>
          <ul className="footerLinkContainer">
            <li className="footerFirstLinks">Account</li>
            <li className="footerLinks">My Account</li>
            <li className="footerLinks">Order Tracking</li>
            <li className="footerLinks">Checkout</li>
            <li className="footerLinks">Whitelist</li>
          </ul>
        </Col>
        <Col sm={5} md={3} lg={3} xl={3}>
          <ul className="footerLinkContainer">
            <li className="footerFirstLinks">Quick Links</li>
            <li className="footerLinks">About</li>
            <li className="footerLinks">Blogs</li>
            <li className="footerLinks">Contact</li>
            <li className="footerLinks">FAQ</li>
          </ul>
        </Col>
        <Col sm={5} md={3} lg={3} xl={3}>
          <ul className="footerLinkContainer">
            <li className="footerFirstLinks">Account</li>
            <li className="footerLinks">My Account</li>
            <li className="footerLinks">Order Tracking</li>
            <li className="footerLinks">Checkout</li>
            <li className="footerLinks">Whitelist</li>
          </ul>
        </Col>
        <Col sm={5} md={3} lg={3} xl={3}>
          <ul className="footerLinkContainer">
            <li className="footerFirstLinks" style={{ fontSize: "24px" }}>
              News Letter
            </li>

            <li className="footerLinks">
              <div
                className="d-flex "
                style={{ backgroundColor: "#66666620", borderRadius: "32px" }}
              >
                <input
                  type="text"
                  placeholder=""
                  className="subscriptionInput"
                />
                <button className="emailSubBtn">Subscribe</button>
              </div>
            </li>
            <li className="list-unstyledfooterLinks d-flex justify-content-center m-3">
              <div className="footerSocialLinks m-1 footerLinks">
                <FaInstagram size={25} />
              </div>
              <div className="footerSocialLinks m-1 footerLinks">
                <FaFacebook size={25} />
              </div>
              <div className="footerSocialLinks m-1 footerLinks">
                <FaXTwitter size={25} />
              </div>
              <div className="footerSocialLinks m-1 footerLinks">
                <FaTiktok size={25} />
              </div>
              <div className="footerSocialLinks m-1 footerLinks">
                <FaPinterest size={25} />
              </div>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeFooter;
