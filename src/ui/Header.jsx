import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/icons/logo.jpg" alt="Logo Trazos" className="logo-img" />
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Inicio</Link></li> {/* Redirige a la página principal */}
          <li><Link to="/#productos">Productos</Link></li>
          <li><Link to="/#contacto">Contacto</Link></li>
          <li><Link to="/cesta">Cesta</Link></li> {/* Ahora funciona correctamente */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
