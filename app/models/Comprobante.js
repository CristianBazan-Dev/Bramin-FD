const { mongoose, Schema, default: mongoose } = require('mongoose'); 

const comprobanteModel = new Schema({
    nombreProducto: {
        type: String, 
        required: false
    },
}, {
    timestamps: true, 
})

module.exports = model('GastosIniciales', gastosModel)