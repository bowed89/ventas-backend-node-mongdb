var Categoria = require('../models/categoria');


// *************************** 
//     REGISTRAR CATEGORIA
// *************************** 

function registrar(req, res) {

    var params = req.body;

    var categoria = new Categoria();
    categoria.titulo = params.titulo;
    categoria.descripcion = params.descripcion;

    categoria.save((err, categoriaSave) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor Categoria/Registrar' });
        } else if (categoriaSave) {
            res.status(200).send({ categoria: categoriaSave });
        } else {
            res.status(403).send({ message: 'La categoria no se pudo registrar' });
        }

    });
}

// *******************************
//     OBTENER CATEGORIA POR ID
// ******************************* 

function obtener_categoria(req, res) {

    var id = req.params['id'];

    Categoria.findById({ _id: id }, (err, categoriaId) => {

        if (err) {
            res.status(500).send({ message: 'Error en el seridor Categoria/ObtenerId' });
        } else if (categoriaId) {
            res.status(200).send({ categoria: categoriaId });
        } else {
            res.status(403).send({ message: 'La categoría no existe' });
        }

    });
}

// *******************************
//     EDITAR CATEGORIA POR ID
// ******************************* 

function editar(req, res) {

    var id = req.params['id'];
    var params = req.body;

    Categoria.findByIdAndUpdate({ _id: id }, { titulo: params.titulo, descripcion: params.descripcion }, (err, categoriaEdit) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor Categoria/CategoriaEdit' });
        } else if (categoriaEdit) {
            res.status(200).send({
                categoria: categoriaEdit,
                message: 'Categoria editada con éxito'
            });
        } else {
            res.status(403).send({ message: 'La categoria no se pudo actualizar' });
        }


    });

}

// *******************************
//     ELIMINAR CATEGORIA POR ID
// ******************************* 
function eliminar(req, res) {

    var id = req.params['id'];

    Categoria.findByIdAndRemove({ _id: id }, (err, catEliminar) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor Categoria/Categoriaeliminar' });
        } else if (catEliminar) {
            res.status(200).send({
                categoria: catEliminar,
                message: 'Categoria eliminada con éxito'
            });
        } else {
            res.status(403).send({ message: 'La categoria no se pudo eliminar' });
        }
    });

}

// ***********************************************
//     LISTAR CATEGORIA POR 'TITULO' O LISTAR TODO
// ***********************************************

function listar(req, res) {

    var nombre = req.params['nombre'];

    Categoria.find({ titulo: new RegExp(nombre, 'i') }, (err, catListado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor Categoria/Listado' });
        } else if (catListado) {
            res.status(200).send({
                categorias: catListado,
                message: 'Categoria listado por título'
            });
        } else {
            res.status(403).send({ message: 'No existen registros con ese título' });
        }
    });
}

module.exports = {
    registrar,
    obtener_categoria,
    editar,
    eliminar,
    listar
};