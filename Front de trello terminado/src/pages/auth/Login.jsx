import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Llamamos a la API con las credenciales del usuario
      const response = await ApiService.login({ username, password });

      // Si no hay error, redirigimos al usuario a la página principal
      if (!response.error) {
        alert('Inicio de sesión correctamente');
        navigate('/');  // Redirige a la página principal o dashboard
      } else {
        // Si hay un error, mostramos el mensaje correspondiente
        setErrorMessage(response.error);
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setErrorMessage('Error en el inicio de sesión');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
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
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
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
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 btn-lg"
                  style={{ backgroundColor: '#00aaff', border: 'none' }}>
            Login
          </button>
        </form>
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '10px' }} className="text-center">
            {errorMessage}
          </p>
        )}
        <div className="text-center mt-3">
          <a href="/register" className="text-primary">¿No tienes Cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
