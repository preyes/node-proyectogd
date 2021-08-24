const express = require('express');
const router = express.Router();
const controlador = require('../controllers/controladores');

module.exports = function () {

  router.get('/', controlador.inicio);

  router.get('/nuevo-auto', controlador.formAutoGet);
  router.post('/nuevo-auto', controlador.nuevoAuto);
  router.get('/borrar/:id', controlador.borrarAuto);

  return router;




}