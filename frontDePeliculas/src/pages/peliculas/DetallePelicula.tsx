import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerPeliculaPorId, obtenerPersonaPorId } from '../../service/api';  // Importa la función de servicio para obtener la película
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';

interface Persona {
  id: number;
  nombre: string;
  foto: string;
  peliculas_dirigidas?: string[];
  peliculas_actuadas?: string[];
}

interface RepartoDetalle {
  id: number;
  rol: string;
  persona: Persona;
}

interface Pelicula {
  id: number;
  nombre: string;
  sinopsis: string;
  fecha_lanzamiento: string;
  calificacion_rotten: number;
  trailer_youtube: string;
  imagen: string;
  director: number;
  reparto_detalles: RepartoDetalle[];
}

const DetallePelicula: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Obtener el ID de la URL
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [director, setDirector] = useState<Persona | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        setLoading(true);
        const data = await obtenerPeliculaPorId(id!);  // Obtener la película por ID
        setPelicula(data);

        if (data.director) {
          const directorData = await obtenerPersonaPorId(data.director);  // Obtén los detalles del director
          setDirector(directorData);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Hubo un error al obtener los detalles de la película.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPelicula();
  }, [id]);

  const abrirModal = (persona: Persona) => {
    setPersonaSeleccionada(persona);
    setShowModal(true);
  };

  const cerrarModal = () => setShowModal(false);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!pelicula) {
    return <p>No se encontró la película.</p>;
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={6}>
          <img
            src={pelicula.imagen}
            alt={pelicula.nombre}
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>
        <Col md={6}>
          <h2>{pelicula.nombre}</h2>
          <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
          <p><strong>Fecha de lanzamiento:</strong> {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}</p>
          <p><strong>Calificación Rotten Tomatoes:</strong> {pelicula.calificacion_rotten}</p>

          <p>
            <strong>Director:</strong>{' '}
            {director ? (
              <>
                <img
                  src={director.foto}
                  alt={director.nombre}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                />
                <span>{director.nombre}</span>
              </>
            ) : (
              'No disponible'
            )}
          </p>

          <p>
            <strong>Actores:</strong>{' '}
            {pelicula.reparto_detalles && Array.isArray(pelicula.reparto_detalles) && pelicula.reparto_detalles.length > 0 ? (
              pelicula.reparto_detalles.map((actor) => (
                <span key={actor.id} onClick={() => abrirModal(actor.persona)} style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}>
                  <img
                    src={actor.persona.foto}
                    alt={actor.persona.nombre}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                  />
                  {actor.persona.nombre}
                </span>
              ))
            ) : (
              'No disponible'
            )}
          </p>

          <Button variant="primary" onClick={() => navigate('/')} className="mt-4">
            Volver a la lista
          </Button>
        </Col>
      </Row>

      {pelicula.trailer_youtube && (
        <Row className="mt-5">
          <Col>
            <h4>Trailer</h4>
            <iframe
              width="100%"
              height="400px"
              src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(pelicula.trailer_youtube).search).get('v')}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Col>
        </Row>
      )}

      {/* Modal para mostrar más detalles sobre la persona seleccionada (director o actor) */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{personaSeleccionada?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {personaSeleccionada?.foto && (
            <img
              src={personaSeleccionada.foto}
              alt={personaSeleccionada.nombre}
              style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
            />
          )}
          <h5>Películas dirigidas o actuadas:</h5>
          <ul>
            {personaSeleccionada?.peliculas_dirigidas && personaSeleccionada.peliculas_dirigidas.length > 0 ? (
              <>
                <h6>Películas dirigidas:</h6>
                {personaSeleccionada.peliculas_dirigidas.map((pelicula) => (
                  <li key={pelicula}>{pelicula}</li>
                ))}
              </>
            ) : (
              <p>No hay películas dirigidas disponibles.</p>
            )}

            {personaSeleccionada?.peliculas_actuadas && personaSeleccionada.peliculas_actuadas.length > 0 ? (
              <>
                <h6>Películas actuadas:</h6>
                {personaSeleccionada.peliculas_actuadas.map((pelicula) => (
                  <li key={pelicula}>{pelicula}</li>
                ))}
              </>
            ) : (
              <p>No hay películas actuadas disponibles.</p>
            )}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DetallePelicula;

