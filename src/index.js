const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

// initializations
const app = express();
const { mongoose } = require("./config/database");
require("./config/passport");

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// global variables
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(require("./routes/index")); // rutas principales
app.use(require("./routes/notes")); // rutas para las notas
app.use(require("./routes/users")); // rutas para los usuarios

// static files
app.use(express.static(path.join(__dirname, "public")));

// listening the server
app.listen(app.get("port"), () => {
  console.log("Server listening at port", app.get("port"));
});
