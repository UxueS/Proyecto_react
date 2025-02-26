import Producto from "./Producto";


function Productos() {
    const productos = [
        { nombre: "Calculadora", imagen: "calculadora.jpg", precio: "250" },
        { nombre: "Mochila", imagen: "mochila.jpg", precio: "800" }
    ];

    return (
        <div className="productos-container">
            {productos.map((item, index) => (
                <Producto key={index} {...item} />
            ))}
        </div>
    );
}

export default Productos;
