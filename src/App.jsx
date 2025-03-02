import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
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
    const [login, setLogin] = useState(false);
    const [loginData, setLoginData] = useState({});

    const actualizarLogin = (isLogged, data) => {
        setLogin(isLogged);
        setLoginData(isLogged ? data : {});
    };

    return (
        <div className="App">
            <Header className="header" login={login} loginData={loginData} actualizarLogin={actualizarLogin} />
            <div className="main-content">
                {location.pathname === '/' && <h2>Escoge tus artículos favoritos</h2>}
                <Routes>
                    <Route path="/" element={<Productos />} />
                    <Route path="/cesta" element={<Cesta />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login actualizarLogin={actualizarLogin} />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
