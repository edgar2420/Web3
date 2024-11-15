import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, ListGroup, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getAlbumDetails, getArtistas } from '../../service/Conexion.ts';

interface Song {
    songId: number;
    titulo: string;
    duracion: string;
}

interface Artista {
    artistaId: number;
    nombre: string;
    url?: string;
}

interface AlbumDetails {
    albumId: number;
    titulo: string;
    artistaId: number;
    imagenUrl?: string;
    canciones: Song[];
}

const AlbumDetail: React.FC = () => {
    const [album, setAlbum] = useState<AlbumDetails | null>(null);
    const [artistas, setArtistas] = useState<Artista[]>([]);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const { albumId } = useParams<{ albumId: string }>();

    useEffect(() => {
        const cargarAlbumDetails = async () => {
            try {
                setLoading(true);
                if (albumId) {
                    const albumData = await getAlbumDetails(parseInt(albumId));
                    setAlbum(albumData);
                }
            } catch (error) {
                console.error('Error al cargar los detalles del álbum:', error);
                setMensaje('Error al cargar los detalles del álbum.');
            } finally {
                setLoading(false);
            }
        };

        const cargarArtistas = async () => {
            try {
                const artistaData = await getArtistas();
                setArtistas(artistaData);
            } catch (error) {
                console.error('Error al cargar los artistas:', error);
                setMensaje('Error al cargar los artistas.');
            }
        };

        cargarAlbumDetails();
        cargarArtistas();
    }, [albumId]);

    const obtenerNombreArtista = (artistaId: number) => {
        const artista = artistas.find(a => a.artistaId === artistaId);
        return artista ? artista.nombre : 'Desconocido';
    };

    if (loading) {
        return (
            <Container fluid className="album-detail" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
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

    if (!album) {
        return (
            <Container fluid className="album-detail" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
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
                        <h3>{mensaje || 'Álbum no encontrado'}</h3>
                        <Button 
                            variant="outline-warning" 
                            onClick={() => navigate('/albums')}
                            style={{ borderColor: '#DAA520', color: '#DAA520' }}
                        >
                            Volver a Álbumes
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid className="album-detail" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
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

                <Col md={10} className="content p-5" style={{ backgroundColor: '#000000' }}>
                    <Row className="mb-4">
                        <Col md={4}>
                            <Card style={{ backgroundColor: '#000000', border: '1px solid #DAA520' }}>
                                <Card.Img
                                    variant="top"
                                    src={album.imagenUrl || 'https://via.placeholder.com/300'}
                                    alt={album.titulo}
                                />
                            </Card>
                        </Col>
                        <Col md={8} className="d-flex flex-column justify-content-center">
                            <h2 style={{ color: '#DAA520' }}>{album.titulo}</h2>
                            <h4 style={{ color: '#DAA520' }}>Artista: {obtenerNombreArtista(album.artistaId)}</h4>
                            <Button
                                variant="outline-warning"
                                className="mt-4 rounded-pill fw-semibold"
                                style={{ borderColor: '#DAA520', color: '#DAA520', width: '150px' }}
                            >
                                Reproducir Todo
                            </Button>
                        </Col>
                    </Row>
                    <h4 style={{ color: '#DAA520' }} className="mb-3">Canciones</h4>
                    {album.canciones && album.canciones.length > 0 ? (
                        <Table bordered hover style={{ color: '#DAA520', borderColor: '#DAA520' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Título</th>
                                    <th>Duración</th>
                                </tr>
                            </thead>
                            <tbody>
                                {album.canciones.map((cancion, index) => (
                                    <tr key={cancion.songId}>
                                        <td>{index + 1}</td>
                                        <td>{cancion.titulo}</td>
                                        <td>{cancion.duracion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p style={{ color: '#DAA520' }}>No hay canciones disponibles para este álbum.</p>
                    )}
                    <Button
                        variant="outline-warning"
                        className="mt-4"
                        onClick={() => navigate('/albums')}
                        style={{ borderColor: '#DAA520', color: '#DAA520' }}
                    >
                        Volver a Álbumes
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default AlbumDetail;
