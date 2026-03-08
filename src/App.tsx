import { Outlet } from "react-router-dom";
import { Sidebar } from "./features/feed/components/Sidebar";
import { RightBar } from "./features/feed/components/RightBar";
import { Box, Divider } from "@mui/material";

export function App() {
  return (
    <Box className="app-container">
      <Box className="sidebar">
        <Sidebar />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box className="main">
        <Outlet />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box className="rightbar">
        <RightBar />
      </Box>
    </Box>
  );
}
