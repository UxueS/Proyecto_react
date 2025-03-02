import axios from "axios"
import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"

function Login(props){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()
        const authInfo = { // json con etiqueta-variable de estado de login
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCi7AVbkOaeHy0SmcXtOJ0Yni4ESn7qz5c', authInfo)
        .then((response) => {
            alert('Login correcto')
            console.log(response)
            props.actualizarLogin(true, response.data) // Actualizar info de login
        })
        .catch((error)=>{
            alert('Login incorrecto')
            console.log(error)
        })
    }

    const logoutHandler = ()=>{
        props.actualizarLogin(false, {}) 
        localStorage.clear() // Vaciar variable
    }

    return(
        <>
            <Form onSubmit={submitHandler}>
                <Container>
                    <Row>
                        <Col>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control onChange={(event)=>setEmail(event.target.value)} value={email} type='email'></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control onChange={(event)=>setPassword(event.target.value)} value={password} type='password'></Form.Control>
                        </Col>
                        <Col>
                            <Button type='submit' variant='primary'>LOGIN</Button>
                        </Col>
                        <Col>
                            <Button onClick={logoutHandler} variant='warning'>LOGOUT</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
        
    )
}

export default Login