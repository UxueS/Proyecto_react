import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Contexto del carrito
import App from "./App"; 
import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CartProvider> {/* Aquí se envuelve toda la app con el carrito */}
            <BrowserRouter> {/* El único Router debe estar aquí */}
                <App />
            </BrowserRouter>
        </CartProvider>
    </React.StrictMode>
);
