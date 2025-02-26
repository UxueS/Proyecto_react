import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'; // ❌ NO IMPORTAMOS Router AQUÍ
import Header from './ui/Header';
import Productos from "./components/Productos";
import Cesta from "./pages/Cart"; // Antes era "Cesta.jsx", ahora está como "Cart.jsx"
import "./components/producto.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <div className="App">
      <Header className="header" />
      <div className="main-content">
        <h1>Escoge tus artículos favoritos</h1>
        <Routes> {/* Solo Routes, sin Router */}
          <Route path="/" element={<Productos />} />
          <Route path="/cesta" element={<Cesta />} /> {/* Asegúrate de que el nombre sea correcto */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
