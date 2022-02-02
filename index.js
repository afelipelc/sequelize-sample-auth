const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('./middlewares/auth');

const routes = require('./routes');
const rutasNoProtegidas = require('./routes/rutasNoProtegidas');

// importar config a la bd
const db = require('./config/db');
   require('./models/Profesor');
   require('./models/Asignatura');
   require('./models/Usuario');

// se sincronize sequelize con la bd, sincronice los modelos del proyecto
db.sync({}) // { alter: true })
  .then(() => {
    console.log("BD conectada");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// rutas no protegidas
app.use('/', rutasNoProtegidas());

// rutas protegidas
app.use('/', passport.authenticate('jwt', { session: false }), routes());

// correr el servidor en el puerto ??? 5000  5 mil
app.listen(5000);
