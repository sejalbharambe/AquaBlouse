import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return children; // For now, just return children without any checks
    //  const user = localStorage.getItem("user");
  // return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;