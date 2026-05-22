import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useAppDispatch } from "./redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { logout } from "../features/auth/store/authSlice";

interface JwtPayload {
  exp: number;
}

export function useSessionManager() {
  const token = useSelector((s: RootState) => s.auth.token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const expiredRef = useRef(false);

  useEffect(() => {
    if (!token) {
      expiredRef.current = false;

      return;
    }

    const handleSessionExpired = () => {
      if (expiredRef.current) return;

      expiredRef.current = true;

      dispatch(logout());

      queueMicrotask(() => {
        navigate("/login?expired=true", {
          replace: true,
        });
      });
    };

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const expirationTime = decoded.exp * 1000;

      const checkExpiration = () => {
        if (Date.now() >= expirationTime) {
          handleSessionExpired();
        }
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          checkExpiration();
        }
      };

      const remainingTime = expirationTime - Date.now();

      if (remainingTime <= 0) {
        handleSessionExpired();

        return;
      }

      const timeoutId = setTimeout(() => {
        handleSessionExpired();
      }, remainingTime);

      window.addEventListener("focus", checkExpiration);

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        clearTimeout(timeoutId);

        window.removeEventListener("focus", checkExpiration);

        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      };
    } catch {
      dispatch(logout());

      navigate("/login", {
        replace: true,
      });
    }
  }, [token, dispatch, navigate]);
}
