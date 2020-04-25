var express = require('express');
var ventaController = require('../controllers/VentaController');

var api = express.Router();

api.post('/venta/registrar', ventaController.registrar);
api.get('/venta/datos/:id', ventaController.datos_venta);

module.exports = api;