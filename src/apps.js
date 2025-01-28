const express = require('express');
const app = express();
const productsRoutes = require('../src/routes/productsRoutes');
const cartsRoutes = require('../src/routes/cartsRoutes');

app.use(express.json());


app.use(express.static('public'));


app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
