// Importar la configuración de Express desde app.js
const app = require('./apps');
const cartsRoutes = require('./routes/cartsRoutes');  // Asegúrate de que la ruta sea correcta

// Middleware para leer JSON en el body
app.use(express.json());

// Usamos las rutas de carritos
app.use('/api/carts', cartsRoutes);

// Definir el puerto donde escuchará el servidor (en este caso, el puerto 8080)
const port = 8080;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
