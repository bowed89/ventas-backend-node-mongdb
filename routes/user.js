var express = require('express');
var userController = require('../controllers/UserController');

var api = express.Router();

api.post('/registrar', userController.registrar);
api.post('/login', userController.login);


module.exports = api;