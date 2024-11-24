module.exports = app => {
    let router = require("express").Router();
    const carritoProductoController = require("../controllers/carritoProducto.controller.js");

    // Ruta para listar productos en un carrito
    router.get('/carritos/:carritoId/productos', carritoProductoController.listProductosEnCarrito);

    // Ruta para añadir un producto al carrito
    router.post('/carritos/productos', carritoProductoController.addProducto);

    // Ruta para actualizar la cantidad de un producto en el carrito
    router.put('/carritos/productos', carritoProductoController.updateCantidadProducto);

    // Ruta para eliminar un producto del carrito
    router.delete('/carritos/productos', carritoProductoController.deleteProducto);

    app.use('/api', router);
};
