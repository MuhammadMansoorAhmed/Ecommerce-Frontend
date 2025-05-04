/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return (
      <div className="adminMainDashboard d-flex justify-content-center align-items-center">
        <h3 className="text-danger">Access Denied</h3>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
