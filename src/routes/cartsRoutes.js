const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');


router.post('/', cartsController.createCart);
router.get('/:cid', cartsController.getCart); 
router.post('/:cid/product/:pid', cartsController.addProductToCart); 
router.post('/', (req, res) => {

    const carrito = {
        id: new Date().getTime(), 
        products: req.body.products || [] 
    };

    res.status(201).json({
        message: 'Carrito creado exitosamente',
        carrito: carrito
    });
});

module.exports = router;
