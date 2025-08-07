import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "@/app/store";

const ProtectedRoute = () => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);

  return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;
