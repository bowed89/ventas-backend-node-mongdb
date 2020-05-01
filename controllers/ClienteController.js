var Cliente = require('../models/cliente');

// *************************** 
//     LISTAR CLIENTES
// *************************** 

function listar(req, res) {

    Cliente.find((err, clienteListar) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else if (clienteListar) {
            res.status(200).send({
                clientes: clienteListar,
                message: 'Listado de clientes'
            });
        } else {
            res.status(403).send({ message: 'No existen clientes' });
        }
    });
}

// ******************************
//     OBTENER CLIENTE POR ID
// ******************************

function get_cliente(req, res) {

    var id = req.params['id'];

    Cliente.findById(id, (err, clienteData) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else if (clienteData) {
            res.status(200).send({
                cliente: clienteData,
                message: 'Registro de cliente por ID'
            });
        } else {
            res.status(403).send({ message: 'no existe el cliente con el ID' });

        }
    });
}



// *************************** 
//     REGISTRAR CLIENTE
// *************************** 

function registrar(req, res) {

    var params = req.body;
    var cliente = new Cliente();

    cliente.nombres = params.nombres;
    cliente.correo = params.correo;
    cliente.dni = params.dni;
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

    Cliente.findByIdAndUpdate(id, { nombres: params.nombres, dni: params.dni, correo: params.correo }, (err, cliEdit) => {
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
    eliminar,
    listar,
    get_cliente

};