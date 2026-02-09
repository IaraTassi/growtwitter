import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "../App";
import { LoginPage } from "../features/auth/LoginPage";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
