import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { FaEdit, FaTrash, FaArchive, FaUndo } from 'react-icons/fa';  // Importar los iconos
import './Lista.css';  // Importar los estilos

const Lista = () => {
  const { idTablero } = useParams();
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);  // Para editar la tarea
  const [editTaskText, setEditTaskText] = useState('');  // Para manejar el texto de la tarea en edición
  const [showArchived, setShowArchived] = useState(false);  // Para mostrar tareas archivadas

  useEffect(() => {
    const fetchListas = async () => {
      try {
        const response = await ApiService.getListas(idTablero);
        setListas(response);
      } catch (err) {
        setError('Error al cargar las listas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListas();
  }, [idTablero]);

  const handleAddTask = async (listaId) => {
    if (!newTask.trim()) {
      alert('Por favor ingresa una tarea');
      return;
    }

    const nuevaTarea = {
      texto: newTask,
      lista: listaId,
    };

    try {
      const response = await ApiService.addTarea(nuevaTarea);
      if (!response.error) {
        const updatedListas = listas.map((lista) =>
          lista.id === listaId ? { ...lista, tareas: [...lista.tareas, response] } : lista
        );
        setListas(updatedListas);
        setNewTask('');  // Limpiar el campo de nueva tarea
      }
    } catch (error) {
      console.error('Error al añadir tarea:', error);
    }
  };

  const handleEditTask = (tarea) => {
    setEditingTask(tarea.id);  // Activar modo edición
    setEditTaskText(tarea.texto);  // Cargar el texto actual de la tarea en edición
  };

  const handleUpdateTask = async (idTarea) => {
    const tareaToUpdate = listas
        .flatMap((lista) => lista.tareas)
        .find((tarea) => tarea.id === idTarea);  // Encuentra la tarea

    const data = {
        texto: editTaskText,
        lista: tareaToUpdate.lista,  // Incluye el ID de la lista
        orden: tareaToUpdate.orden,  // Incluye el campo 'orden'
        archivado: tareaToUpdate.archivado,  // Incluye el estado de archivado
    };

    console.log("Datos enviados para actualizar tarea:", data);

    try {
        const response = await ApiService.updateTarea(idTarea, data);
        if (!response.error) {
            const updatedListas = listas.map((lista) =>
                lista.id === tareaToUpdate.lista
                    ? { ...lista, tareas: lista.tareas.map((tarea) =>
                        tarea.id === idTarea ? { ...tarea, texto: editTaskText } : tarea) }
                    : lista
            );
            setListas(updatedListas);
            setEditingTask(null);  // Salir del modo edición
        }
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
    }
};


  const handleDeleteTask = async (idTarea, listaId) => {
    try {
      await ApiService.deleteTarea(idTarea);
      const updatedListas = listas.map((lista) =>
        lista.id === listaId ? { ...lista, tareas: lista.tareas.filter((tarea) => tarea.id !== idTarea) } : lista
      );
      setListas(updatedListas);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleArchiveTask = async (idTarea) => {
    try {
      await ApiService.archivarTarea(idTarea);
      const updatedListas = listas.map((lista) =>
        ({
          ...lista,
          tareas: lista.tareas.map((tarea) =>
            tarea.id === idTarea ? { ...tarea, archivado: true } : tarea
          )
        })
      );
      setListas(updatedListas);
    } catch (error) {
      console.error('Error al archivar la tarea:', error);
    }
  };

  const handleUnarchiveTask = async (idTarea) => {
    try {
      await ApiService.desarchivarTarea(idTarea);
      const updatedListas = listas.map((lista) =>
        ({
          ...lista,
          tareas: lista.tareas.map((tarea) =>
            tarea.id === idTarea ? { ...tarea, archivado: false } : tarea
          )
        })
      );
      setListas(updatedListas);
    } catch (error) {
      console.error('Error al desarchivar la tarea:', error);
    }
  };

  const handleCancelEditTask = () => {
    setEditingTask(null);  // Salir del modo edición sin guardar cambios
  };

  if (loading) return <p>Cargando listas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      {listas.length === 0 ? (
        <p>No hay listas en este tablero.</p>
      ) : (
        <div className="listas-container">
          {listas.map((lista) => (
            <div key={lista.id} className="lista">
              <h3 className="lista-titulo">{lista.nombre}</h3>
              <ul className="tareas">
                {/* Filtrar las tareas archivadas */}
                {lista.tareas.filter((tarea) => !tarea.archivado).map((tarea) => (
                  <li key={tarea.id} className="tarea">
                    {editingTask === tarea.id ? (
                      <div>
                        <input
                          type="text"
                          value={editTaskText}
                          onChange={(e) => setEditTaskText(e.target.value)}
                          className="input tarea-input"
                        />
                        <button onClick={() => handleUpdateTask(tarea.id)} className="updateButton">Actualizar</button>
                        <button onClick={handleCancelEditTask} className="cancelButton">Cancelar</button>
                      </div>
                    ) : (
                      <>
                        <span>{tarea.texto}</span>
                        <FaEdit className="icon edit-icon" onClick={() => handleEditTask(tarea)} />
                        <FaTrash className="icon delete-icon" onClick={() => handleDeleteTask(tarea.id, lista.id)} />
                        <FaArchive className="icon archive-icon" onClick={() => handleArchiveTask(tarea.id)} />
                      </>
                    )}
                  </li>
                ))}
              </ul>
              {/* Mostrar tareas archivadas al costado */}
              {lista.tareas.some((tarea) => tarea.archivado) && (
                <div className="archived-tasks">
                  <h4>Tareas archivadas</h4>
                  <ul>
                    {lista.tareas.filter((tarea) => tarea.archivado).map((tarea) => (
                      <li key={tarea.id}>
                        <span>{tarea.texto}</span>
                        <FaUndo className="icon unarchive-icon" onClick={() => handleUnarchiveTask(tarea.id)} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="tarea-form">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Agregar una tarea..."
                  className="input tarea-input"
                />
                <button onClick={() => handleAddTask(lista.id)} className="addButton">Añadir Tarea</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lista;
