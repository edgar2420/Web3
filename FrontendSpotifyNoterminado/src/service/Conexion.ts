import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5064/api',
});

// === Genero Services ===

// Crear un nuevo género
export const createGenero = async (nombre: string) => {
    try {
        const response = await api.post('/Generos', { nombre });
        return response.data;
    } catch (error) {
        console.error("Error al crear género:", error);
        throw error;
    }
};

// Obtener todos los géneros
export const getGeneros = async () => {
    try {
        const response = await api.get('/Generos');
        return response.data;
    } catch (error) {
        console.error("Error al obtener géneros:", error);
        if (axios.isAxiosError(error) && error.response) {
            console.error("Error response data:", error.response.data);
        }
        throw error;
    }
};

// Eliminar un género
export const deleteGenero = async (id: number) => {
    try {
        const response = await api.delete(`/Generos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar género:", error);
        throw error;
    }
};

// Actualizar un género
export const updateGenero = async (id: number, nombre: string) => {
    try {
        const response = await api.put(`/Generos/${id}`, { generoId: id, nombre });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar género:", error);
        throw error;
    }
};

// === Cancion Services ===

// Crear una nueva canción
export const createCancion = async (titulo: string, albumId: number) => {
    try {
        const response = await api.post('/Cancions', { titulo, albumId });
        return response.data;
    } catch (error) {
        console.error("Error al crear la canción:", error);
        throw error;
    }
};

// Subir un archivo de audio para la canción
export const uploadFile = async (cancionId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post(`/Cancions/${cancionId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        throw error;
    }
};

// Obtener todas las canciones
export const getCanciones = async () => {
    try {
        const response = await api.get('/Cancions');
        return response.data;
    } catch (error) {
        console.error("Error al obtener canciones:", error);
        throw error;
    }
};

// === Album Services ===

// Crear un nuevo álbum con la opción de subir imagen
export const createAlbum = async (titulo: string, artistaId: number, file?: File) => {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('artistaId', String(artistaId));
    if (file) formData.append('file', file);

    try {
        const response = await api.post('/Albums', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el álbum:", error);
        throw error;
    }
};

// Obtener todos los álbumes
export const getAlbums = async () => {
    try {
        const response = await api.get('/Albums');
        return response.data;
    } catch (error) {
        console.error("Error al obtener álbumes:", error);
        throw error;
    }
};

// === Artista Services ===

// Crear un nuevo artista
export const createArtista = async (nombre: string, generoId: number) => {
    try {
        console.log("Creando artista con:", { nombre, generoId });
        const response = await api.post('/Artistas', { nombre, generoId });
        return response.data;
    } catch (error) {
        console.error('Error al crear el artista:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error("Error response data:", error.response.data);
        }
        throw error;
    }
};

// Subir un archivo de imagen para el artista
// Servicio para subir la imagen
export const imagenArtist = async (artistaId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post(`/Artistas/${artistaId}/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
};



// Obtener todos los artistas
export const getArtistas = async () => {
    try {
        const response = await api.get('/Artistas');
        console.log("Artistas obtenidos en el frontend:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener artistas:", error);
        throw error;
    }
};


// Eliminar un artista
export const deleteArtista = async (id: number) => {
    try {
        const response = await api.delete(`/Artistas/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar artista:", error);
        throw error;
    }
};

export default api;
