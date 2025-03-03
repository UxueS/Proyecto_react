import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Función para guardar un pedido en Firestore y devolver su ID
export const guardarPedido = async (pedido) => {
    try {
        if (!pedido.userId || !pedido.destinatarioNombre || !pedido.destinatarioEmail || !pedido.destinatarioDireccion) {
            throw new Error("Faltan datos obligatorios para guardar el pedido.");
        }

        console.log("Intentando guardar pedido en Firestore:", pedido); // Verificar datos antes de enviar

        const docRef = await addDoc(collection(db, "pedidos"), {
            userId: pedido.userId, // Email del usuario autenticado
            destinatario: {
                nombre: pedido.destinatarioNombre,
                email: pedido.destinatarioEmail,
                direccion: pedido.destinatarioDireccion,
            },
            productos: pedido.productos, // Lista de productos comprados
            total: pedido.total,
            fecha: new Date().toISOString(),
        });

        console.log("Pedido guardado con ID:", docRef.id);
        return docRef.id; // Devuelve el ID del pedido creado
    } catch (error) {
        console.error("Error al guardar el pedido en Firestore:", error);
        return null;
    }
};

// Función corregida para obtener los pedidos del usuario autenticado
export const obtenerPedidosUsuario = async (userEmail) => {
    try {
        if (!userEmail) {
            throw new Error("No hay usuario autenticado.");
        }

        console.log("Buscando pedidos para el usuario:", userEmail); // Verificar qué email se está pasando

        const pedidosRef = collection(db, "pedidos");
        const q = query(pedidosRef, where("userId", "==", userEmail)); // Corregido: buscar por `userId`
        const querySnapshot = await getDocs(q);
        
        let pedidos = [];
        querySnapshot.forEach((doc) => {
            pedidos.push({ id: doc.id, ...doc.data() });
        });

        console.log("Pedidos obtenidos:", pedidos);
        return pedidos;
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        return [];
    }
};
