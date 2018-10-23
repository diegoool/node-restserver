require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

const app = express();

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // La linea de abajo muestra que el bodyParser
    // ya viene incluido en las ultimas versiones de Express
    //app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())
    // La linea de abajo muestra que el bodyParser
    // ya viene incluido en las ultimas versiones de Express
    // app.use(express.json());


//Habilitar la carpeta Public (path)
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuracion global de rutas
app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;

    console.log('Base de datos connected!!')
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT);
})