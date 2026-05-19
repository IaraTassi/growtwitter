import { Outlet } from "react-router-dom";
import { useSessionManager } from "../hooks/useSessionManager";

export function SessionManagerProvider() {
  useSessionManager();

  return <Outlet />;
}
