var Cliente = require('../models/cliente');

// *************************** 
//     REGISTRAR CLIENTE
// *************************** 

function registrar(req, res) {

    var params = req.body;
    var cliente = new Cliente();

    cliente.nombres = params.nombres;
    cliente.correo = params.correo;
    cliente.puntos = 10;

    cliente.save((err, clienteSave) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else if (clienteSave) {
            res.status(200).send({
                cliente: clienteSave,
                message: 'Cliente registrado con éxito'
            });
        } else {
            res.status(403).send({ message: 'No se registro el cliente' });
        }
    });

}

// *************************** 
//     EDITAR CLIENTE
// *************************** 

function editar(req, res) {

    var params = req.body;
    var id = req.params['id'];

    Cliente.findByIdAndUpdate(id, { nombres: params.nombres, correo: params.correo }, (err, cliEdit) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else if (cliEdit) {
            res.status(200).send({
                cliente: cliEdit,
                message: 'Cliente modificado con éxito'
            });
        } else {
            res.status(403).send({ message: 'No se modificó el cliente' });
        }
    });

}

// *************************** 
//     ELIMINAR CLIENTE
// *************************** 

function eliminar(req, res) {

    var params = req.body;
    var id = req.params['id'];

    Cliente.findByIdAndDelete(id, (err, cliEliminar) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else if (cliEliminar) {
            res.status(200).send({
                cliente: cliEliminar,
                message: 'Cliente eliminado con éxito'
            });
        } else {
            res.status(403).send({ message: 'No se pudo eliminar el cliente' });
        }
    });
}

module.exports = {

    registrar,
    editar,
    eliminar

};