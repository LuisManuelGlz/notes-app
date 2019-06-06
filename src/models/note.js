const mongoose = require("mongoose"); // requerimos de mongoose
const { Schema } = mongoose; // usamos el Schema de mongoose

// definimos un Schema para las notas
const NoteSchema = new Schema({
    title: { type: String, required: true },       // título
    description: { type: String, required: true }, // descripción
    date: { type: Date, default: Date.now },       // fecha de creación
    user: { type: String }                         // usuario al que será referenciado
});

// exportamos el modelo
module.exports = mongoose.model('Note', NoteSchema);