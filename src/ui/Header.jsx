import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ login, loginData, actualizarLogin }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        actualizarLogin(false, {}); // Cerrar sesión
        navigate("/"); // Redirigir a inicio
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img src="/icons/logo.jpg" alt="Logo Trazos" className="logo-img" />
            </div>
            <div className="brand-name">Papelería Trazos</div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/pedidos">Mis pedidos</Link></li>
                    <li><Link to="/contacto">Contacto</Link></li>
                    <li><Link to="/cesta">Mi Cesta</Link></li>
                    
                    {login ? (
                        <li className="user-info">
                            <span style={{ color: "#12285f", fontWeight: "bold" }}>Hola, {loginData.email.split('@')[0]}</span>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}


                </ul>
            </nav>
        </header>
    );
}

export default Header;
