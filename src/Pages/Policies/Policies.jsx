import { Container, Row } from "react-bootstrap";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import { useParams } from "react-router-dom";
import PaymentAndReturnPolicy from "./PaymentAndReturnPolicy";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";

const Policies = () => {
  const { policyName } = useParams();

  return (
    <>
      <NavbarComponent />
      <Container className="my-4 py-3">
        <Row
          style={{
            padding: "32px",
            paddingInline: "64px",
            marginInline: "100px",
          }}
        >
          {policyName === "return-and-refund-policy" && (
            <PaymentAndReturnPolicy />
          )}
          {policyName === "terms-of-services" && <TermsOfService />}
          {policyName === "privacy-policy" && <PrivacyPolicy />}
        </Row>
      </Container>
    </>
  );
};

export default Policies;
