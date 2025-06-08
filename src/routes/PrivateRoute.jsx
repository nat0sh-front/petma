import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  return userId ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
