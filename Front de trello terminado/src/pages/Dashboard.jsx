import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
  const [tableros, setTableros] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [newTableroName, setNewTableroName] = useState('');
  const [selectedTablero, setSelectedTablero] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setError('Error al obtener el usuario autenticado');
      }
    };

    fetchTableros();
    fetchAuthenticatedUser();
  }, []);

  const handleAddTablero = async () => {
    if (!newTableroName.trim()) {
      alert('Por favor, ingresa un nombre para el tablero');
      return;
    }

    const nuevoTablero = { nombre: newTableroName };
    try {
      const response = await ApiService.addTablero(nuevoTablero);
      if (!response.error) {
        setTableros([...tableros, response]);
        setNewTableroName('');
      } else {
        console.error('Error al crear el tablero:', response.error);
      }
    } catch (error) {
      console.error('Error al crear el tablero:', error);
    }
  };

  const handleAddList = async () => {
    if (!newListName.trim()) {
      alert('Por favor, ingresa un nombre para la lista');
      return;
    }
    if (!selectedTablero) {
      alert('Por favor, selecciona un tablero');
      return;
    }

    const tableroSeleccionado = tableros.find(t => t.id === parseInt(selectedTablero));
    const orden = tableroSeleccionado?.listas?.length || 0;

    const nuevaLista = {
      nombre: newListName,
      tablero: selectedTablero,
      orden: orden
    };

    try {
      const response = await ApiService.addLista(nuevaLista);
      if (!response.error) {
        setNewListName('');
        navigate(`/tableros/${selectedTablero}/listas`);
      } else {
        console.error('Error al crear la lista:', response.error);
      }
    } catch (error) {
      console.error('Error al crear la lista:', error);
    }
  };

  const handleDeleteList = async (idLista) => {
    try {
      await ApiService.deleteLista(idLista);
      setTableros(tableros.filter(tablero => tablero.listas.every(lista => lista.id !== idLista)));
    } catch (error) {
      console.error('Error al eliminar la lista:', error);
    }
  };

  const handleEditList = (idLista) => {
    alert(`Edición de lista con ID: ${idLista}`);
  };

  const handleLogout = async () => {
    try {
      await ApiService.logout();
      navigate('/login');
    } catch (err) {
      console.error('Error al cerrar sesión', err);
      setError('Error al cerrar sesión');
    }
  };

  if (loading) return <p>Cargando tableros...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Mis Tableros</h1>
        {authenticatedUser && (
          <div className="user-info">
            <p>Bienvenido, {authenticatedUser.username}</p>
            <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          </div>
        )}
      </header>
      <div className="dashboard-content">
        <div className="add-section">
          <div className="add-board">
            <input
              type="text"
              value={newTableroName}
              onChange={(e) => setNewTableroName(e.target.value)}
              placeholder="Nombre del nuevo tablero"
              className="input"
            />
            <button onClick={handleAddTablero} className="add-button">Añadir Tablero</button>
          </div>
          <div className="add-list">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Nombre de la nueva lista"
              className="input"
            />
            <select
              value={selectedTablero}
              onChange={(e) => setSelectedTablero(e.target.value)}
              className="input"
            >
              <option value="">Seleccionar Tablero</option>
              {tableros.map((tablero) => (
                <option key={tablero.id} value={tablero.id}>
                  {tablero.nombre}
                </option>
              ))}
            </select>
            <button onClick={handleAddList} className="add-button">Añadir Lista</button>
          </div>
        </div>
        <div className="tableros-container">
          {tableros.length === 0 ? (
            <p>No tienes tableros aún.</p>
          ) : (
            tableros.map((tablero) => (
              <div key={tablero.id} className="tablero-card">
                <h2 className="tablero-title">{tablero.nombre}</h2>
                <Link to={`/tableros/${tablero.id}/listas`} className="view-lists-link">Ver listas</Link>
                <ul className="lista-items">
                  {tablero.listas?.map((lista) => (
                    <li key={lista.id} className="lista-item">
                      <span>{lista.nombre}</span>
                      <div className="action-buttons">
                        <button onClick={() => handleEditList(lista.id)} className="edit-button">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => handleDeleteList(lista.id)} className="delete-button">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
