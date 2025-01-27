const fs = require('fs');
const path = require('path');
const carritoFilePath = path.join(__dirname, '../../data/carrito.json');
const productosFilePath = path.join(__dirname, '../../data/products.json');

// Leer carritos desde el archivo
function readCarts() {
  const data = fs.readFileSync(carritoFilePath, 'utf-8');
  return JSON.parse(data);
}

// Escribir carritos al archivo
function writeCarts(carts) {
  fs.writeFileSync(carritoFilePath, JSON.stringify(carts, null, 2));
}

// Crear un nuevo carrito
function createCart(req, res) {
  const carts = readCarts();
  const newCart = {
    id: (carts.length > 0 ? carts[carts.length - 1].id + 1 : 1),
    products: []
  };

  carts.push(newCart);
  writeCarts(carts);

  res.status(201).json(newCart);
}

// Obtener productos en el carrito
function getCart(req, res) {
  const { cid } = req.params;
  const carts = readCarts();
  const cart = carts.find(c => c.id === parseInt(cid));

  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).send('Carrito no encontrado');
  }
}

// Agregar un producto al carrito
function addProductToCart(req, res) {
  const { cid, pid } = req.params;
  const carts = readCarts();
  const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

  const cart = carts.find(c => c.id === parseInt(cid));
  const product = products.find(p => p.id === parseInt(pid));

  if (cart && product) {
    const existingProduct = cart.products.find(p => p.product === pid);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    writeCarts(carts);
    res.json(cart);
  } else {
    res.status(404).send('Carrito o producto no encontrado');
  }
}

module.exports = {
  createCart,
  getCart,
  addProductToCart,
};
