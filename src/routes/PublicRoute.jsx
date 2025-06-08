import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  return userId ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
