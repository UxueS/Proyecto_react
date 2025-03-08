import { useEffect, useState } from "react"; 
import { obtenerPedidosUsuario, borrarPedido } from "../services/PedidosService";
import { Container, Table, Alert, Modal, Button, Card } from "react-bootstrap";

function Pedidos({ usuario }) {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const cargarPedidos = async () => {
            console.log("usuario actual:", usuario);
            if (!usuario || !usuario.email) {
                setPedidos([]); // Vaciar pedidos si no hay usuario
                setLoading(false);
                return;
            }
            setLoading(true);
            const pedidosUsuario = await obtenerPedidosUsuario(usuario.email);
            setPedidos(pedidosUsuario);
            setLoading(false);
        };

        cargarPedidos();
    }, [usuario]);

    // Función para abrir el modal con los detalles del pedido seleccionado
    const verDetallesPedido = (pedido) => {
        setPedidoSeleccionado(pedido);
        setShowModal(true);
    };

    // Función para eliminar un pedido
    const handleEliminarPedido = async (pedidoId, event) => {
        event.stopPropagation();  // Detener la propagación del clic
        try {
            const confirmacion = window.confirm("¿Estás seguro de que deseas borrar este pedido?");
            if (confirmacion) {
                await borrarPedido(pedidoId);  // Llamar al servicio para borrar el pedido
                setPedidos(pedidos.filter(pedido => pedido.id !== pedidoId));  // Actualizar el estado
                alert("Pedido eliminado con éxito.");
            }
        } catch (error) {
            alert("Hubo un error al borrar el pedido. Inténtalo de nuevo.");
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <h1 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>Mis pedidos</h1>

            {loading ? (
                <p className="text-center">Cargando pedidos...</p>
             ) : pedidos.length === 0 ? (
                <Alert variant="info" className="text-center">No tienes pedidos registrados.</Alert>
            ) : (
                <Table striped bordered hover className="shadow-sm text-center" style={{ fontSize: "1.5rem", cursor: "pointer" }}>
                    <thead>
                        <tr className="bg-primary text-white">
                            <th>Fecha del pedido</th>
                            <th>Total</th>
                            <th>Ver más</th>
                            <th>Acciones</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id} onClick={() => verDetallesPedido(pedido)}>
                                <td>{new Date(pedido.fecha).toLocaleString()}</td>
                                <td>{pedido.total.toFixed(2)} €</td>
                                <td><Button variant="info" size="sm">🔍 Ver más</Button></td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={(e) => handleEliminarPedido(pedido.id, e)}>
                                        🗑️ Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pedidoSeleccionado && (
                        <>
                            <Card className="mb-3">
                                <Card.Body>
                                    <h5><strong>Fecha:</strong> {new Date(pedidoSeleccionado.fecha).toLocaleString()}</h5>
                                    <h5 className="mb-3"><strong>Solicitante:</strong> {pedidoSeleccionado.userId}</h5>
                                    <h6><strong>Destinatario:</strong> {pedidoSeleccionado.destinatario.nombre}</h6>
                                    <p><strong>Email:</strong> {pedidoSeleccionado.destinatario.email}</p>
                                    <p><strong>Dirección:</strong> {pedidoSeleccionado.destinatario.direccion}</p>
                                </Card.Body>
                            </Card>

                            <h5 className="mt-3"><strong>Productos comprados:</strong></h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidoSeleccionado.productos.map((producto, idx) => (
                                        <tr key={idx}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>{producto.precio.toFixed(2)} €</td>
                                            <td>{(producto.precio * producto.cantidad).toFixed(2)} €</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <h4 className="text-end mt-3"><strong>Total pedido:</strong> {pedidoSeleccionado.total.toFixed(2)} €</h4>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Pedidos;
