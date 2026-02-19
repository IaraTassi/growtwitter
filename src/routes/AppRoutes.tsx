import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { FeedPage } from "../features/feed/pages/FeedPage";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/app" element={<App />}>
          <Route index element={<FeedPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);
