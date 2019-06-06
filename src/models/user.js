const mongoose = require("mongoose"); // requerimos de mongoose
const { Schema } = mongoose; // usamos el Schema de mongoose
const bcrypt = require("bcryptjs"); // requerimos de bcryptjs

// definimos un Schema para los usuarios
const UserSchema = new Schema({
    name: { type: String, required: true },     // nombre
    email: { type: String, required: true },    // email
    password: { type: String, required: true }, // contraseña
    date: { type: Date, default: Date.now }     // fecha de creación
});

// método para encriptar la contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // genera sal
    const hash = bcrypt.hash(password, salt); // combinamos la contraseña con la sal
    return hash; // retornamos el hash
};

// método para comparar la contraseña
UserSchema.methods.matchPassword = function(password) {
    // return true o false
    return bcrypt.compare(password, this.password);
};

// exportamos el modelo
module.exports = mongoose.model('User', UserSchema);