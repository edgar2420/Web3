import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getGeneros } from '../../service/Conexion';

interface Genero {
    generoId: number;
    nombre: string;
}

const GeneroPage: React.FC = () => {
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cargarGeneros = async () => {
            try {
                setLoading(true);
                const generosData = await getGeneros();
                console.log('Géneros obtenidos:', generosData);
                setGeneros(generosData);
            } catch (error) {
                console.error('Error al cargar los géneros:', error);
                setMensaje('Error al cargar los géneros.');
            } finally {
                setLoading(false);
            }
        };

        cargarGeneros();
    }, []);

    if (loading) {
        return (
            <Container fluid className="genero-page" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
                <Navbar expand="lg" variant="dark" className="px-5" style={{ backgroundColor: '#000000', boxShadow: '0 2px 4px rgba(218,165,32,0.1)' }}>
                    <Navbar.Brand href="#home" className="fw-bold" style={{ color: '#DAA520' }} onClick={() => navigate('/')}>
                        MusicApp
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link style={{ color: '#DAA520' }} onClick={() => navigate('/')}>
                            Inicio
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Row className="g-0 justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
                    <Col md={8} className="text-center" style={{ color: '#DAA520' }}>
                        <h3>Cargando...</h3>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!generos || generos.length === 0) {
        return (
            <Container fluid className="genero-page" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
                <Navbar expand="lg" variant="dark" className="px-5" style={{ backgroundColor: '#000000', boxShadow: '0 2px 4px rgba(218,165,32,0.1)' }}>
                    <Navbar.Brand href="#home" className="fw-bold" style={{ color: '#DAA520' }} onClick={() => navigate('/')}>
                        MusicApp
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link style={{ color: '#DAA520' }} onClick={() => navigate('/')}>
                            Inicio
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Row className="g-0 justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
                    <Col md={8} className="text-center" style={{ color: '#DAA520' }}>
                        <h3>{mensaje || 'No se encontraron géneros'}</h3>
                        <Button variant="outline-warning" style={{ borderColor: '#DAA520', color: '#DAA520' }} onClick={() => navigate('/')}>
                            Volver al Inicio
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid className="genero-page" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
            <Navbar expand="lg" variant="dark" className="px-5" style={{ backgroundColor: '#000000', boxShadow: '0 2px 4px rgba(218,165,32,0.1)' }}>
                <Navbar.Brand href="#home" className="fw-bold" style={{ color: '#DAA520' }} onClick={() => navigate('/')}>
                    MusicApp
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link style={{ color: '#DAA520' }} onClick={() => navigate('/')}>
                        Inicio
                    </Nav.Link>
                </Nav>
            </Navbar>

            <Row className="g-0" style={{ minHeight: 'calc(100vh - 56px)' }}>
                <Col md={2} className="sidebar py-4" style={{ backgroundColor: '#000000', borderRight: '1px solid #DAA520' }}>
                    <ListGroup variant="flush" className="px-2">
                        <ListGroup.Item action href="#home" style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }} className="mb-2 rounded hover-effect" onClick={() => navigate('/')}>
                            Inicio
                        </ListGroup.Item>
                        <ListGroup.Item action href="#genres" style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }} className="mb-2 rounded hover-effect">
                            Géneros
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={10} className="content p-5" style={{ backgroundColor: '#000000' }}>
                    <h2 style={{ color: '#DAA520' }} className="mb-5 fw-bold">Géneros Disponibles</h2>
                    <Row className="g-4">
                        {generos.map((genero) => (
                            <Col key={genero.generoId} md={4} lg={3}>
                                <Card
                                    style={{ backgroundColor: '#000000', border: '1px solid #DAA520', cursor: 'pointer' }}
                                    onClick={() => navigate(`/genero/${genero.generoId}`)}
                                    className="h-100 shadow-sm hover-zoom"
                                >
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title className="mb-3 fw-bold" style={{ color: '#DAA520' }}>{genero.nombre}</Card.Title>
                                        <Button
                                            variant="outline-warning"
                                            className="mt-auto rounded-pill fw-semibold"
                                            style={{ borderColor: '#DAA520', color: '#DAA520' }}
                                        >
                                            Ver Artistas
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default GeneroPage;
