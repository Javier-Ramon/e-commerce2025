import { Router } from "express";
import products_manager from "../models/products_manager";

const viewsRouter = Router();

// Ruta para renderizar la vista de Handlebars en al raíz
viewsRouter.get("/", async (req, res) => {
 const products = await products_manager.getProducts();

 res.render("home", { title: "Home", products });
});

viewsRouter.get("/realtimeproducts", (req, res) => {
 res.render("realtimeproducts", { title: "Real Time Products" });
});

export default viewsRouter;