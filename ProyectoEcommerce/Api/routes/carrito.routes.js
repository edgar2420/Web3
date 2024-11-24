module.exports = app => {
    let router = require("express").Router();
    const carritoController = require("../controllers/carrito.controller.js");

    // Ruta para obtener el carrito de un usuario
    router.get('/carritos/:usuarioId', carritoController.getCarrito);

    // Ruta para añadir un producto al carrito
    router.post('/carritos/:usuarioId/productos', carritoController.addProductoToCarrito);

    app.use('/api', router);
};
