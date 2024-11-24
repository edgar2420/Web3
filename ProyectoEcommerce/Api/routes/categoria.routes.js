module.exports = app => {
    let router = require("express").Router();
    const categoriaController = require("../controllers/categoria.controller.js");

    // Ruta para obtener todas las categorías
    router.get('/categorias', categoriaController.listCategorias);

    // Ruta para obtener una categoría por ID
    router.get('/categorias/:id', categoriaController.getCategoriaById);

    // Ruta para crear una nueva categoría
    router.post('/categorias', categoriaController.createCategoria);

    // Ruta para actualizar una categoría
    router.put('/categorias/:id', categoriaController.updateCategoria);

    // Ruta para eliminar una categoría
    router.delete('/categorias/:id', categoriaController.deleteCategoria);

    app.use('/api', router);
};
