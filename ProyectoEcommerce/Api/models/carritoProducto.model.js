module.exports = (sequelize, Sequelize) => {
    const CarritoProducto = sequelize.define("carrito_producto", {
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    });
    return CarritoProducto;
};
