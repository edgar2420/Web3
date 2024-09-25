import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const Tarea = () => {
  const { idLista } = useParams();
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      const data = await ApiService.getTareas(idLista);
      setTareas(data);
    };
    fetchTareas();
  }, [idLista]);

  return (
    <div>
      <h1>Tareas en la Lista</h1>
      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>
            {tarea.texto} - {tarea.archivado ? 'Archivada' : 'Activa'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tarea;
