module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario",{
        nombre:{
            type: Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        esAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        tipoUsuario: {
            type: Sequelize.ENUM("comprador", "vendedor", "ambos"),
            allowNull: false,
        },
    });
    return Usuario;
};