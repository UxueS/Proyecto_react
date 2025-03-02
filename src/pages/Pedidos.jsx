import { useEffect, useState } from "react";
import { obtenerPedidosUsuario } from "../services/PedidosService";
import { Container, Table, Alert } from "react-bootstrap";

function Pedidos({ usuario }) {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarPedidos = async () => {
            if (!usuario || !usuario.email) {
                setLoading(false);
                return;
            }
            const pedidosUsuario = await obtenerPedidosUsuario(usuario.email);
            setPedidos(pedidosUsuario);
            setLoading(false);
        };

        cargarPedidos();
    }, [usuario]);

    return (
        <Container className="mt-5 mb-5">
            <h1 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>Mis Pedidos</h1>

            {loading ? (
                <p className="text-center">Cargando pedidos...</p>
            ) : !usuario ? (
                <Alert variant="danger" className="text-center">Debes iniciar sesión para ver tus pedidos.</Alert>
            ) : pedidos.length === 0 ? (
                <Alert variant="info" className="text-center">No tienes pedidos registrados.</Alert>
            ) : (
                <Table striped bordered hover className="shadow-sm" style={{ fontSize: "1.5rem" }}>
                    <thead>
                        <tr className="bg-primary text-white">
                            <th>Fecha</th>
                            <th>Destinatario</th>
                            <th>Dirección</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{new Date(pedido.fecha).toLocaleString()}</td>
                                <td>{pedido.destinatario.nombre}</td>
                                <td>{pedido.destinatario.direccion}</td>
                                <td>{pedido.total.toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default Pedidos;
