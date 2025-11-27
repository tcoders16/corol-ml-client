import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Smooth fade-in on initial load
document.body.style.opacity = "0";
window.addEventListener("DOMContentLoaded", () => {
  document.body.style.transition = "opacity 0.4s ease-out";
  document.body.style.opacity = "1";
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);