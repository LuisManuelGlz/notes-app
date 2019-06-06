const User = require("../models/user"); // requerimos del modelo User

const UserController = {};

// registrar usuario
UserController.signup = async (req, res) => {
    const { name, email, password, password2 } = req.body; // obtenemos los atributos para el usuario
    const errors = []; // definimos un arreglo vacío para los errores

    if (!name) { // si el usuario no agrega un nombre
        errors.push({text: "Please write a name"}); // agregamos un mensaje al arreglo de los errores
    }
    if (!email) { // si el usuario no agrega un email 
        errors.push({text: "Please write an email"}); // agregamos un mensaje al arreglo de los errores
    }
    if (!password) { // si el usuario no agrega una contraseña
        errors.push({text: "Please write a password"}); // agregamos un mensaje al arreglo de los errores
    } else { // sino
        if (password.length < 4) { // si la contraseña tiene menos de 4 caracteres
            errors.push({ text: "Password must be at least 4 characters" }); // agregamos un mensaje al arreglo de los errores
        } else { // sino
            if (!password2) { // si el usuario no agrega una contraseña de confirmación
                errors.push({ text: "Please write a confirmation password" }); // agregamos un mensaje al arreglo de los errores
            } else { // sino
                if (password != password2) { // si las contraseñas no coinciden
                    errors.push({ text: "Password do not match" }); // agregamos un mensaje al arreglo de los errores
                }
            }
        }
    }

    if (errors.length > 0) { // si hay un error o más en el arreglo de errores
        res.render("signup", { // mostramos los errores
            page_title: "Register",
            errors,
            name,
            email,
            password
        });
    } else { // sino
        const userEmail = await User.findOne({ email }); // buscamos un email en Mongodb
        if (userEmail) { // si hay un email
            req.flash("error", "The email is already in use"); // mostramos un mensaje de que el email ya está en uso
            res.redirect("/users/signup"); // redireccionamos al formulario de registro
        }
        // creamos una nueva nota (aún no se agrega a Mongodb)
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password); // encriptamos la contraseña
        await newUser.save(); // guardamos el usuario en Mongodb
        req.flash("success", "You are registered"); // mostramos un mensaje de que el registro fue exitoso
        res.redirect("/users/login"); // redireccionamos al formulario de log in
    }
};

// exportamos UserController
module.exports = UserController