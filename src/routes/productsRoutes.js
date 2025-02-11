// Importamos el objeto Router desde express. y los controladores de productos.
import { Router } from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productsController";

// Ejecutamos la función Router para obtener un objeto Router.
const productsRouter = Router();

// Rutas para productos
productsRouter.get("/", getAllProducts);
productsRouter.get("/:pid", getProductById);
productsRouter.post("/", addProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", deleteProduct);

// Exportamos el router.
export default productsRouter;

