import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerPersonaPorId, editarPersona } from '../../service/api';  // Servicios correctos
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


const EditarPersona: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('actor');
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personaData = await obtenerPersonaPorId(id!);
        setNombre(personaData.nombre);
        setTipo(personaData.tipo);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error al obtener los detalles de la persona');
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('tipo', tipo);
    if (foto) {
      formData.append('foto', foto);
    }

    try {
      await editarPersona(id!, formData);
      navigate('/personas');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Error al editar la persona');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Editar Persona</h2>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
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
              <Form.Label>Foto (opcional)</Form.Label>
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

            <Button variant="primary" type="submit" className="mt-4 w-100" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarPersona;
