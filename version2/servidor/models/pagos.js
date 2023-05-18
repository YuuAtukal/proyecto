const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//un Schema es el modelo de datos o la forma de un documento

let RegisPago = new Schema({
    fechaInicio: String,
    fechaFin: String, 
    imagen: String,
    duracion: String,
    total : Number,
    titulo : String,
    cedula : String,
    
  
})

//exporto el modelo que creamos
module.exports = mongoose.model("Pagos",RegisPago);
