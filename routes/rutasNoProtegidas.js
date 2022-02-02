const express = require('express');

const router = express.Router();

const sesionController = require('../controllers/SesionController');
const usuariosController = require('../controllers/UsuariosController');
const passwordController = require('../controllers/PasswordController');

module.exports = function() {
  // rutas que no requieren autenticacion
  router.post('/login', sesionController.login);
  router.post('/usuarios', usuariosController.agregar);
  router.post('/recuperar-password', passwordController.resetearPassword);
  router.post('/validar-token', passwordController.validarToken);
  router.post('/actualizar-password', passwordController.guardarNuevoPassword);

  return router;
};
