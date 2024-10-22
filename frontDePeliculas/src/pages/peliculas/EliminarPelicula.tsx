import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerPeliculaPorId, eliminarPelicula } from '../../service/api'; // Importa las funciones de servicio
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

interface Pelicula {
  id: number;
  nombre: string;
  sinopsis: string;
  fecha_lanzamiento: string;
  calificacion_rotten: number;
  trailer_youtube: string;
  imagen: string;
  director: string;
  reparto: string[];
}

const EliminarPelicula: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false); // Estado para mostrar la confirmación de eliminación
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        setLoading(true);
        const data = await obtenerPeliculaPorId(id!); // Obtener la película por su ID
        setPelicula(data);
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

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await eliminarPelicula(id!); // Eliminar la película mediante la función de servicio
      navigate('/'); // Redirigir a la lista de películas después de eliminar
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Hubo un error al eliminar la película.');
      }
    } finally {
      setLoading(false);
    }
  };

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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Eliminar Película</h2>
          <p>¿Estás seguro que deseas eliminar la película <strong>{pelicula.nombre}</strong>?</p>
          <img
            src={pelicula.imagen}
            alt={pelicula.nombre}
            style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
          />
          <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>

          {confirmDelete ? (
            <Alert variant="danger">
              <p>¿Estás seguro de que quieres eliminar esta película? Esta acción no se puede deshacer.</p>
              <Button variant="danger" onClick={handleDelete} disabled={loading}>
                {loading ? 'Eliminando...' : 'Confirmar Eliminación'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setConfirmDelete(false)}
                className="ml-2"
                disabled={loading}
              >
                Cancelar
              </Button>
            </Alert>
          ) : (
            <Button variant="danger" onClick={() => setConfirmDelete(true)} disabled={loading}>
              Eliminar Película
            </Button>
          )}

          <Button variant="secondary" onClick={() => navigate(`/peliculas/${id}`)} className="mt-3">
            Volver al detalle de la película
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EliminarPelicula;
