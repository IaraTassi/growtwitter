import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { FeedPage } from "../features/feed/pages/FeedPage";
import { ExplorerPage } from "../features/feed/pages/ExplorerPage";
import { ProfilePage } from "../features/feed/pages/ProfilePage";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/app" element={<App />}>
          <Route index element={<FeedPage />} />
          <Route path="explorer" element={<ExplorerPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);
