import { Container, Row, Col } from "react-bootstrap";

function ValoracionesClientes() {
    return (
        <Container fluid="lg" className="my-5">
            <h1 className="text-center my-4" style={{ color: "#12285f" }}>Lo que dicen nuestros clientes</h1>
            <h2 className="text-center mb-4">Opiniones reales de clientes satisfechos</h2>

            <Row className="g-4">
                <Col md={3} sm={6}>
                    <div className="border border-dark p-4 h-100 rounded shadow-sm bg-white text-center">
                        <img src="/icons/cliente1.jpg" alt="Cliente feliz" className="img-fluid rounded-circle mb-3" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
                        <h4 className="mb-2">Carlos Fernández</h4>
                        <p className="text-muted">"Increíble atención y productos de calidad. ¡Repetiré sin duda!"</p>
                        <p className="text-warning mb-0">⭐⭐⭐⭐⭐</p>
                    </div>
                </Col>
                <Col md={3} sm={6}>
                    <div className="border border-dark p-4 h-100 rounded shadow-sm bg-white text-center">
                        <img src="/icons/cliente2.jpg" alt="Cliente satisfecho" className="img-fluid rounded-circle mb-3" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
                        <h4 className="mb-2">María López</h4>
                        <p className="text-muted">"Los mejores cuadernos y material escolar. Servicio rápido y seguro."</p>
                        <p className="text-warning mb-0">⭐⭐⭐⭐⭐</p>
                    </div>
                </Col>
                <Col md={3} sm={6}>
                    <div className="border border-dark p-4 h-100 rounded shadow-sm bg-white text-center">
                        <img src="/icons/cliente3.jpg" alt="Cliente contento" className="img-fluid rounded-circle mb-3" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
                        <h4 className="mb-2">Pedro Rodríguez</h4>
                        <p className="text-muted">"Excelente relación calidad-precio, todo llegó perfecto y a tiempo."</p>
                        <p className="text-warning mb-0">⭐⭐⭐⭐⭐</p>
                    </div>
                </Col>
                <Col md={3} sm={6}>
                    <div className="border border-dark p-4 h-100 rounded shadow-sm bg-white text-center">
                        <img src="/icons/cliente4.jpg" alt="Cliente contento" className="img-fluid rounded-circle mb-3" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
                        <h4 className="mb-2">Lucía Martínez</h4>
                        <p className="text-muted">"Muy buena experiencia de compra, recomiendo la papelería 100%."</p>
                        <p className="text-warning mb-0">⭐⭐⭐⭐⭐</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ValoracionesClientes;
