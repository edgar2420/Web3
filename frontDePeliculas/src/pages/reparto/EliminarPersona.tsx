import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eliminarPersona } from '../../service/api';  // Servicio para eliminar Persona
import { Button, Container, Row, Col } from 'react-bootstrap';

const EliminarPersona: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEliminar = async () => {
    try {
      await eliminarPersona(id!);  // Elimina la persona por su ID
      navigate('/personas');  // Navega a la lista de personas después de eliminar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Error al eliminar la persona');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Eliminar Persona</h2>
          {error && <p className="text-danger">{error}</p>}
          <p>¿Estás seguro de que deseas eliminar esta persona?</p>
          <Button variant="danger" onClick={handleEliminar}>Eliminar</Button>
          <Button variant="secondary" onClick={() => navigate('/personas')} className="ml-3">Cancelar</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EliminarPersona;
