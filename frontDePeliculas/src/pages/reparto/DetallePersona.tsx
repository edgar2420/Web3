import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerPersonaPorId } from '../../service/api';  // Servicio para obtener los detalles de la persona
import { Container, Row, Col } from 'react-bootstrap';

interface Pelicula {
  id: string;
  nombre: string;
}

interface Persona {
  nombre: string;
  tipo: string;
  foto: string;  // Si quieres mostrar la foto de la persona
  peliculas_dirigidas?: Pelicula[];
  peliculas_actuadas?: Pelicula[];
}

const DetallePersona: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const data = await obtenerPersonaPorId(id!);
        setPersona(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error al obtener el detalle de la persona');
      }
    };

    fetchPersona();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2>Detalle de la Persona</h2>
          {persona ? (
            <div>
              <p><strong>Nombre:</strong> {persona.nombre}</p>
              <p><strong>Tipo:</strong> {persona.tipo}</p>
              {persona.foto && (
                <div>
                  <p><strong>Foto:</strong></p>
                  <img src={persona.foto} alt={persona.nombre} style={{ width: '200px' }} />
                </div>
              )}

              {/* Mostrar películas donde ha sido director */}
              {persona.peliculas_dirigidas && persona.peliculas_dirigidas.length > 0 && (
                <div>
                  <h3>Películas dirigidas</h3>
                  <ul>
                    {persona.peliculas_dirigidas.map((pelicula) => (
                      <li key={pelicula.id}>{pelicula.nombre}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mostrar películas donde ha sido actor */}
              {persona.peliculas_actuadas && persona.peliculas_actuadas.length > 0 && (
                <div>
                  <h3>Películas actuadas</h3>
                  <ul>
                    {persona.peliculas_actuadas.map((pelicula) => (
                      <li key={pelicula.id}>{pelicula.nombre}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DetallePersona;
