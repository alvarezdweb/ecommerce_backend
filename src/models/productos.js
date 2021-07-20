import mongoose from 'mongoose';

const schema = mongoose.Schema({
    nombre:{type: String, required: true},
    descripcion:{type: String, required: true},
    codigo:{type: Number, required: true},
    foto:{type: String, required: true},
    precio:{type: Number, required: true},
    stock:{type: Number, required: true},
});

const productos = mongoose.model('productos', schema);

export default productos;