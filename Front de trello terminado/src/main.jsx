import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginForm from './pages/auth/Login.jsx';
import RegisterForm from './pages/auth/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Page404 from './pages/Page404.jsx';
import Lista from './pages/lista/Lista.jsx';
import Tarea from './pages/tarea/Tarea.jsx';
import './index.css';


const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegisterForm /> },
  { path: "/tableros/:idTablero/listas", element: <Lista /> },
  { path: "/listas/:idLista/tareas", element: <Tarea /> },
  { path: "*", element: <Page404 /> }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
