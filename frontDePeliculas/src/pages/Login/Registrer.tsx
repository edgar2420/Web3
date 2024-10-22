import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../service/api'; // Asegúrate de tener tu API configurada
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);  // Manejo del error
  const [loading, setLoading] = useState(false);  // Estado de carga
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // Activar el estado de carga
    setError(null);  // Resetear el error al hacer submit
    try {
      const userData = { username, email, password };
      const response = await register(userData);  // Llama a la función de registro
      if (!response.error) {
        alert('¡Registrado exitosamente!');
        navigate('/login');  // Redirige a la página de login después del registro
      } else {
        setError(response.error);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Error en el registro');
    } finally {
      setLoading(false);  // Desactivar el estado de carga
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',  // Asegúrate de que el contenedor ocupa toda la pantalla
        backgroundColor: '#F5F5F5',  // Fondo gris claro para la pantalla
        width: '100vw',  // Ocupar todo el ancho de la pantalla
        position: 'absolute',  // Posicionar el contenedor de forma absoluta
        top: 0,  // Mantenerlo anclado al tope de la pantalla
        left: 0  // Mantenerlo anclado al borde izquierdo
      }}
    >
      <div className="card p-4 shadow-lg"
          style={{
            width: '350px',
            borderRadius: '20px',
            backgroundColor: '#fff',
            border: 'none'
          }}>
        <h2 className="text-center text-dark mb-4">Registrarse</h2>
        {error && (
          <p className="text-danger text-center">{error}</p>  // Mostrar el error si ocurre
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg"
            style={{
              backgroundColor: '#00aaff',
              border: 'none'
            }}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/login" className="text-primary">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
