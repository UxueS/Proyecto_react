import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Función para añadir productos al carrito
    const addToCart = (producto, cantidad) => {
        if (cantidad > 0) {
            setCart(prevCart => {
                const existingProduct = prevCart.find(item => item.nombre === producto.nombre);

                if (existingProduct) {
                    return prevCart.map(item =>
                        item.nombre === producto.nombre
                            ? { ...item, cantidad: item.cantidad + cantidad }
                            : item
                    );
                } else {
                    return [...prevCart, { ...producto, cantidad }];
                }
            });
        }
    };

    // Función para eliminar un producto del carrito
    const eliminarItemCarrito = (index) => {
        setCart(prevCart => prevCart.filter((_, i) => i !== index)); // Eliminar por índice
    };

    // Función para vaciar el carrito
    const vaciarCarrito = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, eliminarItemCarrito, vaciarCarrito }}>
            {children}
        </CartContext.Provider>
    );
};
