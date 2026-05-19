import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { AppRoutes } from "./routes/AppRoutes";
import { store } from "./store/store";
import { ThemeModeProvider } from "./theme/ThemeModeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeModeProvider>
        <AppRoutes />
      </ThemeModeProvider>
    </Provider>
  </React.StrictMode>,
);
