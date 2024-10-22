import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerPeliculaPorId, actualizarPelicula } from '../../service/api'; // Importa las funciones de servicio
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface Pelicula {
  id: number;
  nombre: string;
  sinopsis: string;
  fecha_lanzamiento: string;
  calificacion_rotten: number;
  trailer_youtube: string;
  imagen: string;
}

const EditarPelicula: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Obtener el ID de la URL
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [nombre, setNombre] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [fechaLanzamiento, setFechaLanzamiento] = useState('');
  const [calificacionRotten, setCalificacionRotten] = useState<number | null>(null);
  const [trailerYoutube, setTrailerYoutube] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        const data = await obtenerPeliculaPorId(id!);  // Obtener la película por su ID
        setPelicula(data);
        setNombre(data.nombre);
        setSinopsis(data.sinopsis);
        setFechaLanzamiento(data.fecha_lanzamiento);
        setCalificacionRotten(data.calificacion_rotten);
        setTrailerYoutube(data.trailer_youtube);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Hubo un error al cargar los detalles de la película.');
        }
      }
    };

    fetchPelicula();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('sinopsis', sinopsis);
    formData.append('fecha_lanzamiento', fechaLanzamiento);
    formData.append('calificacion_rotten', calificacionRotten?.toString() || '');
    formData.append('trailer_youtube', trailerYoutube);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      await actualizarPelicula(id!, formData);  // Llamar a la función de servicio para actualizar la película
      navigate(`/peliculas/${id}`);  // Redirigir al detalle de la película después de actualizarla
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Hubo un error al actualizar la película.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!pelicula) {
    return <p>Cargando datos de la película...</p>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Editar Película</h2>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre de la película</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSinopsis" className="mt-3">
              <Form.Label>Sinopsis</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Sinopsis de la película"
                value={sinopsis}
                onChange={(e) => setSinopsis(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFechaLanzamiento" className="mt-3">
              <Form.Label>Fecha de Lanzamiento</Form.Label>
              <Form.Control
                type="date"
                value={fechaLanzamiento}
                onChange={(e) => setFechaLanzamiento(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCalificacion" className="mt-3">
              <Form.Label>Calificación Rotten Tomatoes</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Calificación (ej: 7.5)"
                value={calificacionRotten || ''}
                onChange={(e) => setCalificacionRotten(parseFloat(e.target.value))}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTrailer" className="mt-3">
              <Form.Label>Enlace del Trailer en YouTube</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://www.youtube.com/watch?v=trailer_id"
                value={trailerYoutube}
                onChange={(e) => setTrailerYoutube(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImagen" className="mt-3">
              <Form.Label>Imagen de la Película</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImagen(e.target.files[0]);  // Establecer el archivo en el estado
                  }
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarPelicula;
