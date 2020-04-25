var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');

// *************************** 
//     REGISTRAR PRODUCTO
// *************************** 

function registrar(req, res) {

    var params = req.body;
    if (req.files) {
        // obtiene ruta donde almacena uploads\\productos\\u6riLEwZZO4qin6Yp8_JkK5b.jpg
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        // obtenemos el nombre de la img de la 2da posicion 
        var imagen_name = name[2];

        var producto = new Producto();
        producto.titulo = params.titulo;
        producto.descripcion = params.descripcion;
        producto.imagen = imagen_name;
        producto.precio_compra = params.precio_compra;
        producto.precio_venta = params.precio_venta;
        producto.stock = params.stock;
        producto.idcategoria = params.idcategoria;
        producto.puntos = params.puntos;

        producto.save((err, prodSave) => {

            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            } else if (prodSave) {
                res.status(200).send({
                    producto: prodSave,
                    message: 'Producto registrado con éxito'
                });
            } else {
                res.status(403).send({ message: 'No se registro el producto' });
            }

        });
    } else {
        var producto = new Producto();
        producto.titulo = params.titulo;
        producto.descripcion = params.descripcion;
        producto.imagen = null;
        producto.precio_compra = params.precio_compra;
        producto.precio_venta = params.precio_venta;
        producto.stock = params.stock;
        producto.idcategoria = params.idcategoria;
        producto.puntos = params.puntos;

        producto.save((err, prodSave) => {

            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            } else if (prodSave) {
                res.status(200).send({
                    producto: prodSave,
                    message: 'Producto registrado con éxito'
                });
            } else {
                res.status(403).send({ message: 'No se registro el producto' });
            }

        });
    }


}

// *******************************************
//     LISTAR PRODUCTO POR ID O LISTAR TODO
// ******************************************* 

function listar(req, res) {

    var titulo = req.params['titulo'];

    Producto.find({ titulo: new RegExp(titulo, 'i') }).populate('idcategoria').exec((err, prodListado) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else if (prodListado) {
            res.status(200).send({
                productos: prodListado,
                message: 'Listado de productos'
            });
        } else {
            res.status(403).send({ message: 'No existe ningun registro con ese titulo' });
        }
    });

}

// *********************************
//     EDITAR PRODUCTO POR ID
// *********************************

function editar(req, res) {

    var params = req.body;
    var id = req.params['id'];
    var img = req.params['img'];

    if (req.files) {

        // cuando se edita la img se elimina la anterior reemplazando con la nueva img
        fs.unlink('./uploads/productos/' + img, (err) => {
            if (err) throw err;
        });

        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

        Producto.findByIdAndUpdate({ _id: id }, {
            titulo: params.titulo,
            descripcion: params.descripcion,
            imagen: imagen_name,
            precio_compra: params.precio_compra,
            precio_venta: params.precio_venta,
            stock: params.stock,
            idcategoria: params.idcategoria,
            puntos: params.puntos
        }, (err, prodEdit) => {

            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            } else if (prodEdit) {
                res.status(200).send({
                    productos: prodEdit,
                    message: 'Producto editado'
                });
            } else {
                res.status(403).send({ message: 'No se editó el producto' });
            }
        });
    } else {
        Producto.findByIdAndUpdate({ _id: id }, {
            titulo: params.titulo,
            descripcion: params.descripcion,
            precio_compra: params.precio_compra,
            precio_venta: params.precio_venta,
            stock: params.stock,
            idcategoria: params.idcategoria,
            puntos: params.puntos
        }, (err, prodEdit) => {

            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            } else if (prodEdit) {
                res.status(200).send({
                    productos: prodEdit,
                    message: 'Producto editado'
                });
            } else {
                res.status(403).send({ message: 'No se editó el producto' });
            }
        });
    }
}

// *********************************
//     OBTENER PRODUCTO POR ID
// *********************************

function obtener_producto(req, res) {

    var id = req.params['id'];

    Producto.findOne({ _id: id }, (err, prodId) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else if (prodId) {
            res.status(200).send({
                producto: prodId
            });
        } else {
            res.status(403).send({ message: 'No se encontró el producto' });
        }
    });

}

// *********************************
//     ELIMINAR PRODUCTO POR ID
// *********************************

function eliminar(req, res) {

    var id = req.params['id'];

    Producto.findOneAndRemove({ _id: id }, (err, prodEliminar) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else if (prodEliminar) {

            // elimina la img de la carpeta /uploads/productos/
            fs.unlink('./uploads/productos/' + prodEliminar.imagen, (err) => {
                if (err) throw err;
            });

            res.status(200).send({
                producto: prodEliminar,
                message: 'Producto eliminado'
            });
        } else {
            res.status(403).send({ message: 'No se pudo eliminar el producto' });
        }
    });
}

// *********************************
//     ACTUALIZAR STOCK
// *********************************

function update_stock(req, res) {

    var id = req.params['id'];
    var params = req.body;

    Producto.findById(id, (err, prodData) => {
        if (prodData) {
            Producto.findByIdAndUpdate(id, { stock: parseInt(prodData.stock) + parseInt(params.stock) },
                (err, prodEdit) => {
                    if (prodEdit) {
                        res.status(200).send({
                            producto: prodEdit,
                            message: 'Stock del producto aumentado'
                        });
                    }
                });
        } else {
            res.status(500).send({ message: 'Error en el servidor' });
        }

    });

}

// *********************************
//   OBTENER IMG DE UN PRODUCTO
// *********************************

function get_img(req, res) {

    var img = req.params['img'];

    if (img != 'null') {
        var path_img = './uploads/productos/' + img;
        res.status(200).sendFile(path.resolve(path_img));
    } else {
        var path_img = './uploads/productos/default.jpg';
        res.status(200).sendFile(path.resolve(path_img));
    }
}

module.exports = {
    registrar,
    listar,
    editar,
    obtener_producto,
    eliminar,
    update_stock,
    get_img
};