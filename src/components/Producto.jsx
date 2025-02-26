function Producto({ nombre, imagen, precio }) {
    return (
        <div className="producto">
            <img src={`/icons/${imagen}`} alt={nombre} className="producto-imagen" />
            <h2 className="producto-nombre">{nombre}</h2>
            <p className="producto-precio">€{precio}</p>
        </div>
    );
}

export default Producto;
