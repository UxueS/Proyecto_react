import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Table } from "react-bootstrap";

function Cesta() {
    const { cart } = useContext(CartContext);

    return (
        <Container className="mt-5">
            <h1>Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nombre}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.precio} €</td>
                                <td>{(item.precio * item.cantidad).toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default Cesta;
