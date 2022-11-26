import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../contexts/AuthProvider";
import useRole from "../../hooks/useRole";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isLoading] = useRole(user?.email);
  const location = useLocation();

  if (loading || isLoading) {
    return <Spinner></Spinner>;
  }
  if (user?.email && role.role === "Seller") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
