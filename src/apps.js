import express from 'express';
import { Server } from "socket.io";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/view_routers.js";
import cartsRouter from "./routes/cartsRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import products_manager from './models/products_manager';


const port = 8080;
const app = express();

const httpServer = app.listen(port, () => {
 console.log(`Server listening on http://localhost:${port}`.green);
});


const socketServer = new Server(httpServer);


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use(express.static(__dirname + "/public"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

socketServer.on("connection", async socket => {
 const products = await products_manager.getProducts();

 socket.emit("realtimeproducts", products);

 socket.on("nuevoProducto", async data => {
  await products_manager.addProduct(data);

  const products = await products_manager.getProducts();

  socket.emit("realtimeproducts", products);
 });

 socket.on("deleteProduct", async data => {
  await products_manager.deleteProduct(data);

  const products = await products_manager.getProducts();

  socket.emit("realtimeproducts", products);
 });
});