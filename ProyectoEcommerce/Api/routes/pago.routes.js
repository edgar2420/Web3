module.exports = app => {
    let router = require("express").Router();
    const pagoController = require("../controllers/pago.controller.js");

    // Ruta para listar todos los pagos
    router.get('/pagos', pagoController.listPagos);

    // Ruta para obtener un pago por ID
    router.get('/pagos/:id', pagoController.getPagoById);

    // Ruta para crear un nuevo pago
    router.post('/pagos', pagoController.createPago);

    // Ruta para actualizar un pago
    router.put('/pagos/:id', pagoController.updatePago);

    // Ruta para eliminar un pago
    router.delete('/pagos/:id', pagoController.deletePago);

    app.use('/api', router);
};
