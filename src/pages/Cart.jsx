import { useContext } from "react"; 
import { CartContext } from "../context/CartContext";
import { Container, Table, Card } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

function Cart() {
    const { cart } = useContext(CartContext);

    // Calcular el total de la compra asegurándonos de que `precio` es un número
    const totalCompra = cart.reduce((total, item) => total + (parseFloat(item.precio) || 0) * item.cantidad, 0);

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>Carrito de Compras</h1>
            {cart.length === 0 ? (
                <Card className="text-center p-5 mx-auto shadow-lg" style={{ maxWidth: "600px", minHeight: "300px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "80px" }}>
                    {/* Icono negro */}
                    <FaShoppingCart size={100} className="text-dark mb-4" />
                    <Card.Body>
                        <Card.Text className="fs-4 fw-bold">Tu carrito está vacío</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <>
                    <Table striped bordered hover className="shadow-sm" style={{ fontSize: "2rem", borderCollapse: "separate", borderSpacing: "0 15px" }}>
                        <thead>
                            <tr className="bg-primary text-white">
                                <th style={{ minWidth: "300px", padding: "20px" }}>Producto</th>
                                <th style={{ minWidth: "250px", padding: "20px" }}>Cantidad</th>
                                <th style={{ minWidth: "300px", padding: "20px" }}>Precio Unitario</th>
                                <th style={{ minWidth: "300px", padding: "20px" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ padding: "15px" }}>{item.nombre.trim()}</td>
                                    <td style={{ padding: "15px" }}>{item.cantidad || 0}</td>
                                    <td style={{ padding: "15px" }}>{item.precio ? `${parseFloat(item.precio).toFixed(2)} €` : "0.00 €"}</td>
                                    <td style={{ padding: "15px" }}>{item.precio ? `${(parseFloat(item.precio) * item.cantidad).toFixed(2)} €` : "0.00 €"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Mostrar el total de la compra */}
                    <h3 className="text-end mt-3 fw-bold" style={{ fontSize: "2rem" }}>Total: {totalCompra.toFixed(2)} €</h3>
                </>
            )}
        </Container>
    );
}

export default Cart;