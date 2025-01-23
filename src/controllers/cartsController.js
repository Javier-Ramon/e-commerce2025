const fs = require('fs');
const path = require('path');

// Ruta de archivo de carritos
const cartsFilePath = path.join(__dirname, '../../data/carts.json');

// Leer los carritos desde el archivo
const readCarts = () => {
  const data = fs.readFileSync(cartsFilePath, 'utf-8');
  return JSON.parse(data);
};

// Guardar carritos en el archivo
const saveCarts = (carts) => {
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

// Controlador para crear un nuevo carrito
const createCart = (req, res) => {
  const newCart = {
    id: Date.now().toString(),
    products: [],
  };

  const carts = readCarts();
  carts.push(newCart);
  saveCarts(carts);

  res.status(201).json(newCart);
};

// Controlador para obtener los productos de un carrito
const getCartById = (req, res) => {
  const { cid } = req.params;
  const carts = readCarts();

  const cart = carts.find(c => c.id === cid);
  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  res.json(cart);
};

// Controlador para agregar un producto al carrito
const addProductToCart = (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const carts = readCarts();
  const cart = carts.find(c => c.id === cid);
  
  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  let productInCart = cart.products.find(p => p.product === pid);

  if (productInCart) {
    productInCart.quantity += quantity || 1; // Incrementar la cantidad
  } else {
    cart.products.push({ product: pid, quantity: quantity || 1 });
  }

  saveCarts(carts);
  res.json(cart);
};

module.exports = { createCart, getCartById, addProductToCart };
