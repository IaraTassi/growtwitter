import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function PrivateRoute() {
  const token = useSelector((state: RootState) => state.auth.token);

  const location = useLocation();

  if (!token) {
    const expired = location.pathname !== "/login";

    return <Navigate to={expired ? "/login?expired=true" : "/login"} replace />;
  }

  return <Outlet />;
}
