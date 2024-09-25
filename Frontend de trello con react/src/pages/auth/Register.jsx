import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import ApiService from '../../service/ApiService';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Para manejar errores
  const navigate = useNavigate();  // Hook para redirigir

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await ApiService.register({ username, email, password });
      alert('¡Registrado exitosamente!'); // Mensaje de éxito
      navigate('/login'); // Redirigir al login
    } catch (error) {
      console.error('Error de registro:', error);
      setErrorMessage(error.message);  // Muestra el error si lo hay
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuario"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Registrarse</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Mostrar error */}
    </form>
  );
};

export default RegisterForm;
