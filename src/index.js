
const app = require('./apps');
const cartsRoutes = require('./routes/cartsRoutes');  


app.use(express.json());


app.use('/api/carts', cartsRoutes);

const port = 8080;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
