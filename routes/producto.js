var express = require('express');
var productoController = require('../controllers/ProductoController');
//registrar img desde el formulario
var multipart = require('connect-multiparty');
var path = multipart({ uploadDir: './uploads/productos' });

var api = express.Router();

api.post('/producto/registrar', path, productoController.registrar);
api.get('/productos/:titulo?', productoController.listar);
api.put('/productos/editar/:id/:img', path, productoController.editar);
api.get('/producto/registro/:id', path, productoController.obtener_producto);
api.delete('/producto/:id', path, productoController.eliminar);
api.put('/producto/stock/:id', path, productoController.update_stock);
api.get('/producto/img/:img', path, productoController.get_img);


module.exports = api;