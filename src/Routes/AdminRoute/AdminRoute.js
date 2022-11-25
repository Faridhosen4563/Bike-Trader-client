import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../contexts/AuthProvider";
import useRole from "../../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isLoading] = useRole(user?.email);
  console.log(role.role, isLoading);
  const location = useLocation();

  if (loading || isLoading) {
    return <Spinner></Spinner>;
  }
  if (user?.email && role.role === "Admin") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
