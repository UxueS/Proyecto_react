import Producto from "./Producto";


function Productos() {
    const productos = [
        { 
            nombre: "Lápiz", 
            imagen: "lapiz.jpg", 
            precio: "0.49", 
            descripcion: "Lápiz de grafito HB con cuerpo de madera, ideal para escritura y dibujo."
        },
        { 
            nombre: "Sacapuntas", 
            imagen: "sacapuntas.jpg", 
            precio: "0.75", 
            descripcion: "Sacapuntas metálico de una hoja, perfecto para afilar lápices sin dañarlos."
        },
        { 
            nombre: "Goma de borrar", 
            imagen: "gomas.jpg", 
            precio: "0.29", 
            descripcion: "Goma de borrar de miga de pan, suave y sin residuos, ideal para lápices y carboncillo."
        },
        { 
            nombre: "Bolígrafo", 
            imagen: "bolis.jpg", 
            precio: "0.45", 
            descripcion: "Bolígrafo BIC de tinta azul con punta media, escritura fluida y duradera."
        },
        { 
            nombre: "Subrayador", 
            imagen: "subrayadores.jpg", 
            precio: "1.15", 
            descripcion: "Subrayador Stabilo Boss de color fluorescente, perfecto para resaltar texto sin manchas."
        },
        { 
            nombre: "Regla", 
            imagen: "regla.jpg", 
            precio: "1.49", 
            descripcion: "Regla de plástico transparente de 30 cm con medidas en centímetros y milímetros."
        },
        { 
            nombre: "Tijeras", 
            imagen: "tijeras.jpg", 
            precio: "1.99", 
            descripcion: "Tijeras escolares de acero inoxidable con punta redondeada y mango ergonómico."
        },
        { 
            nombre: "Estuche", 
            imagen: "estuches.jpg", 
            precio: "9.99", 
            descripcion: "Estuche escolar de tres compartimentos con cremallera, resistente y con gran capacidad."
        },
        { 
            nombre: "Grapadora", 
            imagen: "grapadora.jpg", 
            precio: "17.90", 
            descripcion: "Grapadora de oficina compacta, compatible con grapas estándar 24/6 y 26/6."
        },
        { 
            nombre: "Barra de pegamento", 
            imagen: "pegamento.jpg", 
            precio: "2.25", 
            descripcion: "Pegamento en barra Pritt de 22g, ideal para papel, cartón y fotos sin arrugas."
        },
        { 
            nombre: "Pinturas", 
            imagen: "plastidecor.jpg", 
            precio: "7.95", 
            descripcion: "Set de 24 ceras Plastidecor BIC, colores brillantes y resistentes, ideales para niños."
        },
        { 
            nombre: "Cuaderno", 
            imagen: "cuadernos.jpg", 
            precio: "1.90", 
            descripcion: "Cuaderno de 80 hojas con espiral, papel de 90g, líneas horizontales para una escritura cómoda."
        },
        { 
            nombre: "Carpeta", 
            imagen: "carpetas.jpg", 
            precio: "2.49", 
            descripcion: "Carpeta de cartón plastificado con gomas y solapas, ideal para organizar documentos."
        },
        { 
            nombre: "Calculadora", 
            imagen: "calculadora.jpg", 
            precio: "11.99", 
            descripcion: "Calculadora científica Casio con 240 funciones, pantalla de dos líneas y cubierta resistente."
        },
        { 
            nombre: "Mochila", 
            imagen: "mochila.jpg", 
            precio: "35.90", 
            descripcion: "Mochila escolar con compartimento acolchado para portátil, diseño ergonómico y resistente."
        }
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