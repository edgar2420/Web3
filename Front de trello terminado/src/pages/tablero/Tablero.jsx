import React, { useEffect, useState } from 'react';
import ApiService from '../../service/ApiService';
import Lista from './Lista';
import './Tablero.css';  // Asegúrate de que este archivo CSS exista

const Tablero = () => {
  const [tableros, setTableros] = useState([]);
  const [selectedTablero, setSelectedTablero] = useState(null);
  const [listas, setListas] = useState([]);
  const [newLista, setNewLista] = useState('');
  const [newTablero, setNewTablero] = useState('');  // Estado para el nuevo tablero
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [showAddTableroForm, setShowAddTableroForm] = useState(false);  // Estado para controlar el formulario de nuevo tablero

  useEffect(() => {
    const fetchTableros = async () => {
      const data = await ApiService.getTableros();
      setTableros(data);
    };
    fetchTableros();
  }, []);

  const handleSelectTablero = async (tablero) => {
    setSelectedTablero(tablero);
    const data = await ApiService.getListas(tablero.id);
    setListas(data);
  };

  const handleAddLista = async () => {
    if (newLista.trim()) {
      const nuevaLista = { nombre: newLista, tablero: selectedTablero.id };
      const response = await ApiService.addLista(nuevaLista);
      setListas([...listas, response]);
      setNewLista('');
      setShowAddListForm(false);
    }
  };

  const handleAddTablero = async () => {
    if (newTablero.trim()) {
      const nuevoTablero = { nombre: newTablero };
      const response = await ApiService.addTablero(nuevoTablero);
      setTableros([...tableros, response]);
      setNewTablero('');
      setShowAddTableroForm(false);
    }
  };

  return (
    <div className="tablero-container">
      {/* Botón para añadir nuevo tablero */}
      <div className="mb-4">
        {!showAddTableroForm && (
          <button
            className="btn btn-success mb-3"
            style={{ padding: '10px 20px', fontSize: '16px' }}
            onClick={() => setShowAddTableroForm(true)}
          >
            + Crear nuevo tablero
          </button>
        )}
      </div>

      {/* Formulario para agregar nuevo tablero */}
      {showAddTableroForm && (
        <div className="nueva-tablero-form">
          <input
            type="text"
            value={newTablero}
            onChange={(e) => setNewTablero(e.target.value)}
            placeholder="Nombre del nuevo tablero"
            className="form-control mb-2"
          />
          <div>
            <button className="btn btn-primary" onClick={handleAddTablero}>
              Crear Tablero
            </button>
            <button
              className="btn btn-secondary ml-2"
              style={{ marginLeft: '10px' }}
              onClick={() => setShowAddTableroForm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de tableros */}
      <ul className="tableros-list">
        {tableros.length > 0 ? (
          tableros.map((tablero) => (
            <li
              key={tablero.id}
              onClick={() => handleSelectTablero(tablero)}
              style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}
            >
              {tablero.nombre}
            </li>
          ))
        ) : (
          <p>No tienes tableros aún.</p>
        )}
      </ul>

      {/* Si se seleccionó un tablero, mostrar las listas */}
      {selectedTablero && (
        <div className="mt-4">
          <h2>{selectedTablero.nombre}</h2>

          <div className="listas-container">
            {listas.map((lista) => (
              <Lista key={lista.id} lista={lista} />
            ))}

            {/* Botón para añadir nueva lista */}
            {!showAddListForm && (
              <button
                className="btn btn-info mt-3"
                style={{ padding: '10px 20px', fontSize: '16px' }}
                onClick={() => setShowAddListForm(true)}
              >
                + Añade una lista
              </button>
            )}

            {/* Formulario para agregar nueva lista */}
            {showAddListForm && (
              <div className="nueva-lista-form mt-3">
                <input
                  type="text"
                  value={newLista}
                  onChange={(e) => setNewLista(e.target.value)}
                  placeholder="Nombre de la nueva lista"
                  className="form-control mb-2"
                />
                <div>
                  <button className="btn btn-primary" onClick={handleAddLista}>
                    Añadir Lista
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    style={{ marginLeft: '10px' }}
                    onClick={() => setShowAddListForm(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tablero;
