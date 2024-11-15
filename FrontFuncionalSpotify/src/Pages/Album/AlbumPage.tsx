import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAlbums } from '../../service/Conexion.ts';

interface Album {
    albumId: number;
    titulo: string;
    artistaId: number;
    imagenUrl?: string;
}

const AlbumPage: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cargarAlbums = async () => {
            try {
                const albumData = await getAlbums();
                setAlbums(albumData);
            } catch (error) {
                console.error('Error al cargar los álbumes:', error);
                setMensaje('Error al cargar los álbumes');
            }
        };

        cargarAlbums();
    }, []);

    const handleViewAlbum = (albumId: number) => {
        navigate(`/album/${albumId}`);
    };


    return (
        <Container fluid className="album-page" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
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
                        <ListGroup.Item action href="#albums" style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }} className="mb-2 rounded hover-effect">
                            Álbumes
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                {/* Contenido principal */}
                <Col md={10} className="content p-5" style={{ backgroundColor: '#000000' }}>
                    <h2 style={{ color: '#DAA520' }} className="mb-5 fw-bold">Álbumes Disponibles</h2>

                    {mensaje && (
                        <div className="alert alert-warning text-center" style={{ borderColor: '#DAA520', color: '#DAA520', backgroundColor: '#000000' }}>
                            {mensaje}
                        </div>
                    )}

                    <Row className="g-4">
                        {albums.map((album) => (
                            <Col key={album.albumId} md={4} lg={3}>
                                <Card
                                    style={{ backgroundColor: '#000000', border: '1px solid #DAA520', cursor: 'pointer' }}
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
                                            onClick={() => handleViewAlbum(album.albumId)}
                                        >
                                            Ver Álbum
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

export default AlbumPage;
