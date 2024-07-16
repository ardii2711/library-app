import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import React from "react";

import { ThemeProvider } from "./utils/contexts/theme-provider";
import { TokenProvider } from "./utils/contexts/token";
import App from "./routes";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
        <Toaster position="top-center" />
      </ThemeProvider>
    </TokenProvider>
  </React.StrictMode>
);
