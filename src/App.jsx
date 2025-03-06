import { useState } from "react";
import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
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
import Lottie from "lottie-react";
import saludo from "./components/saludo.json";  // Animación de monigote

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [loginData, setLoginData] = useState(null);

    const actualizarLogin = (status) => {
        setLogin(status);
    };

    const actualizarLoginData = (data) => {
        setLoginData(data);
    };

    return (
        <div className="App">
            <Header className="header" login={login} loginData={loginData} actualizarLogin={actualizarLogin} />
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

                        {/* 🎬 Animación Lottie del monigote */}
                        <Lottie animationData={saludo} className="saludo-animation" loop autoplay />

                        <motion.button
                            className="explore-button"
                            onClick={() => navigate("/productos")}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Ver catálogo
                        </motion.button>
                    </motion.div>
                )}
                <Routes>
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/cesta" element={loginData ? <Cesta usuario={loginData} /> : <Navigate to="/login" />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login actualizarLogin={actualizarLogin} actualizarLoginData={actualizarLoginData} />} />
                    <Route path="/pedidos" element={loginData ? <Pedidos usuario={loginData} /> : <Navigate to="/login" />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
