const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Rutas para productos
router.get('/', productsController.getAllProducts); // Obtener todos los productos
router.get('/:pid', productsController.getProductById); // Obtener producto por id
router.post('/', productsController.addProduct); // Agregar un nuevo producto
router.put('/:pid', productsController.updateProduct); // Actualizar un producto
router.delete('/:pid', productsController.deleteProduct); // Eliminar un producto

module.exports = router;

