import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import "./login.css";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const submitHandler = (event) => {
        event.preventDefault();
        const authInfo = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        axios
            .post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCi7AVbkOaeHy0SmcXtOJ0Yni4ESn7qz5c",
                authInfo
            )
            .then((response) => {
                alert("Login correcto");
                console.log(response);
                props.actualizarLogin(true, response.data);

                // Redirigir a la página de inicio tras login exitoso
                navigate("/");
            })
            .catch((error) => {
                alert("Login incorrecto");
                console.log(error);
            });
    };

    return (
        <Container className="login-container">
            <Form onSubmit={submitHandler} className="login-form">
                <h2 className="login-title">Iniciar sesión</h2>
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
                    LOGIN
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
