import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Papelería Trazos - Todos los derechos reservados</p>
        <p>Teléfono: 948 123 456</p>
      </div>
    </footer>
  );
};

export default Footer;
