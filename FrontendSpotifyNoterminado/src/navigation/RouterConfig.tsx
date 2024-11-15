import { createBrowserRouter } from 'react-router-dom';
import GeneroForm from '../Pages/Genero/GeneroForm';
import AlbumForm from '../Pages/Album/AlbumForm';
import ArtistaForm from '../Pages/Artista/ArtistaForm';


export const router = createBrowserRouter([
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
    }

]);