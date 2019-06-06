const helpers = {};

// función para verificar si el usuario está autenticado
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { // si está autenticado
        return next();
    }
    req.flash("error", "Not authorized"); // mostranos un mensaje de que el usuario no está autorizado
    res.redirect("/users/login"); // redireccionamos al formulario de log n
};

// exportamos los helpers
module.exports = helpers;