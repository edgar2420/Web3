import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginForm from './pages/auth/Login.jsx';
import RegisterForm from './pages/auth/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';  // Para la página principal de tableros
import Page404 from './pages/Page404.jsx';
import Lista from './pages/lista/Lista.jsx';  // Para mostrar listas en un tablero
import Tarea from './pages/tarea/Tarea.jsx';  // Para mostrar tareas en una lista
import './index.css';

// Definimos las rutas usando createBrowserRouter
const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegisterForm /> },
  { path: "/tableros/:idTablero/listas", element: <Lista /> },
  { path: "/listas/:idLista/tareas", element: <Tarea /> },
  { path: "*", element: <Page404 /> }
]);

// Crear la raíz y renderizar el Router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
