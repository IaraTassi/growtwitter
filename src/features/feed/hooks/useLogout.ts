import { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../auth/store/authSlice";

export function useLogout() {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const requestLogout = () => {
    setOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setOpen(false);
  };

  const cancelLogout = () => {
    setOpen(false);
  };

  return {
    open,
    requestLogout,
    confirmLogout,
    cancelLogout,
  };
}
