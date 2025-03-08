import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";

// Función para guardar un pedido en Firestore y devolver su ID
export const guardarPedido = async (pedido) => {
    try {
        if (!pedido.userId || !pedido.destinatarioNombre || !pedido.destinatarioEmail || !pedido.destinatarioDireccion) {
            throw new Error("Faltan datos obligatorios para guardar el pedido.");
        }

        const docRef = await addDoc(collection(db, "pedidos"), {
            userId: pedido.userId, 
            destinatario: {
                nombre: pedido.destinatarioNombre,
                email: pedido.destinatarioEmail,
                direccion: pedido.destinatarioDireccion,
            },
            productos: pedido.productos, 
            total: pedido.total,
            fecha: new Date().toISOString(),
        });

        return docRef.id; 
    } catch (error) {
        console.error("Error al guardar el pedido en Firestore:", error);
        return null;
    }
};

// Función para borrar un pedido
export const borrarPedido = async (pedidoId) => {
    try {
        
        const pedidoRef = doc(db, "pedidos", pedidoId);
        
        
        await deleteDoc(pedidoRef);

        return true;  
    } catch (error) {
        console.error("Error al borrar el pedido:", error);
        throw new Error("No se pudo borrar el pedido.");
    }
};

// Función para obtener los pedidos del usuario autenticado
export const obtenerPedidosUsuario = async (userEmail) => {
    try {
        if (!userEmail) {
            throw new Error("No hay usuario autenticado.");
        }

        const pedidosRef = collection(db, "pedidos");
        const q = query(pedidosRef, where("userId", "==", userEmail));
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
