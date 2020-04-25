var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');
var Producto = require('../models/producto');

// *************************** 
//     REGISTRAR VENTA
// *************************** 

function registrar(req, res) {

    var params = req.body;
    var venta = new Venta();

    venta.idcliente = params.idcliente;
    venta.iduser = params.iduser;

    venta.save((err, ventaSave) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else if (ventaSave) {
            var detalles = params.detalles;
            detalles.forEach(element => {
                var detalleventa = new DetalleVenta();

                detalleventa.idproducto = element.idproducto;
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = ventaSave._id;

                detalleventa.save((err, detalleSave) => {
                    if (err) {
                        res.status(403).send({ message: 'Error al crear en detalleventa' });
                    } else if (detalleSave) {
                        // Si se registro el detalleventa se quiere actualizar el 'stock'
                        //de los productos disminuyendo la cantidad de venta menos su stock
                        Producto.findById({ _id: element.idproducto }, (err, prodDatos) => {
                            if (err) {
                                res.status(403).send({ message: 'No se pudo encontrar el producto' });
                            } else if (prodDatos) {
                                Producto.findByIdAndUpdate({ _id: prodDatos._id }, { stock: parseInt(prodDatos.stock) - parseInt(element.cantidad) }, (err, prodEdit) => {
                                    if (prodEdit) {
                                        res.status(200).send({ message: 'Creado la venta completa con éxito' });
                                    } else {
                                        res.status(200).send({ message: 'Error al crear la venta' });

                                    }
                                });
                            }
                        });
                    }
                });
            });

        }
    });
}


// ********************************
//     OBTENER DATOS DE UNA VENTA
// ********************************

function datos_venta(req, res) {

    var id = req.params['id'];

    Venta.findById(id, (err, venta) => {
        if (err) {
            res.status(403).send({ message: 'No existe el Id con la venta requerida' });
        } else if (venta) {
            DetalleVenta.find({ venta: venta._id }, (err, detalle) => {
                if (detalle) {
                    res.status(200).send({
                        venta: venta,
                        detalles: detalle,
                        message: 'Detalle de ventas'
                    });
                }
            });
        }
    });
}

module.exports = {

    registrar,
    datos_venta
};