import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { FaEdit, FaTrash, FaArchive, FaUndo, FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown, FaHome } from 'react-icons/fa';
import './Lista.css';

const Lista = () => {
  const { idTablero } = useParams();
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskText, setNewTaskText] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [editingList, setEditingList] = useState(null);
  const [editListName, setEditListName] = useState('');

  useEffect(() => {
    const fetchListas = async () => {
      try {
        const response = await ApiService.getListas(idTablero);
        // Ordenar las tareas por el campo 'orden' antes de actualizar el estado
        const listasOrdenadas = response.map(lista => ({
          ...lista,
          tareas: lista.tareas.sort((a, b) => a.orden - b.orden)
        }));
        setListas(listasOrdenadas);
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
    const newTask = newTaskText[listaId]?.trim();
    if (!newTask) {
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
        setNewTaskText((prevState) => ({ ...prevState, [listaId]: '' }));
      }
    } catch (error) {
      console.error('Error al añadir tarea:', error);
    }
  };

  const handleNewTaskChange = (listaId, text) => {
    setNewTaskText((prevState) => ({ ...prevState, [listaId]: text }));
  };

  const handleEditTask = (tarea) => {
    setEditingTask(tarea.id);
    setEditTaskText(tarea.texto);
  };

  const handleUpdateTask = async (idTarea) => {
    const tareaToUpdate = listas
      .flatMap((lista) => lista.tareas)
      .find((tarea) => tarea.id === idTarea);

    const data = {
      texto: editTaskText,
      lista: tareaToUpdate.lista,
      orden: tareaToUpdate.orden,
      archivado: tareaToUpdate.archivado,
    };

    try {
      const response = await ApiService.updateTarea(idTarea, data);
      if (!response.error) {
        const updatedListas = listas.map((lista) =>
          lista.id === tareaToUpdate.lista
            ? {
                ...lista,
                tareas: lista.tareas.map((tarea) =>
                  tarea.id === idTarea ? { ...tarea, texto: editTaskText } : tarea
                ),
              }
            : lista
        );
        setListas(updatedListas);
        setEditingTask(null);
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
      const updatedListas = listas.map((lista) => ({
        ...lista,
        tareas: lista.tareas.map((tarea) => (tarea.id === idTarea ? { ...tarea, archivado: true } : tarea)),
      }));
      setListas(updatedListas);
    } catch (error) {
      console.error('Error al archivar la tarea:', error);
    }
  };

  const handleUnarchiveTask = async (idTarea) => {
    try {
      await ApiService.desarchivarTarea(idTarea);
      const updatedListas = listas.map((lista) => ({
        ...lista,
        tareas: lista.tareas.map((tarea) => (tarea.id === idTarea ? { ...tarea, archivado: false } : tarea)),
      }));
      setListas(updatedListas);
    } catch (error) {
      console.error('Error al desarchivar la tarea:', error);
    }
  };

  const handleCancelEditTask = () => {
    setEditingTask(null);
  };

  const handleEditList = (lista) => {
    setEditingList(lista.id);
    setEditListName(lista.nombre);
  };

  const handleUpdateList = async (idLista) => {
    const listaToUpdate = listas.find((lista) => lista.id === idLista);
    const data = { nombre: editListName, orden: listaToUpdate.orden };

    try {
      const response = await ApiService.updateLista(idLista, data);
      if (!response.error) {
        const updatedListas = listas.map((lista) =>
          lista.id === idLista ? { ...lista, nombre: editListName } : lista
        );
        setListas(updatedListas);
        setEditingList(null);
      }
    } catch (error) {
      console.error('Error al actualizar la lista:', error);
    }
  };

  const handleDeleteList = async (idLista) => {
    try {
      await ApiService.deleteLista(idLista);
      setListas(listas.filter((lista) => lista.id !== idLista));
    } catch (error) {
      console.error('Error al eliminar la lista:', error);
    }
  };

  const handleCancelEditList = () => {
    setEditingList(null);
  };

  const moverTarea = async (tareaId, listaOrigenId, listaDestinoId, nuevaPosicion) => {
    // Obtener las listas origen y destino
    const listaOrigen = listas.find((lista) => lista.id === listaOrigenId);
    const listaDestino = listas.find((lista) => lista.id === listaDestinoId);
    const tarea = listaOrigen.tareas.find((tarea) => tarea.id === tareaId);

    // Actualización inmediata en el frontend (estado local)
    listaOrigen.tareas = listaOrigen.tareas.filter((t) => t.id !== tareaId);
    listaDestino.tareas.splice(nuevaPosicion, 0, tarea);

    // Ajustar el orden localmente en la lista destino
    listaDestino.tareas = listaDestino.tareas.map((t, index) => ({ ...t, orden: index }));

    // Actualizar el estado en React
    setListas([...listas]);

    // Enviar el nuevo orden al backend
    const data = {
        nueva_lista_id: listaDestinoId,
        nuevo_orden: nuevaPosicion
    };

    try {
        const response = await ApiService.moverTarea(tareaId, data);
        if (response.error) {
            console.error('Error al mover la tarea:', response.error);
        }
    } catch (error) {
        console.error('Error al mover la tarea:', error);
    }
};




  if (loading) return <p>Cargando listas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="home-icon">
          <FaHome /> Inicio
        </Link>
        <h1>Tablero</h1>
      </header>

      {listas.length === 0 ? (
        <p>No hay listas en este tablero.</p>
      ) : (
        <div className="listas-container">
          {listas.map((lista, indexLista) => (
            <div key={lista.id} className="lista">
              {editingList === lista.id ? (
                <div>
                  <input
                    type="text"
                    value={editListName}
                    onChange={(e) => setEditListName(e.target.value)}
                    placeholder="Nuevo nombre de la lista"
                    className="input tarea-input"
                  />
                  <button onClick={() => handleUpdateList(lista.id)} className="updateButton">Actualizar</button>
                  <button onClick={handleCancelEditList} className="cancelButton">Cancelar</button>
                </div>
              ) : (
                <>
                  <h3 className="lista-titulo">{lista.nombre}</h3>
                  <div className="lista-actions">
                    <FaEdit className="icon edit-icon" onClick={() => handleEditList(lista)} />
                    <FaTrash className="icon delete-icon" onClick={() => handleDeleteList(lista.id)} />
                  </div>
                </>
              )}

<ul className="tareas">
  {lista.tareas
    .sort((a, b) => a.orden - b.orden) // Asegurarse de que se rendericen en el orden correcto
    .map((tarea, index) => (
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
            <FaArrowLeft
              className="icon move-left-icon"
              onClick={() => {
                if (indexLista > 0) {
                  moverTarea(tarea.id, lista.id, listas[indexLista - 1].id, listas[indexLista - 1].tareas.length);
                }
              }}
            />
            <FaArrowRight
              className="icon move-right-icon"
              onClick={() => {
                if (indexLista < listas.length - 1) {
                  moverTarea(tarea.id, lista.id, listas[indexLista + 1].id, listas[indexLista + 1].tareas.length);
                }
              }}
            />
            <FaArrowUp
              className="icon move-up-icon"
              onClick={() => moverTarea(tarea.id, lista.id, lista.id, index - 1)}
            />
            <FaArrowDown
              className="icon move-down-icon"
              onClick={() => moverTarea(tarea.id, lista.id, lista.id, index + 1)}
            />
            <FaEdit className="icon edit-icon" onClick={() => handleEditTask(tarea)} />
            <FaTrash className="icon delete-icon" onClick={() => handleDeleteTask(tarea.id, lista.id)} />
            <FaArchive className="icon archive-icon" onClick={() => handleArchiveTask(tarea.id)} />
          </>
        )}
      </li>
    ))}
</ul>
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
                  value={newTaskText[lista.id] || ''}
                  onChange={(e) => handleNewTaskChange(lista.id, e.target.value)}
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
