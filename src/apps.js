const express = require('express');
const app = express();
const productsRoutes = require('../src/routes/productsRoutes');
const cartsRoutes = require('../src/routes/cartsRoutes');

app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));  // Esto sirve tu archivo index.html

// Configuración de las rutas de la API
app.use('/api/products', productsRoutes);  // Ruta para manejar productos
app.use('/api/carts', cartsRoutes);        // Ruta para manejar carritos

// Si no se encuentran otras rutas, se sirve el archivo index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '../public/index.html');
});

// Exportar la aplicación para usarla en index.js
module.exports = app;
