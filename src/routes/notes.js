const express = require("express"); // requerimos de express
const router = express.Router(); // usamos el router de express

const Note = require("../models/note"); // requerimos del modelo para la nota
const notesController = require("../controllers/noteController"); // usamos el controlador de las notas
const { isAuthenticated } = require("../helpers/auth"); // usamos la autenticación

// ruta get de para todas las notas
router.get("/notes", isAuthenticated, (req, res) => {
    // buscamos todas las notas que estén referenciadas al usuario
    Note.find({ user: req.user.id }).sort({ date: 'desc' })
    .then((notes) => {
        res.render('all-notes', { page_title: 'Notes', notes, errors: [] });
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
});

// ruta get para agregar nota
router.get("/notes/add", isAuthenticated, (req, res) => {
    res.render("new-note", {
        page_title: "New note",
        errors: []
    });
});

// ruta post para agregar nota
router.post("/notes/add", isAuthenticated, notesController.addNote);

// ruta get para actualizar nota
router.get("/notes/edit/:id", isAuthenticated, (req, res) => {
    // buacamos la nota por medio del ID
    Note.findById(req.params.id)
    .then((note) => {
        res.render("edit-note", {
            page_title: "Edit note",
            note
        });
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
});

// ruta post para actualizar nota
router.post("/notes/edit/:id", isAuthenticated, notesController.updateNote);

// ruta post para eliminar nota
router.post("/notes/delete/:id", isAuthenticated, notesController.deleteNote);

// exportamos el router
module.exports = router;