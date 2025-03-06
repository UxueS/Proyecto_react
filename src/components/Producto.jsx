import { useState, useContext } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function Producto({ nombre, imagen, precio, descripcion }) {
    const [show, setShow] = useState(false);
    const [cantidad, setCantidad] = useState(0);
    const { addToCart } = useContext(CartContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const incrementarCantidad = () => setCantidad(cantidad + 1);
    const decrementarCantidad = () => {
        if (cantidad > 0) setCantidad(cantidad - 1);
    };

    const handleAddToCart = () => {
        addToCart({ nombre, imagen, precio: parseFloat(precio) }, cantidad);
        setCantidad(0);
    };

    const particlesInit = async (engine) => {
        await loadSlim(engine);
    };

    return (
        <Container fluid className="producto-container" style={{ position: "relative", marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}>
            {nombre === "Goma de borrar" && (
                <>
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        options={{
                            fullScreen: false,
                            particles: {
                                number: { value: 200 }, // Más estrellas
                                shape: { type: "star" },
                                size: { value: { min: 1, max: 4 } },
                                move: {
                                    enable: true,
                                    speed: 0.3,
                                    direction: "top",
                                    random: true,
                                    straight: false,
                                    outModes: { default: "out" },
                                },
                                opacity: {
                                    value: { min: 0.5, max: 1 },
                                    animation: {
                                        enable: true,
                                        speed: 0.2,
                                        minimumValue: 0.3,
                                        sync: false,
                                    },
                                },
                                color: { value: ["#FFD700", "#FFFACD", "#FFA500"] },
                            },
                            interactivity: {
                                events: {
                                    onHover: { enable: false },
                                    onClick: { enable: false },
                                },
                            },
                            detectRetina: true,
                        }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 0,
                            pointerEvents: "none",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "-10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "linear-gradient(45deg,rgb(20, 127, 240),rgb(34, 50, 190))",
                            color: "#fff",
                            padding: "5px 15px",
                            borderRadius: "20px",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            boxShadow: "0 0 10px rgba(222, 232, 245, 0.8)",
                            zIndex: 10,
                        }}
                    >
                        BEST SELLER
                    </div>
                </>
            )}
            <Row className="align-items-center">
                <Col xs={3} md={2} className="d-flex justify-content-center">
                    <img src={`/icons/${imagen}`} alt={nombre} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                </Col>
                <Col xs={6} md={4}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}>{nombre}</h2>
                    <p style={{ fontSize: "1.2rem", color: "#555" }}>{precio} €</p>
                </Col>
                <Col xs={3} md={2} className="d-flex justify-content-center">
                    <Button variant="warning" onClick={handleShow}>Más info</Button>
                </Col>
                <Col xs={6} md={2} className="d-flex justify-content-center align-items-center">
                    <Button variant="danger" onClick={decrementarCantidad} style={{ marginRight: "10px" }}>-</Button>
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{cantidad}</span>
                    <Button variant="success" onClick={incrementarCantidad} style={{ marginLeft: "10px" }}>+</Button>
                </Col>
                <Col xs={6} md={2} className="d-flex justify-content-center">
                    <Button variant="primary" onClick={handleAddToCart}>Añadir al carro</Button>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de {nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Precio:</strong> {precio} €</p>
                    <p><strong>Descripción:</strong> {descripcion}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Producto;