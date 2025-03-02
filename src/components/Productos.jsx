import { useEffect, useState } from "react";
import axios from "axios";
import Producto from "./Producto";

function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get("https://react-proyecto-dsm-default-rtdb.europe-west1.firebasedatabase.app/productos.json")
            .then((response) => {
                if (response.data) {
                    const productosArray = Object.values(response.data);
                    setProductos(productosArray);
                }
            })
            .catch((error) => {
                console.error("Error al obtener los productos:", error);
            });
    }, []);

    return (
        <div className="productos-container">
            {productos.map((item, index) => (
                <Producto key={index} {...item} />
            ))}
        </div>
    );
}

export default Productos;
