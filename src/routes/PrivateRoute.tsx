import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
