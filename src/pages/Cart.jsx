import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Table, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { guardarPedido } from "../services/PedidosService";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

function Cart({ usuario }) {
    const { cart, vaciarCarrito, eliminarItemCarrito } = useContext(CartContext);  
    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [formData, setFormData] = useState({ nombre: "", email: "", direccion: "" });
    const [ofertaAplicada, setOfertaAplicada] = useState(false);
    const [descuento, setDescuento] = useState(0); 
    const navigate = useNavigate();

     const lanzarConfeti = () => {
        const duration = 2000; 
        const end = Date.now() + duration;
        
        const frame = () => {
            confetti({
                particleCount: 7,
                spread: 160,
                origin: { y: 0.6 },
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        
        frame();
    };

    const totalCantidadProductos = cart.reduce((total, item) => total + (item.cantidad || 0), 0);

    const totalSinDescuento = cart.reduce((total, item) => {
        const precioUnitario = parseFloat(item.precio) || 0;
        const cantidad = item.cantidad || 0;
        return total + (precioUnitario * cantidad);
    }, 0);

    const totalConDescuento = cart.reduce((total, item) => {
        const precioUnitario = parseFloat(item.precio) || 0;
        const cantidad = item.cantidad || 0;

        const unidadesDescontadas = Math.floor(cantidad / 3);  
        const cantidadConDescuento = cantidad - unidadesDescontadas;

        if (unidadesDescontadas > 0 && !ofertaAplicada) {
            setOfertaAplicada(true);
            setDescuento(precioUnitario * unidadesDescontadas); 
        }

        return total + (precioUnitario * cantidadConDescuento);
    }, 0);

    const diferenciaDescuento = totalSinDescuento - totalConDescuento;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!usuario || !usuario.email) {
            setShowAlert(true);
            return;
        }

        const pedido = {
            userId: usuario.email, 
            destinatarioNombre: formData.nombre.trim(),
            destinatarioEmail: formData.email.trim(),
            destinatarioDireccion: formData.direccion.trim(),
            productos: cart.map(item => ({
                nombre: item.nombre.trim(),
                cantidad: item.cantidad,
                precio: parseFloat(item.precio)
            })),
            total: totalConDescuento,
            fecha: new Date().toISOString()
        };

        const pedidoId = await guardarPedido(pedido);
        if (pedidoId) {
            alert(`Pedido realizado con éxito. ID: ${pedidoId}`);
            lanzarConfeti();
            vaciarCarrito();
            setShowForm(false);
            setShowThankYou(true);
        } else {
            alert("Hubo un error al realizar tu pedido. Inténtalo de nuevo.");
        }
    };

    const eliminarItem = (index) => {
        eliminarItemCarrito(index);
    };

    const handleNewOrder = () => {
        navigate("/productos");
    };

    const tieneOferta3x2 = cart.some(item => item.cantidad >= 3);

    return (
        <Container className="mt-5 mb-5">
            <h1 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>Carrito de compra</h1>

            {showThankYou ? (
                <Card className="text-center p-5 mx-auto shadow-lg" style={{ maxWidth: "600px", minHeight: "300px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "80px" }}>
                    <Card.Body>
                        <h2 className="mb-4">¡Gracias por tu compra!</h2>
                        <p className="fs-4">Tu pedido ha sido realizado con éxito.</p>
                        <Button variant="primary" size="lg" className="px-5 py-3 fw-bold" onClick={handleNewOrder}>REALIZAR UN NUEVO PEDIDO</Button>
                    </Card.Body>
                </Card>
            ) : cart.length === 0 ? (
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
                                <th style={{ minWidth: "250px", padding: "15px" }}>Precio unitario</th>
                                <th style={{ minWidth: "250px", padding: "15px" }}>Total</th>
                                <th style={{ padding: "15px" }}>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} style={{ fontSize: "1.4rem" }}>
                                    <td style={{ padding: "12px" }}>{item.nombre.trim()}</td>
                                    <td style={{ padding: "12px" }}>{item.cantidad || 0}</td>
                                    <td style={{ padding: "12px" }}>{item.precio ? `${parseFloat(item.precio).toFixed(2)} €` : "0.00 €"}</td>
                                    <td style={{ padding: "12px" }}>
                                        {item.precio ? `${(parseFloat(item.precio) * item.cantidad).toFixed(2)} €` : "0.00 €"}
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        <Button variant="danger" size="sm" onClick={() => eliminarItem(index)} style={{ fontSize: "1rem" }}>
                                            🗑️
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Card className="shadow-sm mt-4" style={{ fontSize: "1.2rem", borderRadius: "8px", padding: "20px", backgroundColor: "#f8f9fa", border: "1px solid #ddd" }}>
                        <div className="d-flex justify-content-between">
                            <h5>Total:</h5>
                            <p className="mb-0">{totalSinDescuento.toFixed(2)} €</p>
                        </div>

                        {tieneOferta3x2 && diferenciaDescuento > 0 && (
                            <div className="d-flex justify-content-between text-danger">
                                <h5>Descuento 3x2:</h5>
                                <p className="mb-0">-{diferenciaDescuento.toFixed(2)} €</p>
                            </div>
                        )}

                        {tieneOferta3x2 ? (
                            <div className="d-flex justify-content-between mt-3">
                                <h5 className="fw-bold">Total con descuento:</h5>
                                <p className="mb-0 fw-bold">{totalConDescuento.toFixed(2)} €</p>
                            </div>
                        ) : null}
                    </Card>

                    <div className="text-center mt-5" style={{ marginBottom: "100px" }}>
                        <Button variant="success" size="lg" className="px-5 py-3 fw-bold shadow-lg rounded"
                            style={{ fontSize: "1.4rem", backgroundColor: "#28a745", border: "none", transition: "0.3s", minWidth: "250px" }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                            onClick={() => setShowModal(true)}>
                            ✏️ REALIZAR PEDIDO
                        </Button>
                    </div>
                </>
            )}
  
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
                    <h5 className="fw-bold text-end mt-3">Total sin descuento: {totalSinDescuento.toFixed(2)} €</h5>
                    {diferenciaDescuento > 0 && (
                        <h5 className="fw-bold text-end mt-2 text-danger">
                            Descuento: -{diferenciaDescuento.toFixed(2)} €
                        </h5>
                    )}
                    <h5 className="fw-bold text-end mt-2">Total con descuento: {totalConDescuento.toFixed(2)} €</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={() => { setShowModal(false); setShowForm(true); }}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showForm} onHide={() => setShowForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Información de envío</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="nombre">Nombre y apellidos</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleInputChange} 
                                required 
                                autoComplete="name"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                required 
                                autoComplete="email"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="direccion">Dirección de envío</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="direccion" 
                                name="direccion" 
                                value={formData.direccion} 
                                onChange={handleInputChange} 
                                required 
                                autoComplete="street-address"
                            />
                        </Form.Group>
                    </Form>

                    {showAlert && (
                        <Alert variant="danger" className="mt-3">
                            Debes iniciar sesión para realizar un pedido.
                        </Alert>
                    )}
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
