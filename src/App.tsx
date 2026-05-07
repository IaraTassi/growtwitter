import { Outlet } from "react-router-dom";
import { Sidebar } from "./features/feed/components/Sidebar";
import { RightBar } from "./features/feed/components/RightBar";
import { Box, Divider } from "@mui/material";

export function App() {
  return (
    <Box
      className="app-container"
      sx={(theme) => ({
        backgroundColor: theme.custom.layout.outer,
        minHeight: "100vh",
      })}
    >
      <Box
        className="sidebar"
        sx={(theme) => ({
          backgroundColor: theme.custom.layout.inner,
        })}
      >
        <Sidebar />
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={(theme) => ({ color: theme.palette.divider })}
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
        sx={(theme) => ({ color: theme.palette.divider })}
      />
      <Box
        className="rightbar"
        sx={(theme) => ({
          backgroundColor: theme.custom.layout.inner,
        })}
      >
        <RightBar />
      </Box>
    </Box>
  );
}
