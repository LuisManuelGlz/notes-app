const passport = require("passport"); // requerimos de passport
const LocalStrategy = require("passport-local").Strategy; // usamos la estrategia local

const User = require("../models/user"); // requerimos del modelo del usuario

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// estrategia local
passport.use(new LocalStrategy({
    usernameField: "email" // definimos el email como forma de autenticación
}, async (email, password, done) => {
    const user = await User.findOne({ email }); // buscamos un usuario en al base de datos
    if (!user) { // si el usuario no existe
        return done(null, false, { message: "User not found" }); // retornamos el callback con un mensaje de no encontrado
    } else {
        const match = await user.matchPassword(password); // verificamos si la contraseña coincide, true o false
        if (match) { // si la contraseña coincide
            return done(null, user); // retornamos el callback con el usuario
        } else { // sino
            return done(null, false, { message: "Incorrect password" }); // retornamos el callback con un mensaje de la contraseña incorrecta
        }
    }
}));
