module.exports = app => {
    let router = require("express").Router();
    const pedidoProductoController = require("../controllers/pedidoProducto.controller.js");

    // Ruta para listar productos en un pedido
    router.get('/pedidos/:pedidoId/productos', pedidoProductoController.listProductosEnPedido);

    // Ruta para añadir un producto al pedido
    router.post('/pedidos/productos', pedidoProductoController.addProducto);

    app.use('/api', router);
};
