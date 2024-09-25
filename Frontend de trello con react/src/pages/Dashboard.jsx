import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tableros, setTableros] = useState([]);
  const [newListName, setNewListName] = useState('');  // Estado para el nombre de la nueva lista
  const [newTableroName, setNewTableroName] = useState('');  // Estado para el nuevo tablero
  const [selectedTablero, setSelectedTablero] = useState(null);  // Estado para el tablero seleccionado
  const [authenticatedUser, setAuthenticatedUser] = useState(null);  // Estado para el usuario autenticado
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  useEffect(() => {
    const fetchTableros = async () => {
      try {
        const data = await ApiService.getTableros();
        setTableros(data);
      } catch (err) {
        setError('Error al cargar los tableros');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAuthenticatedUser = async () => {
      try {
        const userData = await ApiService.getAuthenticatedUser();
        setAuthenticatedUser(userData);
      } catch (err) {
        console.error('Error al obtener el usuario autenticado', err);
      }
    };

    fetchTableros();
    fetchAuthenticatedUser();
  }, []);

  const handleAddTablero = async () => {
    if (!newTableroName) return;

    try {
      const response = await ApiService.addTablero({ nombre: newTableroName });
      alert('Tablero añadido correctamente');
      setTableros([...tableros, response]); // Añadir el nuevo tablero a la lista existente
      setNewTableroName(''); // Limpiar el nombre del tablero
    } catch (err) {
      console.error('Error al añadir tablero:', err);
      setError('Error al añadir el tablero');
    }
  };

  if (loading) return <p>Cargando tableros...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mis Tableros</h1>

      {authenticatedUser && (
        <p>Bienvenido, {authenticatedUser.username}</p>  // Mostrar el nombre del usuario autenticado
      )}

      {/* Formulario para añadir nuevo tablero */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTableroName}
          onChange={(e) => setNewTableroName(e.target.value)}
          placeholder="Nombre del nuevo tablero"
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
        <button onClick={handleAddTablero}>Añadir Tablero</button>  {/* Se asegura de que handleAddTablero esté definida */}
      </div>

      {tableros.length === 0 ? (
        <p>No tienes tableros aún.</p>
      ) : (
        tableros.map((tablero) => (
          <div key={tablero.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{tablero.nombre}</h2>
            <Link to={`/tableros/${tablero.id}/listas`}>Ver listas</Link>

            {/* Botón para añadir lista */}
            <button onClick={() => setSelectedTablero(tablero.id)}>Añadir Lista</button>

            {/* Formulario para añadir lista */}
            {selectedTablero === tablero.id && (
              <div style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Nombre de la nueva lista"
                  style={{ padding: '8px', width: '200px', marginRight: '10px' }}
                />
                <button onClick={() => handleAddList(tablero.id)}>Añadir</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
