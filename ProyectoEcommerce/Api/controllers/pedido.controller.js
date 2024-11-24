const db = require("../models");
const Pedido = db.pedidos;

exports.listPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                { model: db.usuarios, as: "usuario" },
                { model: db.productos, as: "productos" },
            ],
        });
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Error al listar pedidos", error });
    }
};

exports.getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id, {
            include: [{ model: db.productos, as: "productos" }],
        });
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pedido", error });
    }
};

exports.createPedido = async (req, res) => {
    try {
        const { usuarioId, productos, total, estado } = req.body;

        const nuevoPedido = await Pedido.create({
            usuarioId,
            total,
            estado,
        });

        if (productos && productos.length) {
            await nuevoPedido.setProductos(productos);
        }

        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ message: "Error al crear pedido", error });
    }
};

exports.updatePedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        await pedido.update(req.body);
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar pedido", error });
    }
};

exports.deletePedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        await pedido.destroy();
        res.status(200).json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar pedido", error });
    }
};
