const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

// Rutas para carritos
router.post('/', cartsController.createCart); // Crear un carrito
router.get('/:cid', cartsController.getCart); // Obtener carrito por id
router.post('/:cid/product/:pid', cartsController.addProductToCart); // Agregar producto a carrito
router.post('/', (req, res) => {
    // Lógica para crear un carrito (en este caso solo estamos respondiendo con un mensaje)
    const carrito = {
        id: new Date().getTime(), // Este es un ejemplo de cómo generar un ID único
        products: req.body.products || [] // Los productos vienen en el body de la solicitud
    };

    res.status(201).json({
        message: 'Carrito creado exitosamente',
        carrito: carrito
    });
});

module.exports = router;
