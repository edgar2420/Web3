import React, { useState, useEffect } from 'react';
import { createGenero, getGeneros, deleteGenero, updateGenero } from '../../service/Conexion';

interface Genero {
    generoId: number;
    nombre: string;
}

const GeneroForm: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [editando, setEditando] = useState<Genero | null>(null);


    useEffect(() => {
        cargarGeneros();
    }, []);

    const cargarGeneros = async () => {
        try {
            const data = await getGeneros();
            setGeneros(data);
        } catch (error) {
            console.error("Error al cargar géneros:", error);
            setMensaje('Error al cargar los géneros.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre) {
            setMensaje('Por favor ingresa un nombre.');
            return;
        }

        try {
            if (editando) {

                await updateGenero(editando.generoId, nombre);
                setMensaje(`Género actualizado con éxito.`);
            } else {

                await createGenero(nombre);
                setMensaje(`Género creado con éxito.`);
            }
            setNombre('');
            setEditando(null);
            cargarGeneros();
        } catch (error) {
            console.error(editando ? "Error al actualizar género:" : "Error al crear género:", error);
            setMensaje(editando ? 'Error al actualizar el género.' : 'Error al crear el género.');
        }
    };

    const handleEdit = (genero: Genero) => {
        setEditando(genero);
        setNombre(genero.nombre);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteGenero(id);
            setMensaje('Género eliminado con éxito.');
            cargarGeneros();
        } catch (error) {
            console.error("Error al eliminar género:", error);
            setMensaje('Error al eliminar el género.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>{editando ? 'Editar Género' : 'Crear Género'}</h2>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                        Nombre del Género:
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">
                    {editando ? 'Actualizar' : 'Crear'}
                </button>
                {editando && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            setEditando(null);
                            setNombre('');
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <h3>Lista de Géneros</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {generos.map((genero) => (
                        <tr key={genero.generoId}>
                            <td>{genero.generoId}</td>
                            <td>{genero.nombre}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(genero)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(genero.generoId)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GeneroForm;
