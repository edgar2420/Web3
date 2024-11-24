const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
    }
);


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//modelos
db.usuarios = require("./usuario.model")(sequelize, Sequelize);
db.productos = require("./producto.model")(sequelize, Sequelize);
db.categorias = require("./categoria.model")(sequelize, Sequelize);
db.carritos = require("./carrito.model")(sequelize, Sequelize);
db.carrito_productos = require("./carritoProducto.model")(sequelize, Sequelize);
db.pedidos = require("./pedido.model")(sequelize, Sequelize);
db.pedido_productos = require("./PedidoProducto.model")(sequelize, Sequelize);
db.pagos = require("./pago.model")(sequelize, Sequelize);

// Relaciones entre Usuario y Carrito
db.usuarios.hasOne(db.carritos, { foreignKey: "usuarioId", onDelete: "CASCADE" });
db.carritos.belongsTo(db.usuarios, { foreignKey: "usuarioId" });

// Relaciones entre Carrito y Producto (tabla intermedia CarritoProducto)
db.carritos.belongsToMany(db.productos, {
    through: db.carrito_productos,
    foreignKey: "carritoId",
    otherKey: "productoId"
});
db.productos.belongsToMany(db.carritos, {
    through: db.carrito_productos,
    foreignKey: "productoId",
    otherKey: "carritoId"
});

// Relaciones entre Usuario y Pedido
db.usuarios.hasMany(db.pedidos, { foreignKey: "usuarioId", onDelete: "CASCADE" });
db.pedidos.belongsTo(db.usuarios, { foreignKey: "usuarioId" });

// Relaciones entre Pedido y Producto (tabla intermedia PedidoProducto)
db.pedidos.belongsToMany(db.productos, {
    through: db.pedido_productos,
    foreignKey: "pedidoId",
    otherKey: "productoId"
});
db.productos.belongsToMany(db.pedidos, {
    through: db.pedido_productos,
    foreignKey: "productoId",
    otherKey: "pedidoId"
});

// Relaciones entre Pedido y Pago
db.pedidos.hasOne(db.pagos, { foreignKey: "pedidoId", onDelete: "CASCADE" });
db.pagos.belongsTo(db.pedidos, { foreignKey: "pedidoId" });

// Relaciones entre Producto y Categoria
db.categorias.hasMany(db.productos, { foreignKey: "categoriaId", onDelete: "CASCADE" });
db.productos.belongsTo(db.categorias, { foreignKey: "categoriaId" });

module.exports = db;
