import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Table, Card, Button, Modal, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

function Cart() {
    const { cart } = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ nombre: "", email: "", direccion: "" });

    const totalCompra = cart.reduce((total, item) => total + (parseFloat(item.precio) || 0) * item.cantidad, 0);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        alert("Pedido realizado con éxito!");
        setShowForm(false);
    };

    return (
        <Container className="mt-5 mb-5">
            <h1 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>Carrito de compra</h1>
            {cart.length === 0 ? (
                <Card className="text-center p-5 mx-auto shadow-lg" style={{ maxWidth: "600px", minHeight: "300px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "80px" }}>
                    <FaShoppingCart size={100} className="text-dark mb-4" />
                    <Card.Body>
                        <Card.Text className="fs-4 fw-bold">Tu carrito está vacío</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <>
                    <Table striped bordered hover className="shadow-sm" style={{ fontSize: "1.5rem", borderCollapse: "separate", borderSpacing: "0 10px" }}>
                        <thead>
                            <tr className="bg-primary text-white" style={{ fontSize: "1.6rem" }}>
                                <th style={{ minWidth: "250px", padding: "15px" }}>Producto</th>
                                <th style={{ minWidth: "200px", padding: "15px" }}>Cantidad</th>
                                <th style={{ minWidth: "250px", padding: "15px" }}>Precio Unitario</th>
                                <th style={{ minWidth: "250px", padding: "15px" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} style={{ fontSize: "1.4rem" }}>
                                    <td style={{ padding: "12px" }}>{item.nombre.trim()}</td>
                                    <td style={{ padding: "12px" }}>{item.cantidad || 0}</td>
                                    <td style={{ padding: "12px" }}>{item.precio ? `${parseFloat(item.precio).toFixed(2)} €` : "0.00 €"}</td>
                                    <td style={{ padding: "12px" }}>{item.precio ? `${(parseFloat(item.precio) * item.cantidad).toFixed(2)} €` : "0.00 €"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3 className="text-end mt-3 fw-bold" style={{ fontSize: "1.8rem" }}>Total: {totalCompra.toFixed(2)} €</h3>

                    <div className="text-center mt-5" style={{ marginBottom: "100px" }}>
                        <Button variant="success" size="lg" className="px-5 py-3 fw-bold shadow-lg rounded" style={{ fontSize: "1.4rem", backgroundColor: "#28a745", border: "none", transition: "0.3s", minWidth: "250px" }} onMouseOver={(e) => e.target.style.backgroundColor = "#218838"} onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"} onClick={() => setShowModal(true)}>
                            ✏️ REALIZAR PEDIDO
                        </Button>
                    </div>
                </>
            )}

            {/* Modal para confirmar los pedidos */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Confirmación de pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="fw-bold">Detalles del pedido:</h5>
                    <ul className="list-unstyled">
                        {cart.map((item, index) => (
                            <li key={index} className="mb-2">
                                {item.nombre.trim()} - {item.cantidad} x {parseFloat(item.precio).toFixed(2)} €
                            </li>
                        ))}
                    </ul>
                    <h4 className="fw-bold text-end mt-3">Total: {totalCompra.toFixed(2)} €</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" className="fw-bold" onClick={() => { setShowModal(false); setShowForm(true); }}> 
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Formulario para la información del cliente */}
            <Modal show={showForm} onHide={() => setShowForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Información de Envío</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dirección de Envío</Form.Label>
                            <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSubmit}>Realizar pedido</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Cart;