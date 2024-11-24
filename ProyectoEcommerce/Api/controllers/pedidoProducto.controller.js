const db = require("../models");
const PedidoProducto = db.pedido_productos;

exports.listProductosEnPedido = async (req, res) => {
    try {
        const productosEnPedido = await PedidoProducto.findAll({
            where: { pedidoId: req.params.pedidoId },
            include: [{ model: db.productos, as: "producto" }],
        });
        res.status(200).json(productosEnPedido);
    } catch (error) {
        res.status(500).json({ message: "Error al listar productos del pedido", error });
    }
};

exports.addProducto = async (req, res) => {
    try {
        const { pedidoId, productoId, cantidad, precio } = req.body;

        const productoEnPedido = await PedidoProducto.create({
            pedidoId,
            productoId,
            cantidad,
            precio,
        });

        res.status(201).json(productoEnPedido);
    } catch (error) {
        res.status(500).json({ message: "Error al añadir producto al pedido", error });
    }
};
