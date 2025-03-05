import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Productos from "./components/Productos";
import Cesta from "./pages/Cart";
import Contacto from "./pages/Contacto";
import Login from "./components/login/Login";
import Pedidos from "./pages/Pedidos";
import "./components/producto.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { motion } from "framer-motion"; 
import Lottie from "lottie-react";  // ✅ Corrección aquí
import saludo from "./components/saludo.json";  // ✅ Revisa la ruta del archivo JSON

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [loginData, setLoginData] = useState(null);

    return (
        <div className="App">
            <Header className="header" login={login} loginData={loginData} actualizarLogin={setLogin} />
            <div className="main-content">
                {location.pathname === "/" && (
                    <motion.div
                        className="welcome-container"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="welcome-title">¡Bienvenido a Papelería Trazos! 👋</h1>
                        <p className="welcome-text">Explora nuestro catálogo y encuentra todo lo que necesitas.</p>
                        
                        {/* 🎬 Animación Lottie corregida */}
                        <Lottie animationData={saludo} className="saludo-animation" loop autoplay />

                        <motion.button
                            className="explore-button"
                            onClick={() => navigate("/productos")}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Ver Catálogo
                        </motion.button>
                    </motion.div>
                )}
                <Routes>
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/cesta" element={<Cesta usuario={loginData} />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login actualizarLogin={setLogin} />} />
                    <Route path="/pedidos" element={<Pedidos usuario={loginData} />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
