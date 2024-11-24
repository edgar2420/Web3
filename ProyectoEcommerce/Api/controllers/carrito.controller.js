const db = require("../models");
const Carrito = db.carritos;

exports.getCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({
            where: { usuarioId: req.params.usuarioId },
            include: [{ model: db.productos, as: "productos" }],
        });
        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener carrito", error });
    }
};

exports.addProductoToCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({ where: { usuarioId: req.params.usuarioId } });
        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        await carrito.addProducto(req.body.productoId, { through: { cantidad: req.body.cantidad } });
        res.status(200).json({ message: "Producto añadido al carrito" });
    } catch (error) {
        res.status(500).json({ message: "Error al añadir producto al carrito", error });
    }
};
