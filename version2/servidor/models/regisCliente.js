const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//un Schema es el modelo de datos o la forma de un documento

let RegisCliente = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    contracena: String,
    cedula: String,
    telefono: String,

})

//exporto el modelo que creamos
module.exports = mongoose.model("Clientes",RegisCliente);

