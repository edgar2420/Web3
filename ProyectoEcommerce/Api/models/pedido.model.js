module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define("pedido", {
        total: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        estado: {
            type: Sequelize.ENUM("pendiente", "pagado", "enviado", "completado"),
            defaultValue: "pendiente"
        }
    });
    return Pedido;
};
