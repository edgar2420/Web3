module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categoria", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Categoria;
};
