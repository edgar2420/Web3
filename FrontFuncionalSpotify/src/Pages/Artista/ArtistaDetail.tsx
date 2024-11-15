import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getArtistaDetails } from '../../service/Conexion';

interface Album {
    albumId: number;
    titulo: string;
    imagenUrl?: string;
}

interface ArtistaDetails {
    artistaId: number;
    nombre: string;
    generoId?: number;
    nombreGenero?: string;
    url?: string;
    albums: Album[];
}

const ArtistaDetail: React.FC = () => {
    const [artista, setArtista] = useState<ArtistaDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const { artistaId } = useParams<{ artistaId: string }>();

    useEffect(() => {
        const cargarArtistaDetails = async () => {
            try {
                setLoading(true);
                if (artistaId) {
                    const artistaData = await getArtistaDetails(parseInt(artistaId));
                    console.log('Detalles del artista:', artistaData);
                    if (artistaData && !artistaData.albums) {
                        artistaData.albums = []; // Asegurarse que albums existe aunque esté vacío
                    }
                    setArtista(artistaData);
                }
            } catch (error) {
                console.error('Error al cargar los detalles del artista:', error);
                setMensaje('Error al cargar los detalles del artista.');
            } finally {
                setLoading(false);
            }
        };

        cargarArtistaDetails();
    }, [artistaId]);

    if (loading) {
        return (
            <Container fluid className="artista-detail" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
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

    if (!artista) {
        return (
            <Container fluid className="artista-detail" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
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
                        <h3>{mensaje || 'Artista no encontrado'}</h3>
                        <Button variant="outline-warning" onClick={() => navigate('/artists')}>
                            Volver a Artistas
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid className="artista-detail" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
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
                        <ListGroup.Item action href="#artists" style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }} className="mb-2 rounded hover-effect">
                            Artistas
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={10} className="content p-5" style={{ backgroundColor: '#000000' }}>
                    <Row className="mb-4">
                        <Col md={4}>
                            <Card style={{ backgroundColor: '#000000', border: '1px solid #DAA520' }}>
                                <Card.Img
                                    variant="top"
                                    src={artista.url || 'https://via.placeholder.com/300'}
                                    alt={artista.nombre}
                                    className="rounded-circle"
                                />
                            </Card>
                        </Col>
                        <Col md={8} className="d-flex flex-column justify-content-center" style={{ color: '#DAA520' }}>
                            <h2>{artista.nombre}</h2>
                            <h4 style={{ color: '#DAA520' }}>Género: {artista.nombreGenero || 'N/A'}</h4>
                            <Button
                                variant="outline-warning"
                                className="mt-4 rounded-pill fw-semibold"
                                style={{ width: '150px', borderColor: '#DAA520', color: '#DAA520' }}
                            >
                                Seguir
                            </Button>
                        </Col>
                    </Row>

                    {artista.albums && artista.albums.length > 0 ? (
                        <Row className="g-4">
                            {artista.albums.map((album) => (
                                <Col key={album.albumId} md={4} lg={3}>
                                    <Card
                                        style={{ backgroundColor: '#000000', border: '1px solid #DAA520', cursor: 'pointer' }}
                                        onClick={() => navigate(`/album/${album.albumId}`)}
                                        className="h-100 shadow-sm hover-zoom"
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={album.imagenUrl || 'https://via.placeholder.com/300'}
                                            alt={album.titulo}
                                            className="rounded-top"
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="mb-3 fw-bold" style={{ color: '#DAA520' }}>{album.titulo}</Card.Title>
                                            <Button
                                                variant="outline-warning"
                                                className="mt-auto rounded-pill fw-semibold"
                                                style={{ borderColor: '#DAA520', color: '#DAA520' }}
                                            >
                                                Ver Álbum
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p style={{ color: '#DAA520' }}></p>
                    )}
                    <Button
                        variant="outline-warning"
                        className="mt-4"
                        onClick={() => navigate('/artists')}
                        style={{ borderColor: '#DAA520', color: '#DAA520' }}
                    >
                        Volver a Artistas
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ArtistaDetail;
