/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { createArtista, getGeneros, imagenArtist, getArtistas, deleteArtista } from '../../service/Conexion';

interface Genero {
    generoId: number;
    nombre: string;
}

interface Artista {
    artistaId: number;
    nombre: string;
    generoId: number;
    url?: string;
}

const ArtistaForm: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [generoId, setGeneroId] = useState<number | undefined>();
    const [file, setFile] = useState<File | undefined>();
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [artistas, setArtistas] = useState<Artista[]>([]);
    const [mensaje, setMensaje] = useState('');
    const [editando, setEditando] = useState<Artista | null>(null);

    useEffect(() => {
        cargarGeneros();
        cargarArtistas();
    }, []);

    const cargarGeneros = async () => {
        try {
            const data = await getGeneros();
            setGeneros(data);
        } catch (error) {
            setMensaje('Error al cargar los géneros.');
        }
    };

    const cargarArtistas = async () => {
        try {
            const data = await getArtistas();
            setArtistas(data);
        } catch (error) {
            setMensaje('Error al cargar los artistas.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre || !generoId) {
            setMensaje('Por favor completa todos los campos.');
            return;
        }
        try {
            // Primero crear/actualizar el artista
            const nuevoArtista = await createArtista(nombre, generoId);
            
            // Si hay un archivo seleccionado, subir la imagen
            if (file) {
                try {
                    await imagenArtist(nuevoArtista.artistaId, file);
                    setMensaje(`Artista creado y imagen subida con éxito: ${nuevoArtista.nombre}`);
                } catch (error) {
                    setMensaje('El artista se creó pero hubo un error al subir la imagen');
                    console.error('Error al subir imagen:', error);
                }
            } else {
                setMensaje(`Artista creado con éxito: ${nuevoArtista.nombre}`);
            }

            // Limpiar el formulario
            setNombre('');
            setGeneroId(undefined);
            setFile(undefined);
            setEditando(null);

            // Recargar la lista de artistas
            cargarArtistas();
        } catch (error) {
            setMensaje('Error al crear el artista.');
            console.error('Error:', error);
        }
    };

    const handleEdit = (artista: Artista) => {
        setNombre(artista.nombre);
        setGeneroId(artista.generoId);
        setEditando(artista);
        setMensaje('Editando artista: ' + artista.nombre);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteArtista(id);
            setMensaje('Artista eliminado con éxito.');
            cargarArtistas();
        } catch (error) {
            setMensaje('Error al eliminar el artista.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>{editando ? 'Editar Artista' : 'Crear Artista'}</h2>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre del Artista:</label>
                    <input
                        id="nombre"
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="genero" className="form-label">Género:</label>
                    <select
                        id="genero"
                        className="form-control"
                        value={generoId ?? ''}
                        onChange={(e) => setGeneroId(Number(e.target.value))}
                        required
                    >
                        <option value="">Selecciona un género</option>
                        {generos.map((genero) => (
                            <option key={genero.generoId} value={genero.generoId}>
                                {genero.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Imagen del Artista:</label>
                    <input
                        id="file"
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        accept="image/*"
                    />
                </div>
                <button type="submit" className="btn btn-primary">{editando ? 'Actualizar' : 'Crear'} Artista</button>
                {editando && (
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setEditando(null);
                            setNombre('');
                            setGeneroId(undefined);
                            setFile(undefined);
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <h3>Lista de Artistas</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Género</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {artistas.map((artista) => (
                        <tr key={artista.artistaId}>
                            <td>{artista.artistaId}</td>
                            <td>{artista.nombre}</td>
                            <td>{generos.find((g) => g.generoId === artista.generoId)?.nombre || "Sin género"}</td>
                            <td>
                                {artista.url ? (
                                    <img src={artista.url} alt={artista.nombre} width="50" />
                                ) : (
                                    "Sin imagen"
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(artista)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(artista.artistaId)}
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

export default ArtistaForm;
