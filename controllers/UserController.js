var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../helpers/jwt');

// *************************** 
//     REGISTRAR USUARIO
// *************************** 

function registrar(req, res) {

    var params = req.body;
    var user = new User();

    if (params.password) {

        bcrypt.hash(params.password, null, null, function(err, hash) {

            if (hash) {
                user.password = hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.email = params.email;
                user.role = params.role;

                user.save((err, user) => {

                    if (err) {
                        res.status(500).send({ error: 'Error en el servidor Usuario/Registrar' });
                    } else {
                        res.status(403).send({
                            user: user,
                            message: 'Usuario registrado'
                        });
                    }
                });
            }
        });

    } else {
        res.status(403).send({ message: 'No ingreso la contraseña' });
    }

}

// *************************** 
//           LOGIN
// *************************** 

function login(req, res) {

    var params = req.body;

    User.findOne({ email: params.email }, (err, user) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor Usuario/Login' });
        } else {
            if (user) {
                bcrypt.compare(params.password, user.password, function(err, check) {
                    if (check) {
                        if (params.gettoken) {
                            res.status(200).send({
                                user: user,
                                jwt: jwt.createtoken(user)
                            });
                        } else {
                            res.status(200).send({
                                user: user,
                                message: 'No hay Token',
                                jwt: jwt.createtoken(user)
                            });
                        }
                    } else {
                        res.status(403).send({ message: 'Contraseña incorrecta' });
                    }
                });

            } else {
                res.status(403).send({ message: 'El correo no existe' });
            }
        }
    });

}

module.exports = {
    registrar,
    login,
};