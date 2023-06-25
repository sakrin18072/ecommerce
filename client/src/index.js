import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthorizationContext";
import { CartProvider } from "./Contexts/CartContext";
import "antd/dist/reset.css";
import { SearchProvider } from "./Contexts/SearchContext";
import('preline')
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
    <SearchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
    </CartProvider>
  </AuthProvider>
);
