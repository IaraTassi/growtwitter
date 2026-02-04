import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "../App";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {/* outras rotas aqui */}
    </Routes>
  </BrowserRouter>
);
