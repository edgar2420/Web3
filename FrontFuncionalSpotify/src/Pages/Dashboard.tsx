import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAlbums, getArtistas } from '../../src/service/Conexion.ts';

interface Album {
    albumId: number;
    titulo: string;
    artistaId: number;
}

interface Artista {
    artistaId: number;
    nombre: string;
}

const Dashboard: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [artistas, setArtistas] = useState<Artista[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarAlbums = async () => {
            try {
                const albumData = await getAlbums();
                setAlbums(albumData);
            } catch (error) {
                console.error('Error al cargar los álbumes:', error);
            }
        };

        const cargarArtistas = async () => {
            try {
                const artistaData = await getArtistas();
                setArtistas(artistaData);
            } catch (error) {
                console.error('Error al cargar los artistas:', error);
            }
        };

        cargarAlbums();
        cargarArtistas();
    }, []);

    return (
        <Container fluid className="dashboard" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
            <Navbar expand="lg" variant="dark" className="px-5" style={{ backgroundColor: '#000000', boxShadow: '0 2px 4px rgba(218,165,32,0.1)' }}>
                <Navbar.Brand href="#home" className="fw-bold" style={{ color: '#DAA520' }}>MusicApp</Navbar.Brand>
                <Nav className="ms-auto">

                </Nav>
            </Navbar>

            <Row className="g-0" style={{ minHeight: 'calc(100vh - 56px)' }}>

                <Col md={2} className="sidebar py-4" style={{ backgroundColor: '#000000', borderRight: '1px solid #DAA520' }}>
                    <ListGroup variant="flush" className="px-2">
                        <ListGroup.Item action href="#home" style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }} className="mb-2 rounded hover-effect">
                            Inicio
                        </ListGroup.Item>
                        <ListGroup.Item action href="#search" style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }} className="mb-2 rounded hover-effect">
                            Explorar
                        </ListGroup.Item>
                        <ListGroup.Item action href="#library" style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }} className="mb-2 rounded hover-effect">
                            Tu Biblioteca
                        </ListGroup.Item>
                        <hr className="my-4" style={{ borderColor: '#DAA520' }} />
                        <ListGroup.Item
                            action
                            onClick={() => navigate('/albums')}
                            style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }}
                            className="mb-2 rounded hover-effect"
                        >
                            Álbumes
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            onClick={() => navigate('/artists')}
                            style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }}
                            className="mb-2 rounded hover-effect"
                        >
                            Artistas
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            onClick={() => navigate('/genres')}
                            style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }}
                            className="mb-2 rounded hover-effect"
                        >
                            Géneros
                        </ListGroup.Item>
                        <ListGroup.Item action href="#playlists" style={{ backgroundColor: '#000000', color: '#DAA520', border: '1px solid #DAA520' }} className="mb-2 rounded hover-effect">
                            Playlists
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={10} className="content p-5" style={{ backgroundColor: '#000000' }}>
                    <h2 style={{ color: '#DAA520' }} className="mb-5 fw-bold">Explora tu música</h2>

                    <section className="mb-5">
                        <h4 style={{ color: '#DAA520' }} className="mb-4 fw-semibold">Álbumes recientes</h4>
                        <Row className="g-4">
                            {albums.map((album) => (
                                <Col key={album.albumId} md={4} lg={3}>
                                    <Card style={{ backgroundColor: '#000000', border: '1px solid #DAA520' }} className="h-100 shadow-sm hover-zoom">
                                        <Card.Img
                                            variant="top"
                                            alt={album.titulo}
                                            className="rounded-top"
                                            src="https://via.placeholder.com/300"
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title style={{ color: '#DAA520' }} className="mb-3 fw-bold">{album.titulo}</Card.Title>
                                            <Button
                                                variant="outline-warning"
                                                className="mt-auto rounded-pill fw-semibold"
                                                style={{ borderColor: '#DAA520', color: '#DAA520' }}
                                            >
                                                Reproducir
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </section>

                    <section>
                        <h4 style={{ color: '#DAA520' }} className="mb-4 fw-semibold">Artistas populares</h4>
                        <Row className="g-4">
                            {artistas.map((artista) => (
                                <Col key={artista.artistaId} md={4} lg={3}>
                                    <Card style={{ backgroundColor: '#000000', border: '1px solid #DAA520' }} className="h-100 shadow-sm hover-zoom">
                                        <Card.Img
                                            variant="top"
                                            src="https://via.placeholder.com/300"
                                            alt={artista.nombre}
                                            className="rounded-circle mx-auto mt-3"
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                        <Card.Body className="d-flex flex-column text-center">
                                            <Card.Title style={{ color: '#DAA520' }} className="mb-3 fw-bold">{artista.nombre}</Card.Title>
                                            <Button
                                                variant="outline-warning"
                                                className="mt-auto rounded-pill fw-semibold"
                                                style={{ borderColor: '#DAA520', color: '#DAA520' }}
                                            >
                                                Ver Perfil
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
