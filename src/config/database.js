const mongoose = require("mongoose"); //requerimos mongoose

const URI = "mongodb://localhost/notes-app-db"; // ruta de la base de datos

// conexión con la Mongodb
mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(db => console.log("Database is connected :D")) // si la conexión es exitosa
  .catch(err => console.log(err));                     // si la conexión falla

// exportamos mongoose
module.exports = mongoose;
