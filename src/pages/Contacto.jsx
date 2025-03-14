import React from 'react';
import { Container, Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const Contacto = () => {
    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-lg rounded" style={{ backgroundColor: '#f9f9f9' }}>
                        <Card.Body>
                            <h1 className="text-center mb-2" style={{ color: '#12285f', fontWeight: 'bold', fontSize: '1.4rem' }}>Contacto</h1>
                            <p className="text-center mb-3" style={{ color: '#555', fontSize: '0.9rem' }}>
                                Información de contacto de la Papelería Trazos
                            </p>

                            <ListGroup variant="flush">
                                <ListGroup.Item className="border-0 p-2">
                                    <h5 className="mb-1" style={{ color: '#12285f', fontSize: '1rem' }}>Propietarias:</h5>
                                    <p className="mb-1"><strong>Aida Mateo</strong> - Fundadora y CEO</p>
                                    <p><strong>Uxue San Miguel</strong> - Co-fundadora y Directora de ventas</p>
                                </ListGroup.Item>

                                <ListGroup.Item className="border-0 p-2">
                                    <h5 className="mb-1" style={{ color: '#12285f', fontSize: '1rem' }}>Dirección:</h5>
                                    <p className="mb-0">Calle María Lacunza, 31, Pamplona, 31006</p>
                                </ListGroup.Item>

                                <ListGroup.Item className="border-0 p-2">
                                    <h5 className="mb-1" style={{ color: '#12285f', fontSize: '1rem' }}>Correo electrónico:</h5>
                                    <p className="mb-0">
                                        <a href="mailto:contacto@papeleriatrazo.com" className="text-decoration-none" style={{ color: '#12285f' }}>
                                            contacto@papeleriatrazo.com
                                        </a>
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item className="border-0 p-2">
                                    <h5 className="mb-1" style={{ color: '#12285f', fontSize: '1rem' }}>Teléfono:</h5>
                                    <p className="mb-0">948 123 456</p>
                                </ListGroup.Item>

                                <ListGroup.Item className="border-0 p-2">
                                    <h5 className="text-center mb-3" style={{ color: '#12285f', fontSize: '1rem' }}>Redes sociales:</h5>
                                    <Row className="justify-content-center g-2">
                                        <Col xs={12} sm="auto" className="d-flex justify-content-center">
                                            <Button variant="outline-primary" size="sm" disabled className="d-flex align-items-center">
                                                <FaFacebook size={16} className="me-2" />
                                                <span>@papeleriatrazos</span>
                                            </Button>
                                        </Col>
                                        <Col xs={12} sm="auto" className="d-flex justify-content-center">
                                            <Button variant="outline-info" size="sm" disabled className="d-flex align-items-center">
                                                <FaInstagram size={16} className="me-2" />
                                                <span>@papeleriatrazos</span>
                                            </Button>
                                        </Col>
                                        <Col xs={12} sm="auto" className="d-flex justify-content-center">
                                            <Button variant="outline-success" size="sm" disabled className="d-flex align-items-center">
                                                <FaTwitter size={16} className="me-2" />
                                                <span>@papeleriatrazos</span>
                                            </Button>
                                        </Col>
                                        <Col xs={12} sm="auto" className="d-flex justify-content-center">
                                            <Button variant="outline-dark" size="sm" disabled className="d-flex align-items-center">
                                                <FaTiktok size={16} className="me-2" />
                                                <span>@papeleriatrazos</span>
                                            </Button>
                                        </Col>
                                    </Row>
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
