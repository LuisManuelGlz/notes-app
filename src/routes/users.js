const express = require("express"); // requerimos de express
const router = express.Router(); // usamos el router de express

const userController = require("../controllers/userController"); // usamos el controlador de los usuarios
const passport = require("passport"); // requerimos de passport

// ruta get para el log in
router.get("/users/login", (req, res) => {
    res.render("login", {
        page_title: "Log in",
        errors: []
    });
});

// ruta post para el log in
router.post("/users/login", passport.authenticate("local", { // usamos la autenticación local
    successRedirect: "/notes",       // redireccionamos a todas las notas
    failureRedirect: "/users/login", // si falla, redireccionamos al log in
    failureFlash: true               // ni idea de qué hace esto
}));

// ruta get para el sign up
router.get("/users/signup", (req, res) => {
    res.render("signup", {
        page_title: "Register",
        errors: []
    });
});

// ruta post para el sign up
router.post("/users/signup", userController.signup);

// ruta get para log out
router.get("/users/logout", (req, res) => {
    req.logout();
    res.redirect("/"); // redireccionmos a la ruta principal
});

// exportamos el router
module.exports = router;