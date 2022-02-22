const express = require('express');
let Categoria = require('../models/categoria');
const app = express();
const _ = require('underscore');

let {verificarToken, verificarToken_Admin} = require('../middlewares/auth');


app.get('/categoria',  (req, res)=> {
    Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre email')
    .exec((err, categorias)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        Categoria.count({}, (err, number)=> {
            res.json({
                ok: true,
                categorias,
                cuantas: number
            })
        });
    });
});


app.get('/categoria/:id', (req, res)=>{
    let id = req.params.id
    Categoria.findById(id, (err, cat)=> {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            categoria: cat
        })
    })
});
app.post('/categoria', [verificarToken, verificarToken_Admin], (req, res)=>{
    
    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
    })
    
    categoria.save((err, categoriaDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true, 
            categoria: categoriaDB
        })
    })
});

app.put('/categoria/:id', [verificarToken, verificarToken_Admin], (req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion'])
    Categoria.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, categoriaDB)=> {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: categoriaDB
        })
    })
});

app.delete('/categoria/:id', (req, res)=> {
    let  id = req.params.id;
    Categoria.findByIdAndDelete(id, (err, categoriaDB)=> {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: categoriaDB
        })
    });
});

module.exports = app;