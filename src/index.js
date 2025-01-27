// Importar la configuración de Express desde app.js
const app = require('./apps');

// Definir el puerto donde escuchará el servidor (en este caso, el puerto 8080)
const port = 8080;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
