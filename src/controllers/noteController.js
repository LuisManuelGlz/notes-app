const Note = require("../models/note"); // requerimos el modelo Note

const NotesController = {};

// agregar nota
NotesController.addNote = async (req, res) => {
    const { title, description } = req.body; // obtenemos los atributos para la nota desde el formulario
    const errors = []; // definimos un arreglo vacío para los errores
    if (!title) { // si el usuario no agrega un título
        errors.push({text: "Please write a title"}) // agregamos un mensaje al arreglo de los errores
    }
    if (!description) { // si el usuario no agrega una descripción
        errors.push({text: "Please write a description"}); // agregamos un mensaje al arreglo de los errores
    }
    if (errors.length > 0) { // si hay un error o más en el arreglo de errores
        return res.render("new-note", { // mostramos los errores
            page_title: 'New note',
            errors,
            title,
            description
        });
    } else { // sino
        // creamos una nueva nota (aún no se agrega a Mongodb)
        // la nota ocupa de un ttulo, una descripción y el usuario al que sera referenciado
        const newNote = new Note({ title, description, user: req.user.id });
        await newNote.save() // guardamos la nota a Mongodb
        .then(() => {
            req.flash("success", "Note added successfully"); // mostramos un mensaje de que la nota se guardó de forma exitosa
            return res.redirect("/notes"); // redireccionamos a todas las notas
        })
        .catch((err) => { // si hay un error
            console.log(err);
            return res.send(err);
        });
    }
};

// actualizar nota
NotesController.updateNote = (req, res) => {
    const { title, description } = req.body; // obtenemos los atributos para la nota
    
    // buscamos la nota en Mongodb por medio de su ID para actualizarla
    Note.findByIdAndUpdate(req.params.id, { title, description })
    .then(() => {
        req.flash("success", "Note updated successfully"); // mostramos un mensaje de que la nota se actualizó de forma exitosa
        res.redirect("/notes") // redireccionamos a todas las notas
    })
    .catch((err) => { // si hay un error
        console.log(err);
        res.send(err);
    });
};

// eliminar nota
NotesController.deleteNote = (req, res) => {
    const { id } = req.body; // obtenemos los atributos para la nota
    
    // buscamos la nota en Mongodb por medio de su ID para eliminarla
    Note.findByIdAndDelete(id)
    .then(() => {
        req.flash("success", "Note deleted successfully"); // mostramos un mensaje de que la nota se eliminó de forma exitosa
        res.redirect("/notes"); // redireccionamos a todas los notas
    })
    .catch((err) => { // si hay un error
        console.log(err);
        res.send(err);
    });
};

// exportamos NotesController
module.exports = NotesController;