import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { loadTheme } from "./services/themeStorage";

// Apply the saved theme before React renders to avoid a color flash.
document.documentElement.dataset.theme = loadTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
