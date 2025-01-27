const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

// Rutas para carritos
router.post('/', cartsController.createCart); // Crear un carrito
router.get('/:cid', cartsController.getCart); // Obtener carrito por id
router.post('/:cid/product/:pid', cartsController.addProductToCart); // Agregar producto a carrito
router.post('/', (req, res) => {
    // Lógica para crear un carrito
    res.status(201).json({ message: 'Carrito creado exitosamente' });
});

module.exports = router;
