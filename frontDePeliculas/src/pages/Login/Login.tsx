import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../service/api'; // Asegúrate de tener tu API configurada
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const LoginForm: React.FC = () => {
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
      const data = await login({ email, password });  // Llama a la función de inicio de sesión
      localStorage.setItem('token', data.token);  // Guarda el token en localStorage
      navigate('/');  // Redirige a la página principal después del login
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);  // Muestra el mensaje de error específico
      } else {
        setError('Credenciales incorrectas');  // Mensaje de error genérico
      }
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
        <h2 className="text-center text-dark mb-4">Iniciar Sesión</h2>
        {error && (
          <p className="text-danger text-center">{error}</p> // Mostrar el error
        )}
        <form onSubmit={handleSubmit}>
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
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/register" className="text-primary">¿No tienes una cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
