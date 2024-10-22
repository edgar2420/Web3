import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Registrer';
import CrearPelicula from '../pages/peliculas/CrearPelicula';
import DetallePelicula from '../pages/peliculas/DetallePelicula';
import EditarPelicula from '../pages/peliculas/EditarPelicula';
import EliminarPelicula from '../pages/peliculas/EliminarPelicula';
import ListaPelicula from '../pages/peliculas/ListaPelicula';
import DetalleReparto from '../pages/reparto/DetallePersona';
import EditarReparto from '../pages/reparto/EditarPersona';
import EliminarReparto from '../pages/reparto/EliminarPersona';
import ListaReparto from '../pages/reparto/ListaPersonas';
import CrearPersona from '../pages/reparto/CrearPersona';

// Configurar todas las rutas de la aplicación
export const router = createBrowserRouter([
  {
    path: '/',
    element: <ListaPelicula />,  // Página principal que lista todas las películas
  },
  {
    path: '/peliculas/create',
    element: <CrearPelicula />,  // Página para crear una nueva película
  },
  {
    path: '/peliculas/:id',
    element: <DetallePelicula />,  // Página para mostrar detalles de una película específica
  },
  {
    path: '/peliculas/:id/edit',
    element: <EditarPelicula />,  // Página para editar una película
  },
  {
    path: '/peliculas/:id/delete',
    element: <EliminarPelicula />,  // Página para eliminar una película
  },
  {
    path: '/login',
    element: <Login />,  // Página de login
  },
  {
    path: '/register',
    element: <Register />,  // Página de registro
  },
  {
    path: '/personas',
    element: <ListaReparto />,  // Lista todos los repartos
  },
  {
    path: '/persona/create',
    element: <CrearPersona />,  // Crear un nuevo reparto
  },
  {
    path: '/persona/:id',
    element: <DetalleReparto />,  // Detalle de un reparto específico
  },
  {
    path: '/persona/:id/edit',
    element: <EditarReparto />,  // Editar un reparto existente
  },
  {
    path: '/persona/:id/delete',
    element: <EliminarReparto />,  // Eliminar un reparto específico
  },
]);

