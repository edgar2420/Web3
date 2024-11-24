module.exports = app => {
    let router = require("express").Router();
    const pedidoController = require("../controllers/pedido.controller.js");

    // Ruta para listar todos los pedidos
    router.get('/pedidos', pedidoController.listPedidos);

    // Ruta para obtener un pedido por ID
    router.get('/pedidos/:id', pedidoController.getPedidoById);

    // Ruta para crear un nuevo pedido
    router.post('/pedidos', pedidoController.createPedido);

    // Ruta para actualizar un pedido
    router.put('/pedidos/:id', pedidoController.updatePedido);

    // Ruta para eliminar un pedido
    router.delete('/pedidos/:id', pedidoController.deletePedido);

    app.use('/api', router);
};
