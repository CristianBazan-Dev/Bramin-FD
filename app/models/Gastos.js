const { mongoose, Schema, model } = require('mongoose'); 

const gastosModel = new Schema({
    gastosIniciales: {
        type: String, 
        required: true, 
        trim: true, 
        unique: true, 
    }, 
    precio_unitario: {
        type: Number, 
        required: true, 
    },
    cantidad: {
        type: Number, 
        required: false, 
        default: 1,
    }, 
    comprobante: {
        type: String, 
        required: false, 
    }
}, {
    timestamps: true,  
})

module.exports = new mongoose.model('GastosIniciales', gastosModel)