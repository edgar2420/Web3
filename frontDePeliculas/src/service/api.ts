import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';  // Ajusta la URL de la API según sea necesario

const api = axios.create({
baseURL: API_URL,
headers: {
    'Content-Type': 'application/json',
},
});

// Login del usuario
export const login = async (credentials: { email: string; password: string }) => {
const response = await api.post('/usuarios/login/', credentials);
  return response.data;  // Devolverá probablemente un token
};

// Registro del usuario
export const register = async (userData: { email: string; password: string }) => {
const response = await api.post('/usuarios/register/', userData);
return response.data;
};

// Crear una nueva película
export const crearPelicula = async (formData: FormData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/peliculas/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear la película:', error);
      throw error;
    }
  };
  

  // Obtener una película por su ID
export const obtenerPeliculaPorId = async (id: string) => {
    const response = await axios.get(`${API_URL}/peliculas/${id}/`);
    return response.data;
  };

  // Actualizar una película
export const actualizarPelicula = async (id: string, peliculaData: FormData) => {
    const response = await axios.put(`${API_URL}/peliculas/${id}/`, peliculaData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Para manejar archivos
      },
    });
    return response.data;
  };

  // Eliminar una película
  export const eliminarPelicula = async (id: string) => {
    const response = await axios.delete(`${API_URL}/peliculas/${id}/`);
    return response.data;
  };

  // Obtener todas las películas
export const obtenerPeliculas = async () => {
    const response = await axios.get(`${API_URL}/peliculas/`);
    return response.data;
  };

// Obtener todos los repartos
export const getRepartos = async () => {
    try {
      const response = await axios.get(`${API_URL}/reparto/`); // Corregir la ruta de la API si es necesario
      return response.data;
    } catch (error) {
      console.error('Error al obtener los repartos:', error);
      throw error;
    }
  };
  

// Obtener un reparto específico por ID
export const getReparto = async (id: string) => {
    try {
      const response = await api.get(`/reparto/${id}/`);  // Utilizamos la instancia 'api' configurada
      return response.data;  // Retornamos los datos del reparto
    } catch (error) {
      console.error(`Error al obtener el reparto con ID ${id}:`, error);
      throw error;  // Lanzamos el error para manejarlo en el componente o lógica que lo utilice
    }
  };

  export const obtenerRepartos = async () => {
    try {
      const response = await axios.get('/api/reparto/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los repartos:', error);
      throw error;
    }
  };
  
  // Editar un reparto existente
  export const editarReparto = async (id: string, repartoData: { persona: string; rol: string }) => {
    const response = await axios.put(`${API_URL}/reparto/${id}/`, repartoData);
    return response.data;
  };
  
// Eliminar una persona
export const eliminarPersona = async (id: string) => {
    const response = await axios.delete(`${API_URL}/personas/${id}/`);
    return response.data;
  };
  

  // Obtener todas las personas (actores/directores)
export const getPersonas = async () => {
    const response = await axios.get(`${API_URL}/personas/`);
    return response.data;
  };

  // Crear una nueva persona (actor o director)
export const crearPersona = async (personaData: FormData) => {
    const response = await axios.post(`${API_URL}/personas/`, personaData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Especifica que estamos enviando un archivo
      },
    });
    return response.data;
  };


// Obtener una persona específica por ID, con detalles completos de las películas
export const obtenerPersonaPorId = async (id: string) => {
    const response = await axios.get(`${API_URL}/personas/${id}/`);
    return response.data;  // Asegúrate de que la API devuelva las películas dirigidas y actuadas
};



  // Editar una persona
  export const editarPersona = async (id: string, personaData: FormData) => {
    const response = await axios.put(`${API_URL}/personas/${id}/`, personaData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Especifica que estamos manejando archivos
      },
    });
    return response.data;
  };