const express = require('express');
const Usuario = require('../models/usuario');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.get('/usuario', function(req, res) {

    // si viene el parametro desde o inicia de 0
    let desde = req.query.desde || 0;

    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario
    // .find({ estado: false }) //condiciones del find TEX: estado_activo:true
    // .find({}, 'nombre email') //condiciones especiales detallando los campos a mostrar
        .find({ estado: true }, 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    usuarios_activos: conteo
                })

            })

        })
})

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        // Encriptamos la pass
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        google: body.google
    })

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //Mostrar como NULL informacion innecesaria para el usuario
        //TEX: El campo password del objeto
        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    //Arreglo con los elemntos que SI se puede actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // En el 3er parametro 'options'
    // new: regresa las modificaciones.
    // runValidators; valida que se cumpla antes de retornar las modificaciones

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

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
    })

})

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    /* OPCION 1 ELIMINAR REGISTRO DE LA BD */
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {


    /* OPCION 2 EDITAR REGISTRO DE LA BD A UN ESTADO INACTIVO */
    let cambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
})

module.exports = app;