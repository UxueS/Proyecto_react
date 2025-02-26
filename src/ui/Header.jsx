import React from 'react';
import { Link } from 'react-router-dom'; // Usaremos Link para redirección

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/icons/logo.jpg" alt="Logo Trazos" className="logo-img" />
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="#home">Inicio</Link></li>
          <li><Link to="#productos">Productos</Link></li>
          <li><Link to="#ofertas">Ofertas</Link></li>
          <li><Link to="#contacto">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
