const Express = require('express');
const bodyParser = require("body-parser");

// Crear una instancia de la aplicación Express
const app = Express();

// Rutas
app.use("/", require("./routes/routes"));

// Constantes locales
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log("Backend corriendo con exito en el servidor: " + process.env.PORT)
});