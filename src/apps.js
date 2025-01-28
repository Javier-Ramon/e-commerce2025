const express = require('express');
const app = express();
const productsRoutes = require('../src/routes/productsRoutes');
const cartsRoutes = require('../src/routes/cartsRoutes');

app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Configuración de las rutas de la API
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Configuración para que el servidor escuche en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
