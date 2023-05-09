const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//un Schema es el modelo de datos o la forma de un documento

let RegisCompra = new Schema({
    titulo: String,
    direccion: String, 
    imagen: String,
    tipo: String,
    cantidad : Number,
    total : Number,
  
})

//exporto el modelo que creamos
module.exports = mongoose.model("compras",RegisCompra);
