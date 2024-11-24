module.exports = (sequelize, Sequelize) => {
    const PedidoProducto = sequelize.define("pedido_producto", {
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precio: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });
    return PedidoProducto;
};
