import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../Redux/Services/authServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus != true) {
      navigate("/login");
    }
    const getUser = async () => {
      const response = await dispatch(getCurrentUser());
      if (response.meta.requestStatus === "fulfilled") {
        setUser(response.payload.data);
        return;
      }
      toast.error("failed to fetch user data");
      return;
    };
    getUser();
  }, [dispatch]);

  return (
    <Container
      className="mt-4  py-2 shadow"
      style={{
        borderRadius: "12px",
        backgroundColor: "#f7f7f7",
        marginBottom: "32px",
      }}
    >
      <Row
        className="p-3 d-flex justify-content-center align-items-center border-bottom"
        style={{
          //   borderRadius: "12px",
          borderColor: "#f7f7f7",
        }}
      >
        <Col
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="d-flex align-items-center  flex-column p-2"
        >
          <div
            className="rounded-circle bg-warning d-flex justify-content-center align-items-center text-white"
            style={{
              width: "120px",
              height: "120px",
            }}
          >
            <img
              style={{
                width: "120px",
                height: "120px",
              }}
              className="rounded-circle"
              src={user?.photo}
              alt="Profile Picture"
            />
          </div>
          <div className="mt-3">
            <p style={{ color: "#a4a4a4" }} className="mb-0">
              {user?.userName}
            </p>
            <p style={{ color: "#a4a4a4" }} className="mb-0">
              {user?.email}
            </p>
          </div>
        </Col>
      </Row>
      <Row className="p-3">
        <Col sm={12} md={6} lg={6} xl={6}>
          <p>FullName</p>
          <p>Email</p>
          <p>UserName</p>
          <p>Contact</p>
          <p>Date Of Birth</p>
        </Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <p>{user?.fullName}</p>
          <p>{user?.email}</p>
          <p>{user?.userName}</p>
          <p>{user?.contact}</p>
          <p>{user?.dateOfBirth.split("T")[0]}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
