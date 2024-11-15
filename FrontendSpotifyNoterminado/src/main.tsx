import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './index.css'
import { router } from './navigation/RouterConfig';

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
        <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
