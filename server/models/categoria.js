const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categoriaSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion es obligatorias']
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

categoriaSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});
module.exports = mongoose.model('Categoria', categoriaSchema);