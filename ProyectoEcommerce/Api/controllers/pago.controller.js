const db = require("../models");
const Pago = db.pagos;

exports.listPagos = async (req, res) => {
    try {
        const pagos = await Pago.findAll();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ message: "Error al listar pagos", error });
    }
};

exports.getPagoById = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pago", error });
    }
};

exports.createPago = async (req, res) => {
    try {
        const { pedidoId, metodoPago, estado, transaccionId } = req.body;

        const nuevoPago = await Pago.create({
            pedidoId,
            metodoPago,
            estado,
            transaccionId,
        });

        res.status(201).json(nuevoPago);
    } catch (error) {
        res.status(500).json({ message: "Error al registrar pago", error });
    }
};

exports.updatePago = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        await pago.update(req.body);
        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar pago", error });
    }
};

exports.deletePago = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        await pago.destroy();
        res.status(200).json({ message: "Pago eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar pago", error });
    }
};
