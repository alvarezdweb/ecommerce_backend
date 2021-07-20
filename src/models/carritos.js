import mongoose from 'mongoose';

const schema = mongoose.Schema({
    timestamp:{type: Date, required: true},
    products: {type: Array}
});

const carritos = mongoose.model('carritos', schema);

export default carritos;