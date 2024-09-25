import React, { useState } from 'react';
import ApiService from '../../service/ApiService';

const Lista = ({ lista }) => {
  const [tareas, setTareas] = useState(lista.tareas || []);
  const [newTarea, setNewTarea] = useState('');

  const handleAddTarea = async () => {
    if (newTarea.trim()) {
      const nuevaTarea = { texto: newTarea, lista: lista.id, archivado: false };
      const response = await ApiService.addTarea(nuevaTarea);
      setTareas([...tareas, response]);
      setNewTarea('');
    }
  };

  return (
    <div className="lista-container">
      <h3>{lista.nombre}</h3>
      <ul className="tareas-list">
        {tareas.map((tarea) => (
          <li key={tarea.id} className="tarea-card">
            {tarea.texto}
          </li>
        ))}
      </ul>

      <div className="nueva-tarea">
        <input
          type="text"
          value={newTarea}
          onChange={(e) => setNewTarea(e.target.value)}
          placeholder="Añade una tarjeta"
        />
        <button onClick={handleAddTarea}>Añadir</button>
      </div>
    </div>
  );
};

export default Lista;
