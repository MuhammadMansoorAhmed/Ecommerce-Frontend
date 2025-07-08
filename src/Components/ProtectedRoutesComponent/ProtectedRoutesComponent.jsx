import { Navigate } from "react-router-dom";
import useAdminAuth from "../../Hooks/useAdminAuth";


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, requiredRole }) => {
  const { loading, isLoggedIn, role } = useAdminAuth();

  if (loading) {
    return <div className="text-center">Varifying User...</div>;
  }

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
