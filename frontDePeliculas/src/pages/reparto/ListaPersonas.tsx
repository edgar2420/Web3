import React, { useEffect, useState } from 'react';
import { getPersonas } from '../../service/api';  // Servicio para obtener todas las personas
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Pelicula {
  id: string;
  nombre: string;
}

interface Persona {
  id: string;
  nombre: string;
  foto: string;  // Si estás manejando fotos
  tipo: string;  // Actor o Director
  peliculas_dirigidas: Pelicula[];  // Añadido para manejar las películas dirigidas
}

const ListaPersonas: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const data = await getPersonas();
        console.log('Personas recibidas:', data);  // Verifica la estructura aquí
        setPersonas(data);  // Establece las personas que recibes desde el servicio
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error al obtener la lista de personas');
      }
    };

    fetchPersonas();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h2>Lista de Personas</h2>
          {error && <p className="text-danger">{error}</p>}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Películas Dirigidas</th>  {/* Nueva columna para películas dirigidas */}
                <th>Foto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((persona) => (
                <tr key={persona.id}>
                  <td>{persona.id}</td>
                  <td>{persona.nombre}</td>
                  <td>{persona.tipo === 'actor' ? 'Actor' : 'Director'}</td>
                  <td>
                    {/* Mostrar las películas dirigidas */}
                    {persona.peliculas_dirigidas && persona.peliculas_dirigidas.length > 0 ? (
                      <ul>
                        {persona.peliculas_dirigidas.map((pelicula) => (
                          <li key={pelicula.id}>{pelicula.nombre}</li>
                        ))}
                      </ul>
                    ) : (
                      'No ha dirigido películas'
                    )}
                  </td>
                  <td>
                    {/* Mostrar la imagen si está disponible */}
                    {persona.foto ? (
                      <img src={persona.foto} alt={persona.nombre} width="50" />
                    ) : (
                      'Sin foto'
                    )}
                  </td>
                  <td>
                    <Link to={`/persona/${persona.id}`}>Ver</Link>{' '}
                    <Link to={`/persona/${persona.id}/edit`}>Editar</Link>{' '}
                    <Link to={`/persona/${persona.id}/delete`}>Eliminar</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListaPersonas;
