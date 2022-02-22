const express = require('express');
const { restArgs, rest } = require('underscore');
const _ = require('underscore');
const { verificarToken } = require('../middlewares/auth');

const app = express();
let Producto = require('../models/producto');

app.get('/productos', (req, res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    Producto.find({disponible: true}).populate('usuario', 'nombre email').populate('categoria', 'descripcion').skip(desde).limit(limite).exec((err, productosDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            productos: productosDB
        })
    });
});

app.post('/productos', verificarToken, (req, res) => {
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        descripcion: req.body.descripcion,
        disponible: req.body.disponible,
        categoria: req.body.categoria,
    });
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            producto: productoDB
        })
    });
})

app.put('/productos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible']);
    Producto.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: false,
            producto: productoDB
        })
    })
});

app.delete('/productos/:id', (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndDelete(id, (err, productoDelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if(!productoDelete){
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            producto: productoDelete,
        })
    });
});
app.get('/productos/buscar/:termino', (req, res)=> {
    let  termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Producto.find({nombre: regex}).populate('categoria', 'nombre').exec((err, productoBuscado)=> {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            producto: productoBuscado
        })
    });
});

module.exports = app;