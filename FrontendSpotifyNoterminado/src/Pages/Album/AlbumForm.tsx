import React, { useState, useEffect } from 'react';
import { createAlbum, getArtistas } from '../../service/Conexion';

interface Artista {
    artistaId: number;
    nombre: string;
}

const AlbumForm: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [artistaId, setArtistaId] = useState<number | null>(null);
    const [file, setFile] = useState<File | undefined>();
    const [artistas, setArtistas] = useState<Artista[]>([]);
    const [mensaje, setMensaje] = useState('');

    // Cargar la lista de artistas al montar el componente
    useEffect(() => {
        const cargarArtistas = async () => {
            try {
                const data = await getArtistas();
                setArtistas(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setMensaje('Error al cargar los artistas.');
            }
        };
        cargarArtistas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!titulo || !artistaId) {
            setMensaje('Por favor completa todos los campos.');
            return;
        }

        try {
            // Crear el álbum
            const nuevoAlbum = await createAlbum(titulo, artistaId, file);
            setMensaje(`Álbum creado con éxito: ${nuevoAlbum.titulo}`);
            setTitulo('');
            setArtistaId(null);
            setFile(undefined);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setMensaje('Error al crear el álbum o subir la imagen.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Crear Álbum</h2>
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
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Imagen del Álbum:</label>
                    <input
                        id="file"
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        accept="image/*"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Álbum</button>
            </form>
        </div>
    );
};

export default AlbumForm;
