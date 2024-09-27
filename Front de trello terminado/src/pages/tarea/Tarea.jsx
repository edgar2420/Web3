import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Para obtener el parámetro idLista
import ApiService from '../../service/ApiService';

const Tarea = () => {
  const { idLista } = useParams();  // Obtener el idLista de la URL
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await ApiService.getTareas(idLista);
        setTareas(response);
      } catch (err) {
        setError('Error al cargar las tareas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTareas();
  }, [idLista]);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Tareas de la Lista {idLista}</h1>
      {tareas.length === 0 ? (
        <p>No hay tareas en esta lista.</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id}>
              {tarea.texto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tarea;
