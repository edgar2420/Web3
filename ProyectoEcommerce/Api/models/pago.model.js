module.exports = (sequelize, Sequelize) => {
    const Pago = sequelize.define("pago", {
        metodoPago: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estado: {
            type: Sequelize.ENUM("exitoso", "fallido"),
            defaultValue: "exitoso"
        },
        transaccionId: {
            type: Sequelize.STRING,
        }
    });
    return Pago;
};
