const express = require('express');

const { grantAccess } = require('../middlewares/accessControl');

const router = express.Router();

// importar controladores
const profesoresController = require('../controllers/ProfesoresController');
const asignaturasController = require('../controllers/AsignaturasController');
const usuariosController = require('../controllers/UsuariosController');

// definir las rutas y el verbo rest por donde serán atendidas

module.exports = function() {
  // post: agregar profesor
  router.post('/profesores', grantAccess('createAny', 'profesor') , profesoresController.agregar);

  // get: leer los profesores
  router.get('/profesores', grantAccess('readAny', 'profesor'), profesoresController.listar);

  // leer profesor
  router.get('/profesores/:id', grantAccess('readAny', 'profesor'), profesoresController.mostrar);

  // actualizar profesor
  router.put('/profesores/:id', grantAccess('updateAny', 'profesor'), profesoresController.actualizar);

  router.delete('/profesores/:id', grantAccess('deleteAny', 'profesor'), profesoresController.eliminar);

  router.post('/asignaturas', grantAccess('createAny', 'asignatura'), asignaturasController.agregar);
  router.get('/asignaturas', grantAccess('readAny', 'asignatura'), asignaturasController.listar);

  // usuarios
  
  router.get('/usuarios', grantAccess('readAny', 'usuario'), usuariosController.listar);
  router.get('/usuarios/:id', grantAccess('readAny', 'usuario'), usuariosController.mostrar);

  router.get('/perfil', grantAccess('readOwn', 'perfil'), usuariosController.perfil);

  return router;
}