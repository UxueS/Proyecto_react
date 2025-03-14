import React from "react";
import { useNavigate } from "react-router-dom";

function Aniversario() {
    const navigate = useNavigate();

    return (
        <div className="container-lg my-5">
            <div className="row align-items-center" id="promocion">
                
                {/* Columna de Texto */}
                <div className="col-md-6">
                    <h1 className="text-center mb-4" style={{ color: "#12285f", fontWeight: "bold" }}>
                        ¡Promoción especial 3x2 en Papelería Trazos!
                    </h1>
                    <h3 className="text-center mb-3" style={{ color: "#333" }}>
                        Llena tu mochila al mejor precio
                    </h3>
                    <p className="text-justify" style={{ fontSize: "1.1rem" }}>
                        Para celebrar nuestro <strong>5º Aniversario</strong> queremos agradecerte con una oferta
                        única: <span style={{ color: "#dc3545", fontWeight: "bold" }}>¡Llévate 3 productos y paga solo 2!</span>
                        <br /><br />
                        Renueva tu material escolar, de oficina o manualidades y ahorra en cada compra. 
                        <br />
                        <span style={{ color: "#1C75BC", fontWeight: "bold" }}>¡Solo por tiempo limitado!</span>
                    </p>
                    <div className="text-center mt-4">
                        <button
                            className="btn btn-primary btn-lg px-4 py-2 fw-bold shadow" style={{ backgroundColor: "#12285f" }}
                            onClick={() => navigate('/productos')}
                        >
                            Ver todos los productos
                        </button>
                    </div>
                </div>

                {/* Columna de Imagen */}
                <div className="col-md-6 text-center">
                    <img
                        src="/icons/papeleria.jpg"
                        alt="Papelería Trazos"
                        className="img-fluid rounded shadow-lg"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Aniversario;
