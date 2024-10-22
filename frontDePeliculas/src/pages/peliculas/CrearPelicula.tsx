import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearPelicula, getPersonas } from '../../service/api'; // Asegúrate de tener la API configurada
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'; // Importa AxiosError para manejar errores específicos

// Definir la interfaz de Persona para tipificar correctamente
interface Persona {
  id: string;
  nombre: string;
  tipo: 'director' | 'actor';
  foto: string; // Asumimos que cada persona tiene una foto
}

const CrearPelicula: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [fechaLanzamiento, setFechaLanzamiento] = useState('');
  const [calificacionRotten, setCalificacionRotten] = useState<number | null>(null);
  const [trailerYoutube, setTrailerYoutube] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null); // Para manejar errores
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const [directores, setDirectores] = useState<Persona[]>([]);
  const [actores, setActores] = useState<Persona[]>([]);
  const [directorSeleccionado, setDirectorSeleccionado] = useState('');
  const [actoresSeleccionados, setActoresSeleccionados] = useState<string[]>([]);
  const navigate = useNavigate();

  // Cargar directores y actores disponibles al montar el componente
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const personas: Persona[] = await getPersonas();
        const directores = personas.filter((persona) => persona.tipo === 'director');
        const actores = personas.filter((persona) => persona.tipo === 'actor');
        setDirectores(directores);
        setActores(actores);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error al cargar directores y actores');
      }
    };
    fetchPersonas();
  }, []);

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
    formData.append('director', directorSeleccionado);

    // Enviar los IDs de los actores seleccionados correctamente
    actoresSeleccionados.forEach((actorId) => {
      formData.append('reparto', actorId); // Cambiado a 'reparto' para enviar los IDs de actores como lista, sin los corchetes '[]'
    });

    try {
      await crearPelicula(formData); // Llama a la función para crear película en el backend
      navigate('/'); // Redirige a la lista de películas después de crear la película
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Error al crear la película');
        } else {
          setError('Hubo un problema al procesar la solicitud.');
        }
      } else {
        setError('Error desconocido al crear la película');
      }
    } finally {
      setLoading(false); // Detener el estado de carga
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Crear Película</h2>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            {/* Campos de película */}
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

            {/* Seleccionar director */}
            <Form.Group controlId="formDirector" className="mt-3">
              <Form.Label>Director</Form.Label>
              <Form.Control
                as="select"
                value={directorSeleccionado}
                onChange={(e) => setDirectorSeleccionado(e.target.value)}
                required
              >
                <option value="">Selecciona un director</option>
                {directores.map((director) => (
                  <option key={director.id} value={director.id}>
                    {director.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Seleccionar reparto (actores) */}
            <Form.Group controlId="formReparto" className="mt-3">
              <Form.Label>Reparto (Selecciona múltiples actores)</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={actoresSeleccionados}
                onChange={(e) => {
                  const target = e.target as unknown as HTMLSelectElement;
                  const selectedOptions = Array.from(target.selectedOptions).map(option => option.value);
                  setActoresSeleccionados(selectedOptions);
                }}
                required
              >
                {actores.map((actor) => (
                  <option key={actor.id} value={actor.id}>
                    {actor.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImagen" className="mt-3">
              <Form.Label>Imagen de la Película</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImagen(e.target.files[0]); // Establecer el archivo en el estado
                  }
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Película'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearPelicula;
