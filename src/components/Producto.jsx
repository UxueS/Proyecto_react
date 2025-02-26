import { useState, useContext } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

function Producto({ nombre, imagen, precio, descripcion }) {
    const [show, setShow] = useState(false);
    const [cantidad, setCantidad] = useState(0);
    const { addToCart } = useContext(CartContext); // Usamos el contexto del carrito

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const incrementarCantidad = () => setCantidad(cantidad + 1);
    const decrementarCantidad = () => {
        if (cantidad > 0) setCantidad(cantidad - 1);
    };

    const handleAddToCart = () => {
        addToCart({ nombre, imagen, precio }, cantidad);
        setCantidad(0); // Reiniciar la cantidad después de agregar
    };

    return (
        <Container fluid className="producto">
            <Row className="align-items-center">
                <Col xs={3} md={2} className="d-flex justify-content-center">
                    <img src={`/icons/${imagen}`} alt={nombre} className="producto-imagen" />
                </Col>

                <Col xs={6} md={4} className="producto-info">
                    <h2 className="producto-nombre">{nombre}</h2>
                    <p className="producto-precio">{precio} €</p>
                </Col>

                <Col xs={3} md={2} className="d-flex justify-content-center">
                    <Button variant="warning" onClick={handleShow} className="producto-boton">
                        Más info
                    </Button>
                </Col>

                <Col xs={6} md={2} className="cantidad-container d-flex justify-content-center align-items-center">
                    <Button variant="danger" className="cantidad-boton" onClick={decrementarCantidad}>-</Button>
                    <span className="cantidad-texto">{cantidad}</span>
                    <Button variant="success" className="cantidad-boton" onClick={incrementarCantidad}>+</Button>
                </Col>

                <Col xs={6} md={2} className="d-flex justify-content-center">
                    <Button variant="primary" className="carrito-boton" onClick={handleAddToCart}>
                        Añadir al carro
                    </Button>
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
