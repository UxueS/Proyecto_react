import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './ui/Header';
import Productos from "./components/Productos";
import "./components/producto.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <h1>Tienda de Material Escolar</h1>
        <Productos />
      </div>
    </Router>
  );
}

export default App;
