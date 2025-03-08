import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./login.css";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); 
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";

    const submitHandler = (event) => {
        event.preventDefault();
        const authInfo = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        const url = isRegistering
            ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCi7AVbkOaeHy0SmcXtOJ0Yni4ESn7qz5c"
            : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCi7AVbkOaeHy0SmcXtOJ0Yni4ESn7qz5c";

        axios
            .post(url, authInfo)
            .then((response) => {
                if (isRegistering) {
                    alert("Registro exitoso. Ahora puedes iniciar sesión.");
                    setIsRegistering(false); 
                } else {
                    alert("Login correcto");
                    console.log(response);
                    props.actualizarLogin(true); 
                    props.actualizarLoginData(response.data); 
                    navigate(redirectPath); 
                }
            })
            .catch((error) => {
                alert("Error: " + error.response?.data?.error?.message || "Error desconocido");
                console.log(error);
            });
    };

    return (
        <Container className="login-container">
            <Form onSubmit={submitHandler} className="login-form">
                <h2 className="login-title">{isRegistering ? "Registro" : "Iniciar sesión"}</h2>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Introduce tu email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="login-button">
                    {isRegistering ? "Registrarse" : "Iniciar sesión"}
                </Button>

                <p className="switch-auth">
                    {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}{" "}
                    <span onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? "Iniciar sesión" : "Regístrate"}
                    </span>
                </p>
            </Form>
        </Container>
    );
}

export default Login;