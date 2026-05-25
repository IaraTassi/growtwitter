import { Outlet } from "react-router-dom";
import { Sidebar } from "./features/feed/components/Sidebar";
import { RightBar } from "./features/feed/components/RightBar";
import { Box, Divider } from "@mui/material";
import { MobileTopBar } from "./components/layout/mobile/MobileTopBar";
import { MobileBottomNav } from "./components/layout/mobile/MobileBottomNav";
import { useAppDispatch } from "./hooks/redux";
import { useEffect } from "react";
import { loadAuth } from "./features/auth/store/authStorage";
import { hydrate } from "./features/auth/store/authSlice";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const persistedAuth = loadAuth();

    console.log("BOOT AUTH:", persistedAuth);

    dispatch(hydrate(persistedAuth ?? { user: null, token: null }));
  }, [dispatch]);

  return (
    <Box
      className="app-container"
      sx={(theme) => ({
        backgroundColor: theme.custom.layout.outer,
        minHeight: "100vh",
        pt: { xs: "56px", md: 0 },
        pb: { xs: "56px", md: 0 },
      })}
    >
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <MobileTopBar />
      </Box>
      <Box
        className="sidebar"
        sx={(theme) => ({
          display: {
            xs: "none",
            md: "flex",
          },
          backgroundColor: theme.custom.layout.inner,
        })}
      >
        <Sidebar />
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={(theme) => ({
          display: {
            xs: "none",
            md: "flex",
          },
          color: theme.palette.divider,
        })}
      />
      <Box
        className="main"
        sx={(theme) => ({
          backgroundColor: theme.custom.layout.inner,
        })}
      >
        <Outlet />
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={(theme) => ({
          display: {
            xs: "none",
            md: "flex",
          },
          color: theme.palette.divider,
        })}
      />
      <Box
        className="rightbar"
        sx={(theme) => ({
          display: {
            xs: "none",
            md: "flex",
          },
          backgroundColor: theme.custom.layout.inner,
        })}
      >
        <RightBar />
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <MobileBottomNav />
      </Box>
    </Box>
  );
}
