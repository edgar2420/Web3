import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:3000/api';


const handleError = (error) => {
  console.error("API call failed: ", error.response?.data || error.message);
  throw error;
};


export const ApiService = {
  // **Usuarios**
  getUsuarios: async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getUsuarioById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  createUsuario: async (usuarioData) => {
    try {
      const response = await axios.post(`${API_URL}/usuarios`, usuarioData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  updateUsuario: async (id, usuarioData) => {
    try {
      const response = await axios.put(`${API_URL}/usuarios/${id}`, usuarioData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  deleteUsuario: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/usuarios/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
    // **Login**
    login: async (loginData) => {
      try {
        const response = await axios.post(`${API_URL}/login`, loginData);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },

  // **Productos**
  getProductos: async () => {
    try {
      const response = await axios.get(`${API_URL}/productos`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getProductoById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/productos/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  createProducto: async (productoData) => {
    try {
      const response = await axios.post(`${API_URL}/productos`, productoData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  updateProducto: async (id, productoData) => {
    try {
      const response = await axios.put(`${API_URL}/productos/${id}`, productoData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  deleteProducto: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/productos/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // **Categorías**
  getCategorias: async () => {
    try {
      const response = await axios.get(`${API_URL}/categorias`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getCategoriaById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/categorias/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  createCategoria: async (categoriaData) => {
    try {
      const response = await axios.post(`${API_URL}/categorias`, categoriaData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  updateCategoria: async (id, categoriaData) => {
    try {
      const response = await axios.put(`${API_URL}/categorias/${id}`, categoriaData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  deleteCategoria: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/categorias/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // **Carritos**
  getCarritoByUsuarioId: async (usuarioId) => {
    try {
      const response = await axios.get(`${API_URL}/carritos/${usuarioId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  addProductoToCarrito: async (usuarioId, productoData) => {
    try {
      const response = await axios.post(`${API_URL}/carritos/${usuarioId}/productos`, productoData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // **Pagos**
  getPagos: async () => {
    try {
      const response = await axios.get(`${API_URL}/pagos`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getPagoById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/pagos/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  createPago: async (pagoData) => {
    try {
      const response = await axios.post(`${API_URL}/pagos`, pagoData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // **Pedidos**
  getPedidos: async () => {
    try {
      const response = await axios.get(`${API_URL}/pedidos`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getPedidoById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/pedidos/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  createPedido: async (pedidoData) => {
    try {
      const response = await axios.post(`${API_URL}/pedidos`, pedidoData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // **Productos en Pedidos**
  getProductosEnPedido: async (pedidoId) => {
    try {
      const response = await axios.get(`${API_URL}/pedidos/${pedidoId}/productos`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  addProductoToPedido: async (pedidoData) => {
    try {
      const response = await axios.post(`${API_URL}/pedidos/productos`, pedidoData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};
