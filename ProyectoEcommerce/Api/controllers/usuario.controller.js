const db = require("../models");
const Usuario = db.usuarios;
const bcrypt = require("bcrypt");

exports.listUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ["password"] },
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al listar usuarios", error });
    }
};


exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            attributes: { exclude: ["password"] },
        });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuario", error });
    }
};

exports.createUsuario = async (req, res) => {
    try {
    const { nombre, email, password, tipoUsuario } = req.body;

      // Validar que todos los campos estén presentes
    if (!nombre || !email || !password || !tipoUsuario) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

      // Normalizar tipoUsuario
    const normalizedTipoUsuario = tipoUsuario.toLowerCase();

      // Validar que tipoUsuario tenga un valor válido
    if (!["comprador", "vendedor", "ambos"].includes(normalizedTipoUsuario)) {
        return res.status(400).json({ message: "Tipo de usuario no válido" });
    }

      // Validar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Correo electrónico no válido" });
    }

      // Validar la longitud de la contraseña
    if (password.length < 8) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
    }

      // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        tipoUsuario: normalizedTipoUsuario,
    });

      // Excluir la contraseña de la respuesta
    const { password: _, ...usuarioSinPassword } = nuevoUsuario.toJSON();

    res.status(201).json({
        message: "Usuario creado con éxito",
        usuario: { ...usuarioSinPassword, tipoUsuario: normalizedTipoUsuario },
    });
    } catch (error) {
    console.error("Error al crear usuario:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: "El correo ya está en uso" });
    }
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
};



exports.updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const { nombre, email, password, tipoUsuario } = req.body;

        // Validar tipoUsuario si se proporciona
        if (tipoUsuario && !["comprador", "vendedor", "ambos"].includes(tipoUsuario)) {
            return res.status(400).json({ message: "Tipo de usuario no válido" });
        }

        // Hashear la contraseña si se proporciona una nueva
        let updatedData = { nombre, email, tipoUsuario };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }

        // Actualizar el usuario
        await usuario.update(updatedData);

        // Excluir la contraseña de la respuesta
        const { password: _, ...usuarioSinPassword } = usuario.toJSON();

        res.status(200).json({ message: "Usuario actualizado con éxito", usuario: usuarioSinPassword });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error });
    }
};


exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await usuario.destroy();
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por correo
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Excluir contraseña de la respuesta
        const { password: _, ...usuarioSinPassword } = usuario.toJSON();

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            usuario: usuarioSinPassword,
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};
