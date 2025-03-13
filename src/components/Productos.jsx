import { useEffect, useState } from "react";
import axios from "axios";
import Producto from "./Producto";
import { Button, Container, Row, Dropdown, DropdownButton, Form } from "react-bootstrap";
import removeAccents from "remove-accents";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [filtros, setFiltros] = useState({ precio: null, categoria: null });
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        axios.get("https://react-proyecto-dsm-default-rtdb.europe-west1.firebasedatabase.app/productos.json")
            .then((response) => {
                if (response.data) {
                    const productosArray = Object.values(response.data).map((producto) => {
                        // Asignamos las categorías de los productos
                        if (
                            producto.nombre === "Lápiz" ||
                            producto.nombre === "Bolígrafo"
                        ) {
                            producto.categoria = "Artículos de escritura";
                        } else if (
                            producto.nombre === "Sacapuntas" ||
                            producto.nombre === "Grapadora" ||
                            producto.nombre === "Calculadora científica" ||
                            producto.nombre === "Lápiz" ||
                            producto.nombre === "Bolígrafo"||
                            producto.nombre === "Goma de borrar" ||
                            producto.nombre === "Regla" ||
                            producto.nombre === "Subrayador"|| 
                            producto.nombre === "Cuaderno"

                        ) {
                            producto.categoria = "Artículos de oficina";
                        } else if (
                            producto.nombre === "Carpeta"
                        ) {
                            producto.categoria = "Material de organización";
                        } else if (
                            producto.nombre === "Goma de borrar" ||
                            producto.nombre === "Pinturas" ||
                            producto.nombre === "Lápiz" ||
                            producto.nombre === "Regla"
                        ) {
                            producto.categoria = "Material de dibujo";
                        } else if (
                            producto.nombre === "Mochila" ||
                            producto.nombre === "Estuche"
                        ) {
                            producto.categoria = "Mochilas y accesorios";
                        } else {
                            producto.categoria = "Otros";
                        }
                        return producto;
                    });
                    setProductos(productosArray);
                }
            })
            .catch((error) => {
                console.error("Error al obtener los productos:", error);
            });
    }, []);

    const aplicarFiltro = (tipo, valor) => {
        setFiltros((prevFiltros) => {
            const nuevoFiltro = { ...prevFiltros };
            
            if (nuevoFiltro[tipo] === valor) {
                nuevoFiltro[tipo] = null;  
            } else {
                nuevoFiltro[tipo] = valor; 
            }
            
            return nuevoFiltro;
        });
    };

    const limpiarFiltros = () => {
        setFiltros({ precio: null, categoria: null });
    };

    const productosFiltrados = productos.filter((producto) => {
        const nombreLower = removeAccents(producto.nombre.toLowerCase());
        const busquedaLower = removeAccents(busqueda.toLowerCase());
        let productoValido = nombreLower.includes(busquedaLower);

        // Filtro por precio
        if (filtros.precio) {
            const precio = parseFloat(producto.precio);
            if (filtros.precio === "1") productoValido = productoValido && precio < 1;
            if (filtros.precio === "5") productoValido = productoValido && precio < 5;
            if (filtros.precio === "15") productoValido = productoValido && precio < 15;
        }

        // Filtro por categoría
        if (filtros.categoria && producto.categoria !== filtros.categoria) {
            productoValido = false;
        }

        return productoValido;
    });

    return (
        <Container>
            <div className="d-flex mb-4 align-items-center">
                <DropdownButton
                    variant="outline-primary"
                    id="dropdown-basic-button"
                    title="Añadir filtros"
                    className="me-2"
                >
                    <Dropdown.ItemText><strong>Filtrar por precio</strong></Dropdown.ItemText>
                    <Dropdown.Item 
                        onClick={() => aplicarFiltro("precio", "1")}
                        active={filtros.precio === "1"}
                    >
                        Menos de 1€
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={() => aplicarFiltro("precio", "5")}
                        active={filtros.precio === "5"}
                    >
                        Menos de 5€
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={() => aplicarFiltro("precio", "15")}
                        active={filtros.precio === "15"}
                    >
                        Menos de 15€
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.ItemText><strong>Filtrar por categoría</strong></Dropdown.ItemText>
                    <Dropdown.Item 
                        onClick={() => aplicarFiltro("categoria", "Artículos de escritura")}
                        active={filtros.categoria === "Artículos de escritura"}
                    >
                        Artículos de escritura
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={() => aplicarFiltro("categoria", "Artículos de oficina")}
                        active={filtros.categoria === "Artículos de oficina"}
                    >
                        Artículos de oficina
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={() => aplicarFiltro("categoria", "Material de organización")}
                        active={filtros.categoria === "Material de organización"}
                    >
                        Material de organización
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={() => aplicarFiltro("categoria", "Material de dibujo")}
                        active={filtros.categoria === "Material de dibujo"}
                    >
                        Material de dibujo
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={() => aplicarFiltro("categoria", "Mochilas y accesorios")}
                        active={filtros.categoria === "Mochilas y accesorios"}
                    >
                        Mochilas y accesorios
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onClick={limpiarFiltros}
                        className="text-primary fw-bold"
                    >
                        Limpiar todos los filtros
                    </Dropdown.Item>
                </DropdownButton>

                <Form.Control
                    type="text"
                    placeholder="Buscar producto"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="ms-2"
                />
            </div>

            <div>
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((item, index) => (
                        <div key={index} className="mb-4">
                            <Producto {...item} />
                        </div>
                    ))
                ) : (
                    <p className="text-center w-100">No hay productos disponibles para el filtro o búsqueda seleccionada.</p>
                )}
            </div>
        </Container>
    );
}

export default Productos;
