import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearPersona } from '../../service/api';  // Función de API para crear persona
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CrearPersona: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('actor');
  const [foto, setFoto] = useState<File | null>(null);  // Para la imagen
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('tipo', tipo);
    if (foto) {
      formData.append('foto', foto);  // Añadir la imagen al formulario
    }

    try {
      await crearPersona(formData);  // Llama a la función que crea persona en el backend
      navigate('/personas');  // Redirige después de crear
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      setError('Error al crear la persona');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Crear Persona</h2>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la persona"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTipo" className="mt-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="actor">Actor</option>
                <option value="director">Director</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFoto" className="mt-3">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFoto(e.target.files[0]);
                  }
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Crear Persona
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearPersona;
