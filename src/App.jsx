import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react'
import Header from './ui/Header';
import Footer from './ui/Footer';
import Productos from "./components/Productos";
import Cesta from "./pages/Cart";
import Contacto from "./pages/Contacto";
import Login from "./components/login/Login";
import "./components/producto.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {

  const location = useLocation(); 

  const [login, setLogin] = useState(false)
  const [loginData, setLoginData] = useState({}) // Respuesta de autenticación, json completo

  const actualizarLogin = (login, loginData) => { // Mete la información al estado
    setLogin(login)
    setLoginData(loginData)
    localStorage.setItem('login', 'true')
    localStorage.setItem('idToken', loginData.idToken)
  }

  return (
    <div className="App">
      <Header className="header" />
      <div className="main-content">
        
        {location.pathname === '/' && <h2>Escoge tus artículos favoritos</h2>}
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/cesta" element={<Cesta />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login actualizarLogin={actualizarLogin}/>} />
        </Routes>
      </div>
      <Footer  />
    </div>
    
  );
}

export default App;
