module.exports = app => {
    let router = require("express").Router();
    const usuarioController = require("../controllers/usuario.controller.js");

    // Ruta para obtener todos los usuarios
    router.get('/usuarios', usuarioController.listUsuarios);

    // Ruta para obtener un usuario por ID
    router.get('/usuarios/:id', usuarioController.getUsuarioById);

    // Ruta para crear un nuevo usuario
    router.post('/usuarios', usuarioController.createUsuario);

    // Ruta para actualizar un usuario
    router.put('/usuarios/:id', usuarioController.updateUsuario);

    // Ruta para el login
    router.post("/login", usuarioController.login);

    // Ruta para eliminar un usuario
    router.delete('/usuarios/:id', usuarioController.deleteUsuario);

    app.use('/api', router); // Asocia estas rutas al endpoint /api
};
