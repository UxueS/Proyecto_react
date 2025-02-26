import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './ui/Header';
import Productos from "./components/Productos";
import "./components/producto.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <Router>
    <div className="App">
        <Header className="header" />
        <div className="main-content">
            <h1>Tienda de material escolar</h1>
            <Productos />
        </div>
    </div>
</Router>

  );
}

export default App;
