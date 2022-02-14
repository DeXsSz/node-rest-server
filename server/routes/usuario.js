const  express = require('express');
const app = express();

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');
const verificarToken = require('../middlewares/auth');

app.get('/usuario', verificarToken, (req, res)=>{

    return res.json({
        usuario: req.usuario
    })

    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    desde = Number(desde);
    hasta = Number(hasta);
    Usuario.find({estado: true}, 'nombre email role estado img google')
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios)=> {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.count({estado: true}, (err, conteo)=> {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                }) 
            })
            
        })
})

app.post('/usuario', (req, res)=>{
    let {nombre, email, password, role} = req.body;

    let usuario = new Usuario({
        nombre,
        email,
        password: bcrypt.hashSync(password	, 10),
        role
    });

    usuario.save((err, usuarioDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});


app.put('/usuario/:id', verificarToken, (req, res)=>{

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre',  'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB)=> {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/usuario/:id', verificarToken, (req, res )=>{
    let id = req.params.id;
    //Oculto el usuario pero no borro el usuario fisico/registro de la db
    Usuario.findByIdAndUpdate(id, {estado: false}, {new: true}, (err, usuarioDB)=>{
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        // if(usuarioDB.estado === false){
        //     return res.status(400).json({
        //         ok: false,
        //         err: {
        //             message: 'Usuario no encontrado'
        //         }
        //     })
        // }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
   /* Borrando usuario fisico de la base de datos. EL registro
   Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=> {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!usuarioBorrado){
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
    */
})

module.exports = app