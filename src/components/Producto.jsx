import { useState } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

function Producto({ nombre, imagen, precio, descripcion }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container fluid className="producto">
            <Row className="align-items-center">
                {/* Imagen del producto */}
                <Col xs={3} md={2} className="d-flex justify-content-center">
                    <img src={`/icons/${imagen}`} alt={nombre} className="producto-imagen" />
                </Col>

                {/* Nombre y precio */}
                <Col xs={6} md={7} className="producto-info">
                    <h2 className="producto-nombre">{nombre}</h2>
                    <p className="producto-precio">{precio} €</p>
                </Col>

                {/* Botón Más Info */}
                <Col xs={3} md={3} className="d-flex justify-content-center">
                    <Button variant="warning" onClick={handleShow} className="producto-boton">
                        Más info
                    </Button>
                </Col>
            </Row>

            {/* Modal de Bootstrap */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de {nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Precio:</strong> {precio} €</p>
                    <p><strong>Descripción:</strong> {descripcion}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Producto;
