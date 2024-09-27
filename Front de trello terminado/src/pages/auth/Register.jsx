import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, email, password };
      console.log("Datos enviados:", userData);
      const response = await ApiService.register(userData);

      if (!response.error) {
        alert('¡Registrado exitosamente!');
        navigate('/login');
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      console.error('Error de registro:', error);
      setErrorMessage('Error en el registro');
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
        <h2 className="text-center text-dark mb-4">Registrarse</h2>
        <form onSubmit={handleRegister}>
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
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
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
            Registrarse
          </button>
        </form>
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '10px' }} className="text-center">
            {errorMessage}
          </p>
        )}
        <div className="text-center mt-3">
          <a href="/login" className="text-primary">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
