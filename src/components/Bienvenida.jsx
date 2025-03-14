import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Card } from "react-bootstrap";
import saludo from "../components/saludo.json"; 
import { useNavigate } from "react-router-dom";

const Bienvenida = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="welcome-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Card className="p-4">
        <h2 className="welcome-title">
          ¡Bienvenid@ a Papelería Trazos!{" "}
          <motion.span
            animate={{ rotate: [0, 20, -20, 20, -20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ display: "inline-block" }}
          >
            👋
          </motion.span>
        </h2>

        <p className="welcome-text">
          Explora nuestro catálogo y encuentra todo lo que necesitas para dar
          rienda suelta a tu creatividad. Desde material escolar hasta los
          productos más exclusivos.
        </p>

        <motion.div
          className="promo-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          🎉 ¡Este mes <span>3x2</span> en todos nuestros productos! 🎉
        </motion.div>

        {/* Contenedor para botón + animación */}
        <div className="cta-container">
            <Lottie
                animationData={saludo}
                className="saludo-animation"
                loop
                autoplay
            />
          <motion.button
            className="explore-button"
            onClick={() => navigate("/productos")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Ver catálogo
          </motion.button>
          
        </div>
      </Card>
    </motion.div>
  );
};

export default Bienvenida;
