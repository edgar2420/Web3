import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom'; // Importamos RouterProvider para manejar las rutas
import { ThemeProvider } from 'styled-components'; // Si usas ThemeProvider para estilos globales
import { router } from './navigation/RouterConfig'; // Importar el router configurado

// Definir un tema global (si estás usando styled-components o similar)
const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    success: "#28a745",
    danger: "#dc3545",
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />  {/* Usamos el RouterProvider con el router importado */}
    </ThemeProvider>
  </StrictMode>,
);
