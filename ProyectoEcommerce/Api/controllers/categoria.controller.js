const db = require("../models");
const Categoria = db.categorias;

exports.listCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: "Error al listar categorías", error });
    }
};

exports.getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener categoría", error });
    }
};

exports.createCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ message: "El campo 'nombre' es obligatorio." });
        }

        const nuevaCategoria = await Categoria.create({ nombre });
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        console.error("Error al crear categoría:", error);
        res.status(500).json({ message: "Error al crear categoría", error });
    }
};


exports.updateCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        await categoria.update(req.body);
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar categoría", error });
    }
};

exports.deleteCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        await categoria.destroy();
        res.status(200).json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar categoría", error });
    }
};
