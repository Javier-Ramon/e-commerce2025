const fs = require('fs');
const path = require('path');
const productosFilePath = path.join(__dirname, '../../data/products.json');


function readProducts() {
  const data = fs.readFileSync(productosFilePath, 'utf-8');
  return JSON.parse(data);
}


function writeProducts(products) {
  fs.writeFileSync(productosFilePath, JSON.stringify(products, null, 2));
}


function getAllProducts(req, res) {
  const limit = parseInt(req.query.limit) || null;
  let products = readProducts();
  
  if (limit) {
    products = products.slice(0, limit);
  }

  res.json(products);
}


function getProductById(req, res) {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.pid);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
}


function addProduct(req, res) {
  const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
  const products = readProducts();

  const newProduct = {
    id: (products.length > 0 ? products[products.length - 1].id + 1 : 1),
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
}


function updateProduct(req, res) {
  const { pid } = req.params;
  const updatedData = req.body;

  const products = readProducts();
  const productIndex = products.findIndex(p => p.id === parseInt(pid));

  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...updatedData };
    products[productIndex] = updatedProduct;
    writeProducts(products);

    res.json(updatedProduct);
  } else {
    res.status(404).send('Producto no encontrado');
  }
}


function deleteProduct(req, res) {
  const { pid } = req.params;
  let products = readProducts();

  products = products.filter(p => p.id !== parseInt(pid));
  writeProducts(products);

  res.status(204).send();
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

