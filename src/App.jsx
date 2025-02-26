import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './ui/Header';
import Producto from './components/Producto'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Producto />
        <Producto />
        {/* Aquí puedes agregar el contenido principal de la app */}
      </div>
    </Router>
  );
}

export default App;
