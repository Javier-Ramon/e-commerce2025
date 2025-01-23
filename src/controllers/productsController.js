const fs = require('fs');
const path = require('path');

// Ruta de archivo de productos
const productsFilePath = path.join(__dirname, '../../data/products.json');

// Leer los productos desde el archivo
const readProducts = () => {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
};

// Guardar productos en el archivo
const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// Controlador para obtener todos los productos
const getProducts = (req, res) => {
  const products = readProducts();
  const { limit } = req.query;

  // Si existe un límite, solo devolver los productos solicitados
  const result = limit ? products.slice(0, Number(limit)) : products;
  res.json(result);
};

// Controlador para obtener un producto por ID
const getProductById = (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.pid);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};

// Controlador para agregar un nuevo producto
const createProduct = (req, res) => {
  const { title, description, code, price, stock, category, thumbnails = [] } = req.body;
  
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const products = readProducts();
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1, // Autogenerar ID
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails,
  };

  products.push(newProduct);
  saveProducts(products);

  res.status(201).json(newProduct);
};

// Controlador para actualizar un producto
const updateProduct = (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  const products = readProducts();
  const productIndex = products.findIndex(p => p.id === parseInt(pid));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const updatedProduct = {
    ...products[productIndex],
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  };

  products[productIndex] = updatedProduct;
  saveProducts(products);

  res.json(updatedProduct);
};

// Controlador para eliminar un producto
const deleteProduct = (req, res) => {
  const { pid } = req.params;
  let products = readProducts();
  
  const productIndex = products.findIndex(p => p.id === parseInt(pid));
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  products = products.filter(p => p.id !== parseInt(pid));
  saveProducts(products);

  res.status(204).end();
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
