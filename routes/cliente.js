var express = require('express');
var clienteController = require('../controllers/ClienteController');

var api = express.Router();

api.post('/cliente', clienteController.registrar);
api.put('/cliente/editar/:id', clienteController.editar);
api.delete('/cliente/eliminar/:id', clienteController.eliminar);



module.exports = api;