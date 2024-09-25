const BASE_URL = 'http://localhost:8000/api';

const ApiService = {
    // Método para iniciar sesión
    login: async (credentials) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...credentials, login: true }),
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error en el inicio de sesión');
            }

            return await response.json();
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            return { error: error.message };
        }
    },

    // Obtener datos del usuario autenticado
    getAuthenticatedUser: async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/me/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al obtener el usuario autenticado');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al obtener el usuario autenticado:', error);
            return { error: error.message };
        }
    },

    // Método para registrar un nuevo usuario
    register: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.username) {
                    throw new Error('El nombre de usuario ya existe.');
                }
                throw new Error(errorData.detail || 'Error en el registro');
            }

            return await response.json();
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
            return { error: error.message };
        }
    },

    // Obtener tableros
    getTableros: async () => {
        try {
            const response = await fetch(`${BASE_URL}/tableros/`, {
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al obtener los tableros');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener tableros:', error);
            return { error: error.message };
        }
    },

    // Obtener listas de un tablero
    getListas: async (tableroId) => {
        try {
            const response = await fetch(`${BASE_URL}/tableros/${tableroId}/listas/`, {
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al obtener las listas');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener listas:', error);
            return { error: error.message };
        }
    },

    // Método para crear una nueva lista
    addLista: async (nuevaLista) => {
        try {
            const response = await fetch(`${BASE_URL}/listas/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaLista),
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al crear la lista');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al crear lista:', error);
            return { error: error.message };
        }
    },

    // Método para añadir un nuevo tablero
    addTablero: async (nuevoTablero) => {
        try {
            const response = await fetch(`${BASE_URL}/tableros/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoTablero),
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al crear el tablero');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al crear tablero:', error);
            return { error: error.message };
        }
    },

    // Agregar una nueva tarea
    addTarea: async (tarea) => {
        try {
            const response = await fetch(`${BASE_URL}/tareas/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tarea),
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al crear la tarea');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al crear tarea:', error);
            return { error: error.message };
        }
    },

    // Archivar una tarea (borrado lógico)
    archiveTarea: async (tareaId) => {
        try {
            const response = await fetch(`${BASE_URL}/tareas/${tareaId}/archivar/`, {
                method: 'PUT',
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al archivar la tarea');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al archivar tarea:', error);
            return { error: error.message };
        }
    },
};

export default ApiService;
