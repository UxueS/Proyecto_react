import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './ui/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Aquí puedes agregar el contenido principal de la app */}
      </div>
    </Router>
  );
}

export default App;
