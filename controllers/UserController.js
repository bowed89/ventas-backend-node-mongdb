var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../helpers/jwt');

// *************************** 
//     LISTAR USUARIOs
// *************************** 
function listar(req, res) {

    User.find((err, usersData) => {
        if (err) {
            res.status(500).send({ error: 'Error en el servidor' });
        } else if (usersData) {
            res.status(200).send({
                usuarios: usersData,
                message: 'Listado de usuarios'
            });
        }

    });

}



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
                        res.status(500).send({ error: 'Error en el servidor' });
                    } else {
                        res.status(200).send({
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
            res.status(500).send({ message: 'Error en el servidor' });
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

// *************************** 
//     EDITAR USUARIO
// *************************** 

function editar(req, res) {

    var id = req.params['id'];
    var params = req.body;

    if (params.password) {

        bcrypt.hash(params.password, null, null, function(err, hash) {

            if (hash) {
                User.findByIdAndUpdate(id, { nombres: params.nombres, password: hash, email: params.email, role: params.role },
                    (err, userEdit) => {
                        if (err) {
                            res.status(500).send({ message: 'El usuario no se actualizó' });
                        } else if (userEdit) {
                            res.status(200).send({
                                user: userEdit,
                                message: 'El usuario se actualizó correctamente'
                            });
                        }
                    });
            }
        });
        // sino se manda la contraseña para editar entonces solo editara los demas campos y la contraseña se quedara como antes ...
    } else {
        User.findByIdAndUpdate(id, { nombres: params.nombres, email: params.email, role: params.role },
            (err, userEdit) => {
                if (err) {
                    res.status(500).send({ message: 'El usuario no se actualizó' });
                } else if (userEdit) {
                    res.status(200).send({
                        user: userEdit,
                        message: 'El usuario se actualizó correctamente'
                    });
                }
            });
    }
}

// ***************************** 
//     OBTENER USUARIO POR ID
// ***************************** 

function get_user(req, res) {

    var id = req.params['id'];

    User.findById(id, (err, userData) => {

        if (userData) {
            res.status(200).send({
                user: userData,
                message: 'Datos del usuario'
            });
        } else {
            res.status(403).send({ message: 'No se encontro ningun registro' });
        }

    });




}

module.exports = {
    registrar,
    login,
    listar,
    editar,
    get_user
};