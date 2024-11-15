import { createBrowserRouter } from 'react-router-dom';
import GeneroForm from '../Pages/Genero/GeneroForm';
import AlbumForm from '../Pages/Album/AlbumForm';
import ArtistaForm from '../Pages/Artista/ArtistaForm';
import Dashboard from '../Pages/Dashboard';
import AlbumPage from '../Pages/Album/AlbumPage';
import AlbumDetail from '../Pages/Album/AlbumDetail';
import ArtistaPage from '../Pages/Artista/ArtistaPage';
import ArtistaDetail from '../Pages/Artista/ArtistaDetail';
import GeneroPage from '../Pages/Genero/GeneroPage';



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard/>
    },
    {
        path: '/albums',
        element: <AlbumPage/>
    },
    {
        path: '/generoform',
        element: <GeneroForm/>,
    },
    {
        path: '/albumform',
        element: <AlbumForm/>
    },
    {
        path: '/artistaform',
        element: <ArtistaForm/>
    },
    {
        path: '/album/:albumId',
        element: <AlbumDetail/>
    },
    {
        path: '/artists',
        element: <ArtistaPage/>
    },
    {
        path: '/artista/:artistaId',
        element: <ArtistaDetail/>
    },
    {
        path: '/genres',
        element: <GeneroPage/>
    }

]);