import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { AppRoutes } from "./routes/AppRoutes";
import { store } from "./store/store";
import { createAppTheme } from "./theme/createAppTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createAppTheme("dark")}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
