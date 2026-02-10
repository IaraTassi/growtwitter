import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { LoginPage } from "../features/auth/pages/LoginPage";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
