import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getArtistas } from '../../service/Conexion.ts';

interface Artista {
    artistaId: number;
    nombre: string;
    generoId?: number;
    url?: string;
}

const ArtistaPage: React.FC = () => {
    const [artistas, setArtistas] = useState<Artista[]>([]);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cargarArtistas = async () => {
            try {
                setLoading(true);
                const artistasData = await getArtistas();
                console.log('Artistas obtenidos:', artistasData);
                setArtistas(artistasData);
            } catch (error) {
                console.error('Error al cargar los artistas:', error);
                setMensaje('Error al cargar los artistas.');
            } finally {
                setLoading(false);
            }
        };

        cargarArtistas();
    }, []);

    const renderNavbar = () => (
        <Navbar expand="lg" variant="dark" className="w-100" style={{ backgroundColor: '#000000', boxShadow: '0 4px 8px rgba(218,165,32,0.2)' }}>
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="#home" className="fw-bold" style={{ color: '#DAA520' }} onClick={() => navigate('/')}>MusicApp</Navbar.Brand>
                <Nav>
                    <Nav.Link style={{ color: '#DAA520' }} onClick={() => navigate('/')}>Inicio</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );

    if (loading) {
        return (
            <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#000000' }}>
                {renderNavbar()}
                <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <div className="spinner-border" style={{ color: '#DAA520' }} role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </Container>
            </div>
        );
    }

    if (mensaje) {
        return (
            <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#000000' }}>
                {renderNavbar()}
                <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <div className="p-4 rounded-3 shadow text-center" style={{ backgroundColor: 'rgba(218,165,32,0.1)' }}>
                        <h3 style={{ color: '#DAA520' }} className="mb-3">{mensaje}</h3>
                        <Button variant="outline-warning" onClick={() => navigate('/')} className="fw-bold">Volver a Inicio</Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#000000' }}>
            {renderNavbar()}
            <Container className="flex-grow-1 py-5">
                <h2 className="text-center mb-5" style={{ color: '#DAA520', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Artistas</h2>
                <Row className="g-4 justify-content-center">
                    {artistas.length > 0 ? (
                        artistas.map((artista) => (
                            <Col key={artista.artistaId} md={6} lg={4} xl={3} className="d-flex">
                                <Card 
                                    className="w-100 border-0 artista-card"
                                    onClick={() => navigate(`/artista/${artista.artistaId}`)}
                                    style={{
                                        backgroundColor: 'rgba(218,165,32,0.1)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s'
                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={artista.url || 'https://via.placeholder.com/300'}
                                        alt={artista.nombre}
                                        style={{
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderBottom: '2px solid #DAA520'
                                        }}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="text-center" style={{ color: '#DAA520' }}>{artista.nombre}</Card.Title>
                                        <Button 
                                            variant="outline-warning"
                                            className="mt-auto mx-auto"
                                            style={{ borderColor: '#DAA520', color: '#DAA520' }}
                                        >
                                            Ver Detalles
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12} className="d-flex justify-content-center">
                            <div className="text-center p-4 rounded w-50" style={{ backgroundColor: 'rgba(218,165,32,0.1)' }}>
                                <p style={{ color: '#DAA520' }}>No hay artistas disponibles</p>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default ArtistaPage;
