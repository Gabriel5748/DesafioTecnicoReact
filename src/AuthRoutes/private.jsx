import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token == "true" ? <Outlet /> : <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoute;
