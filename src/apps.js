const express = require('express');
const app = express();
const productsRoutes = require('./routes/productsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');

// Middleware para parsear el body como JSON
app.use(express.json());

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Puerto de escucha
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor esta escuchando en el ${PORT}`);
});
