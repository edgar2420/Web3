module.exports = app => {
    let router = require("express").Router();
    const productoController = require("../controllers/producto.controller.js");

    // Ruta para obtener todos los productos
    router.get('/productos', productoController.listProductos);

    // Ruta para obtener un producto por ID
    router.get('/productos/:id', productoController.getProductoById);

    // Ruta para crear un nuevo producto
    router.post('/productos', productoController.createProducto);

    // Ruta para actualizar un producto
    router.put('/productos/:id', productoController.updateProducto);

    // Ruta para eliminar un producto
    router.delete('/productos/:id', productoController.deleteProducto);

    app.use('/api', router);
};
