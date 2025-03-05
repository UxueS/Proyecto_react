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
    const [showAlert, setShowAlert] = useState(false); // Para mostrar la alerta si intenta comprar sin iniciar sesión
    const [showThankYou, setShowThankYou] = useState(false); // Para mostrar la pantalla de agradecimiento
    const [formData, setFormData] = useState({ nombre: "", email: "", direccion: "" });
    const navigate = useNavigate();

    const totalCompra = cart.reduce((total, item) => total + (parseFloat(item.precio) || 0) * item.cantidad, 0);

    // Función para lanzar confeti durante 2 segundos
    const lanzarConfeti = () => {
        const duration = 2000; // ⏳ Duración del efecto (2s)
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


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!usuario || !usuario.email) {
            setShowAlert(true);
            return;
        }

        console.log("Usuario autenticado:", usuario);

        const pedido = {
            userId: usuario.email, 
            destinatarioNombre: formData.nombre.trim(),
            destinatarioEmail: formData.email.trim(),
            destinatarioDireccion: formData.direccion.trim(),
            productos: cart.map(item => ({
                nombre: item.nombre.trim(),
                cantidad: item.cantidad,
                precio: parseFloat(item.precio)
            })), // Convertimos `cart` en un array de objetos correctamente formateados
            total: totalCompra,
            fecha: new Date().toISOString()
        };

        console.log("Pedido a enviar:", pedido); 
        
        const pedidoId = await guardarPedido(pedido);
        if (pedidoId) {
            alert(`Pedido realizado con éxito. ID: ${pedidoId}`);
            lanzarConfeti();
            vaciarCarrito();
            setShowForm(false);
            setShowThankYou(true); // Cambiar a la pantalla de agradecimiento
        } else {
            alert("Hubo un error al realizar tu pedido. Inténtalo de nuevo.");
        }
    };

    const eliminarItem = (index) => {
        eliminarItemCarrito(index);  // Llamar a la función que elimina el item desde el contexto
    };

    const handleNewOrder = () => {
        navigate("/productos"); // Redirigir al inicio
    };

    return (
        <Container className="mt-5 mb-5">
            <h1 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>Carrito de compra</h1>

            {showThankYou ? (
                // Pantalla de agradecimiento
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
                                <th style={{ minWidth: "250px", padding: "15px" }}>Precio Unitario</th>
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
                                    <td style={{ padding: "12px" }}>{item.precio ? `${(parseFloat(item.precio) * item.cantidad).toFixed(2)} €` : "0.00 €"}</td>
                                    <td style={{ padding: "12px" }}>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => eliminarItem(index)} 
                                            style={{ fontSize: "1rem" }}
                                        >
                                            🗑️
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3 className="text-end mt-3 fw-bold" style={{ fontSize: "1.8rem" }}>Total: {totalCompra.toFixed(2)} €</h3>

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
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={() => { setShowModal(false); setShowForm(true); }}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Formulario para la información del cliente */}
            <Modal show={showForm} onHide={() => setShowForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Información de envío</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor="nombre">Nombre</Form.Label>
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
                        <Form.Label htmlFor="direccion">Dirección de Envío</Form.Label>
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
