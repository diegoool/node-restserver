const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email es requerido']
    },
    password: {
        type: String,
        required: [true, 'Contrasena es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        //este role debe de existir dentro de esta enumeracion
        enum: rolesValidos

    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        required: false
    }
});


// Modificamos cuando se imprima por un JSON el usuarioSchema, 
// asi ocultamos informacion que no sea necesaria mostrar al usuario
// TEX: El campo Password
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


// Configurando los mensajes de error
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
})

// Exportamos el modelo Usuario con la configuracion de usuarioSchema
module.exports = mongoose.model('Usuario', usuarioSchema);