import { useState, useContext } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

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
    
    return (
        <Container fluid className="producto" style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}>
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
