import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Login from "./components/login/Login";
import ValoracionesClientes from "./components/ValoracionesClientes";
import Aniversario from "./components/Aniversario";
import Bienvenida from "./components/Bienvenida"; 
import "./components/producto.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

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
                    <>
                        <Bienvenida /> 
                        <Aniversario />
                        <ValoracionesClientes />
                    </>
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