const express = require("express"); // rquerimos de express
const router = express.Router(); // usamos el router de express

// ruta get principal
router.get("/", (req, res) => {
  res.render("index", { page_title: "Home", errors: [] });
});

// ruta get acerca de
router.get("/about", (req, res) => {
  res.render("about", { page_title: "About", errors: [] });
});

// exportamos el router
module.exports = router;
