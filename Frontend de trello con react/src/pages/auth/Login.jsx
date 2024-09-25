import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {s
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.login({ username, password });
      
      if (!response.error) {
        alert('Inicio de sesión correctamente');
        navigate('/');  // Redirige al dashboard o página principal
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ 
        minHeight: '100vh',  // Asegura que ocupe toda la altura de la pantalla
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
        <h2 className="text-center text-dark mb-4">Bienvenido</h2>
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
          <a href="/src/pages/auth/Register.jsx" className="text-primary">¿No tienes Cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;