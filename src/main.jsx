import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // Cambio en la importación
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Reemplazamos ReactDOM.render() con createRoot().render()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
