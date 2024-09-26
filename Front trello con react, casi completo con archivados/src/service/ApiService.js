const BASE_URL = 'http://localhost:8000/api';

// Función para obtener el token CSRF desde las cookies
const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
};

const ApiService = {
    // Método para iniciar sesión
    login: async (credentials) => {
        try {
            const response = await fetch(`${BASE_URL}/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),  // Aquí enviamos las credenciales
                credentials: 'include',  // Incluir credenciales para manejar sesiones
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error en el inicio de sesión');
            }

            return await response.json();  // Devolver la respuesta si es correcta
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            return { error: error.message };
        }
    },

    // Método para registrar un nuevo usuario
    register: async (userData) => {
        try {
            const csrfToken = getCsrfToken();  // Obtener el token CSRF

            const response = await fetch(`${BASE_URL}/register/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Incluir el token CSRF en el encabezado
                },
                body: JSON.stringify(userData),  // Aquí verificamos que el userData sea correcto
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                const errorData = await response.json();  // Detalle del error
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

    // Obtener datos del usuario autenticado
    getAuthenticatedUser: async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/me/`, {
                method: 'GET',
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                throw new Error('No se pudo obtener el usuario autenticado');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al obtener el usuario autenticado:', error);
            return { error: error.message };
        }
    },

    // Método para cerrar sesión
    logout: async () => {
        try {
            const csrfToken = getCsrfToken();  // Obtener el token CSRF

            const response = await fetch(`${BASE_URL}/logout/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,  // Incluir el token CSRF en el encabezado
                },
                credentials: 'include',  // Incluir credenciales en la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al cerrar sesión');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            return { error: error.message };
        }
    },

    // Método para añadir un nuevo tablero
    addTablero: async (nuevoTablero) => {
        try {
            const csrfToken = getCsrfToken();  // Obtener el token CSRF

            const response = await fetch(`${BASE_URL}/tableros/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Incluir el token CSRF en el encabezado
                },
                body: JSON.stringify({ nombre: nuevoTablero.nombre }),  // Asegurarse de enviar el campo correcto
                credentials: 'include',  // Incluir credenciales para manejar sesiones
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al crear el tablero');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al crear tablero:', error);
            return { error: error.message };
        }
    },

    // Método para obtener los tableros
    getTableros: async () => {
        try {
            const response = await fetch(`${BASE_URL}/tableros/`, {
                method: 'GET',
                credentials: 'include',  // Enviar credenciales de sesión
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
    // Método para añadir una nueva lista
    addLista: async (nuevaLista) => {
        try {
            const csrfToken = getCsrfToken();  // Obtener el token CSRF

            const response = await fetch(`${BASE_URL}/listas/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Incluir el token CSRF en el encabezado
                },
                body: JSON.stringify(nuevaLista),  // Enviar los datos de la lista, incluyendo 'orden'
                credentials: 'include',  // Incluir credenciales para manejar sesiones
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al crear la lista');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al crear lista:', error);
            return { error: error.message };
        }
    },
  // Método para obtener listas de un tablero
  getListas: async (idTablero) => {
    try {
      const response = await fetch(`${BASE_URL}/tableros/${idTablero}/listas/`, {
        method: 'GET',
        credentials: 'include',  // Enviar credenciales de sesión
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
  // Actualizar lista
  updateLista: async (idLista, data) => {
    try {
        const csrfToken = getCsrfToken();  // Obtener el token CSRF

        const response = await fetch(`${BASE_URL}/listas/${idLista}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',  // Enviar credenciales de sesión
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la lista');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar la lista:', error);
        throw error;
    }
},

// Eliminar lista
deleteLista: async (idLista) => {
    try {
        const csrfToken = getCsrfToken();
        const response = await fetch(`${BASE_URL}/listas/${idLista}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrfToken, // CSRF token si es necesario
            },
            credentials: 'include', // Enviar credenciales de sesión
        });

        // Si el código de estado es 204 (No Content), no intentes analizar JSON
        if (response.status === 204) {
            return { success: true };  // Devuelve un objeto indicando éxito
        }

        // En otros casos, analiza la respuesta como JSON
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al eliminar la lista');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar la lista:', error);
        return { error: error.message };
    }
},

   // Método para añadir una nueva tarea
   addTarea: async (nuevaTarea) => {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`${BASE_URL}/tareas/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',  // Enviar credenciales de sesión
            body: JSON.stringify(nuevaTarea),
        });

        if (!response.ok) {
            throw new Error('Error al añadir tarea');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al añadir tarea:', error);
        return { error: error.message };
    }
},

   // Método para editar tarea
   updateTarea: async (idTarea, data) => {
    try {
      const csrfToken = getCsrfToken();  // Si necesitas un token CSRF

      const response = await fetch(`${BASE_URL}/tareas/${idTarea}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,  // Incluye el CSRF si es necesario
        },
        body: JSON.stringify(data),
        credentials: 'include',  // Si estás utilizando sesiones
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      return { error: error.message };
    }
  },

  // Método para eliminar tarea
  deleteTarea: async (idTarea) => {
    try {
      const csrfToken = getCsrfToken();  // Si necesitas un token CSRF

      const response = await fetch(`${BASE_URL}/tareas/${idTarea}/`, {
        method: 'DELETE',
        headers: {
          'X-CSRFToken': csrfToken,  // Incluye el CSRF si es necesario
        },
        credentials: 'include',  // Si estás utilizando sesiones
      });

      if (response.status === 204) {
        return { success: true };  // Éxito al eliminar
      }

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      return { error: error.message };
    }
  },

    // Método para archivar una tarea
    archivarTarea: async (idTarea) => {
        try {
            const csrfToken = getCsrfToken(); // Obtener el CSRF token si es necesario
            const response = await fetch(`${BASE_URL}/tareas/${idTarea}/archivar/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Incluir el token CSRF si es necesario
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token de autenticación
                },
                credentials: 'include', // Enviar credenciales de sesión si estás usando autenticación basada en sesiones
            });
            if (!response.ok) {
                throw new Error('Error al archivar tarea');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al archivar la tarea:', error);
            throw error;
        }
    },


    desarchivarTarea: async (idTarea) => {
        try {
            const csrfToken = getCsrfToken();  // Obtener el token CSRF
            const response = await fetch(`${BASE_URL}/tareas/${idTarea}/desarchivar/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Enviar el token CSRF
                },
                credentials: 'include',  // Enviar credenciales de sesión
            });

            if (!response.ok) {
                throw new Error('Error al desarchivar la tarea');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al desarchivar la tarea:', error);
            throw error;
        }
    },


  // Obtener tareas por lista
getTareas: async (idLista) => {
    const response = await fetch(`/api/listas/${idLista}/tareas`, {
    method: 'GET',
    credentials: 'include',
    });
    return response.json();
},

};

export default ApiService;
