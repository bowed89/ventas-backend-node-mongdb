var express = require('express');
var ventaController = require('../controllers/VentaController');

var api = express.Router();

api.post('/venta/registrar', ventaController.registrar);
api.get('/venta/datos/:id', ventaController.datos_venta);
api.get('/ventas', ventaController.listado_venta);
api.get('/venta/:id', ventaController.detalle_venta);

module.exports = api;