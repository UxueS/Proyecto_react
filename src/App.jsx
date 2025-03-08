import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Card } from "react-bootstrap";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Login from "./components/login/Login";
import saludo from "./components/saludo.json";
import "./components/producto.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

// Lazy load components
const Productos = lazy(() => import("./components/Productos"));
const Cesta = lazy(() => import("./pages/Cart"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Pedidos = lazy(() => import("./pages/Pedidos"));

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [loginData, setLoginData] = useState(null);
    const [loading, setLoading] = useState(false);

    const actualizarLogin = (status) => {
        setLogin(status);
    };

    const actualizarLoginData = (data) => {
        setLoginData(data);
    };

    useEffect(() => {
        if (location.pathname === "/productos") {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [location.pathname]);

    return (
        <div className="App">
            <Header className="header" login={login} loginData={loginData} actualizarLogin={actualizarLogin} actualizarLoginData={actualizarLoginData}/>

            <div className="main-content">
                {location.pathname === "/" && (
                    <motion.div
                        className="welcome-container"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Card style={{ backgroundColor: "#f3fdfe" }} className="p-4">
                            <h1 className="welcome-title">
                                ¡Bienvenid@ a Papelería Trazos!{" "}
                                <motion.span
                                    animate={{ rotate: [0, 20, -20, 20, -20, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{ display: "inline-block" }}
                                >
                                    👋
                                </motion.span>
                            </h1>
                            <p className="welcome-text">Explora nuestro catálogo y encuentra todo lo que necesitas.</p>

                            <motion.div
                                className="promo-banner"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                🎉 ¡Este mes <span>3x2</span> en todos nuestros productos! 🎉
                            </motion.div>

                            <Lottie animationData={saludo} className="saludo-animation" loop autoplay />

                            <motion.button
                                className="explore-button"
                                onClick={() => navigate("/productos")}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Ver catálogo
                            </motion.button>
                        </Card>
                    </motion.div>
                )}
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/productos" element={loading ? <div className="loading-container"><div className="spinner"></div><div className="loading-text">Cargando nuestra lista de productos...</div></div> : <Productos />} />
                        <Route path="/cesta" element={loginData ? <Cesta usuario={loginData} /> : <Navigate to={`/login?redirect=${location.pathname}`} />} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/login" element={<Login actualizarLogin={actualizarLogin} actualizarLoginData={actualizarLoginData} />} />
                        <Route path="/pedidos" element={loginData ? <Pedidos usuario={loginData} /> : <Navigate to={`/login?redirect=${location.pathname}`} />} />
                    </Routes>
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}

export default App;