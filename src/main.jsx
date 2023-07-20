import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Agregamos el archivo CSS de Tailwind
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
