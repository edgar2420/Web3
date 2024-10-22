import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerPeliculas } from '../../service/api';  // Importa la función de servicio para obtener películas
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

interface Pelicula {
  id: number;
  nombre: string;
  sinopsis: string;
  fecha_lanzamiento: string;
  calificacion_rotten: number;
  imagen: string;
}

const ListaPelicula: React.FC = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeliculas = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await obtenerPeliculas();  // Llamar a la función para obtener las películas
        setPeliculas(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Hubo un error al obtener la lista de películas.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPeliculas();
  }, []);

  if (loading) {
    return <p>Cargando películas...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (peliculas.length === 0) {
    return <p>No se encontraron películas.</p>;
  }

  return (
    <Container className="mt-5">
      <Row>
        {peliculas.map((pelicula) => (
          <Col key={pelicula.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={pelicula.imagen}
                alt={pelicula.nombre}
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{pelicula.nombre}</Card.Title>
                <Card.Text>
                  <strong>Calificación:</strong> {pelicula.calificacion_rotten} <br />
                  <strong>Fecha de lanzamiento:</strong> {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/peliculas/${pelicula.id}`)}
                  className="mr-2"
                >
                  Ver Detalles
                </Button>
                <Button
                  variant="warning"
                  onClick={() => navigate(`/peliculas/${pelicula.id}/edit`)}
                  className="mr-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => navigate(`/peliculas/${pelicula.id}/delete`)}
                >
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaPelicula;
