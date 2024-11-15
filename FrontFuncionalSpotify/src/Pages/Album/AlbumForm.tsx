/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { createAlbum, getArtistas, getAlbums, deleteAlbum, updateAlbum } from '../../service/Conexion';

interface Artista {
    artistaId: number;
    nombre: string;
}

interface Album {
    albumId: number;
    titulo: string;
    artistaId: number;
}

const AlbumForm: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [artistaId, setArtistaId] = useState<number | null>(null);
    const [artistas, setArtistas] = useState<Artista[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [mensaje, setMensaje] = useState('');
    const [editando, setEditando] = useState<Album | null>(null);

    useEffect(() => {
        cargarArtistas();
        cargarAlbums();
    }, []);

    const cargarArtistas = async () => {
        try {
            const data = await getArtistas();
            setArtistas(data);
        } catch (error) {
            setMensaje('Error al cargar los artistas.');
        }
    };

    const cargarAlbums = async () => {
        try {
            const data = await getAlbums();
            setAlbums(data);
        } catch (error) {
            setMensaje('Error al cargar los álbumes.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!titulo || !artistaId) {
            setMensaje('Por favor completa todos los campos.');
            return;
        }
        try {
            let nuevoAlbum;
            if (editando) {
                nuevoAlbum = await updateAlbum(editando.albumId, titulo, artistaId);
                setMensaje(`Álbum actualizado con éxito: ${titulo}`);
            } else {
                nuevoAlbum = await createAlbum(titulo, artistaId);
                setMensaje(`Álbum creado con éxito: ${nuevoAlbum.titulo}`);
            }
            setTitulo('');
            setArtistaId(null);
            setEditando(null);
            cargarAlbums();
        } catch (error) {
            setMensaje('Error al crear o actualizar el álbum.');
        }
    };

    const handleEdit = (album: Album) => {
        setTitulo(album.titulo);
        setArtistaId(album.artistaId);
        setEditando(album);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteAlbum(id);
            setMensaje('Álbum eliminado con éxito.');
            cargarAlbums();
        } catch (error) {
            setMensaje('Error al eliminar el álbum.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>{editando ? 'Editar Álbum' : 'Crear Álbum'}</h2>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título del Álbum:</label>
                    <input
                        id="titulo"
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="artista" className="form-label">Artista:</label>
                    <select
                        id="artista"
                        className="form-control"
                        value={artistaId ?? ''}
                        onChange={(e) => setArtistaId(Number(e.target.value))}
                        required
                    >
                        <option value="">Selecciona un artista</option>
                        {artistas.map((artista) => (
                            <option key={artista.artistaId} value={artista.artistaId}>
                                {artista.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    {editando ? 'Actualizar Álbum' : 'Crear Álbum'}
                </button>
                {editando && (
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setEditando(null);
                            setTitulo('');
                            setArtistaId(null);
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <h3>Lista de Álbumes</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Artista</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {albums.map((album) => (
                        <tr key={album.albumId}>
                            <td>{album.albumId}</td>
                            <td>{album.titulo}</td>
                            <td>{artistas.find(a => a.artistaId === album.artistaId)?.nombre || "Desconocido"}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(album)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(album.albumId)}
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

export default AlbumForm;
