import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Table } from "react-bootstrap";

function Cart() {
    const { cart } = useContext(CartContext);

    // Calcular el total de la compra asegurándonos de que `precio` es un número
    const totalCompra = cart.reduce((total, item) => total + (parseFloat(item.precio) || 0) * item.cantidad, 0);

    return (
        <Container className="mt-5">
            <h1>Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nombre.trim()}</td>
                                    <td>{item.cantidad || 0}</td>
                                    <td>{item.precio ? `${parseFloat(item.precio).toFixed(2)} €` : "0.00 €"}</td>
                                    <td>{item.precio ? `${(parseFloat(item.precio) * item.cantidad).toFixed(2)} €` : "0.00 €"}</td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>

                    {/* Mostrar el total de la compra */}
                    <h3 className="text-end mt-3">Total: {totalCompra.toFixed(2)} €</h3>
                </>
            )}
        </Container>
    );
}

export default Cart;
