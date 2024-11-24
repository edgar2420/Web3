const db = require("../models");
const CarritoProducto = db.carrito_productos;

exports.listProductosEnCarrito = async (req, res) => {
    try {
        const productosEnCarrito = await CarritoProducto.findAll({
            where: { carritoId: req.params.carritoId },
            include: [{ model: db.productos, as: "producto" }],
        });
        res.status(200).json(productosEnCarrito);
    } catch (error) {
        res.status(500).json({ message: "Error al listar productos del carrito", error });
    }
};

exports.addProducto = async (req, res) => {
    try {
        const { carritoId, productoId, cantidad } = req.body;

        const productoEnCarrito = await CarritoProducto.create({
            carritoId,
            productoId,
            cantidad,
        });

        res.status(201).json(productoEnCarrito);
    } catch (error) {
        res.status(500).json({ message: "Error al añadir producto al carrito", error });
    }
};

exports.updateCantidadProducto = async (req, res) => {
    try {
        const { carritoId, productoId, cantidad } = req.body;

        const productoEnCarrito = await CarritoProducto.findOne({
            where: { carritoId, productoId },
        });

        if (!productoEnCarrito) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        await productoEnCarrito.update({ cantidad });
        res.status(200).json(productoEnCarrito);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la cantidad del producto", error });
    }
};

exports.deleteProducto = async (req, res) => {
    try {
        const { carritoId, productoId } = req.body;

        const rowsDeleted = await CarritoProducto.destroy({
            where: { carritoId, productoId },
        });

        if (!rowsDeleted) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        res.status(200).json({ message: "Producto eliminado del carrito correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto del carrito", error });
    }
};
