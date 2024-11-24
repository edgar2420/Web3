const db = require("../models");
const Producto = db.productos;

exports.listProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al listar productos", error });
    }
};

exports.getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto", error });
    }
};

// Crear un producto con la opción de subir imagen
exports.createProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;

        // Validar que los campos obligatorios están presentes
        if (!nombre || !precio) {
            return res.status(400).json({
                message: "El nombre y el precio son campos obligatorios"
            });
        }

        // Verificar si se subió una imagen
        const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;

        // Crear el producto
        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            stock: stock || 0,
            imagenUrl,
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({
            message: "Error al crear producto",
            error: error.errors || error.message
        });
    }
  };

exports.updateProducto = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        await producto.update(req.body);
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
};

exports.deleteProducto = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        await producto.destroy();
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};
