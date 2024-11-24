module.exports = app => {
require("./usuario.routes")(app);
require("./producto.routes")(app);
require("./categoria.routes")(app);
require("./carrito.routes")(app);
require("./carritoProducto.routes")(app);
require("./pago.routes")(app);
require("./pedido.routes")(app);
require("./pedidoProducto.routes")(app);
}