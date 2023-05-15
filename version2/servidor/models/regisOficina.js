const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//un Schema es el modelo de datos o la forma de un documento

let RegisOficina = new Schema({
    titulo: String,
    direccion: String, 
    cedula: String,
    email: String,
    descripcion: String,
    telefono: String,
    imagen: String,
    servicios: [String],
    tipoAlquiler: [String],
    precioAlquiler :[ Number],
  
})

//exporto el modelo que creamos
module.exports = mongoose.model("oficinas",RegisOficina);

