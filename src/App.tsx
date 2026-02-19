import { Outlet } from "react-router-dom";
import { Sidebar } from "./features/feed/components/Sidebar";
import { RightBar } from "./features/feed/components/RightBar";

export function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <RightBar />
    </div>
  );
}
