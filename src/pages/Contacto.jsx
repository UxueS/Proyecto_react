import React from 'react';
import { Container, Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Contacto = () => {
    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-lg p-2 rounded" style={{ backgroundColor: '#f9f9f9' }}>
                        <Card.Body>
                            <h1 className="text-center mb-2" style={{ color: '#12285f', fontWeight: 'bold', fontSize: '1.4rem' }}>Contacto</h1>
                            <p className="text-center mb-3" style={{ color: '#555', fontSize: '0.9rem' }}>
                                Información de contacto de la Papelería Trazos.
                            </p>

                            <ListGroup variant="flush">
                                {/* Propietarios */}
                                <ListGroup.Item className="border-0 p-1">
                                    <h5 className="mb-1" style={{ color: '#12285f', fontSize: '1rem' }}>Propietarios:</h5>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}><strong>Aida Mateo</strong> - Fundadora y CEO</p>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}><strong>Uxue San Miguel</strong> - Co-fundadora y Directora de Ventas</p>
                                </ListGroup.Item>

                                {/* Dirección */}
                                <ListGroup.Item className="border-0 p-1">
                                    <h5 className="mb-1" style={{ color: '#12285f', fontSize: '1rem' }}>Dirección:</h5>
                                    <p style={{ fontSize: '0.9rem' }}>Calle María Lacunza, 31, Pamplona, 31006</p>
                                </ListGroup.Item>

                                {/* Correo electrónico */}
                                <ListGroup.Item className="border-0 p-1">
                                    <h5 className="mb-1" style={{ color: '#12285f', fontSize: '1rem' }}>Correo Electrónico:</h5>
                                    <p style={{ fontSize: '0.9rem' }}><a href="mailto:contacto@papeleriatrazo.com" style={{ color: '#12285f', textDecoration: 'none', fontWeight: '500' }}>contacto@papeleriatrazo.com</a></p>
                                </ListGroup.Item>

                                {/* Teléfono (solo texto) */}
                                <ListGroup.Item className="border-0 p-1">
                                    <h5 className="mb-1" style={{ color: '#12285f', fontSize: '1rem' }}>Teléfono:</h5>
                                    <p style={{ fontSize: '0.9rem' }}>948 123 456</p>
                                </ListGroup.Item>

                                {/* Redes sociales */}
                                <ListGroup.Item className="border-0 text-center p-1">
                                    <h5 className="mb-2" style={{ color: '#12285f', fontSize: '1rem' }}>Redes Sociales:</h5>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Button variant="outline-primary" className="d-flex align-items-center" style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }} disabled>
                                            <FaFacebook size={16} className="me-2" />
                                            <span>@PapeleriaTrazos</span>
                                        </Button>
                                        <Button variant="outline-info" className="d-flex align-items-center" style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }} disabled>
                                            <FaInstagram size={16} className="me-2" />
                                            <span>@PapeleriaTrazos</span>
                                        </Button>
                                        <Button variant="outline-success" className="d-flex align-items-center" style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }} disabled>
                                            <FaTwitter size={16} className="me-2" />
                                            <span>@PapeleriaTrazos</span>
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contacto;
