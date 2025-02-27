import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/icons/logo.jpg" alt="Logo Trazos" className="logo-img" />
      </div>
      <div className="brand-name">Papelería Trazos</div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Inicio</Link></li> 
          <li><Link to="/#productos">Productos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/cesta">Cesta</Link></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Header;
