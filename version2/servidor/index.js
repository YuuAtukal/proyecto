// Paquetes y módulos
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://garzond821:Westcon2019.@cluster0.i8iymdk.mongodb.net/coworking?retryWrites=true&w=majority"
  )
  .then(function (db) {
    console.log("Conectado a la Base de Datos");
  })
  .catch(function (err) {
    console.log(err);
  });

//Configuraciones 
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.resolve("../cliente/")));

//Modelos de datos
const RegisOficina = require("./models/regisOficina");
const RegisCliente = require("./models/regisCliente")

//rutas

/* ------ READ ------ */
//Sitio web registro oficina
app.get("/registroOficina", function (req, res) {
  res.sendFile(path.resolve("../cliente/registro-cowork.html"));
});
//Ruta ----> Guardar una oficina  en la BD oficinas
app.post("/registroOficina", async function (req, res) {
  let datos_enviados = req.body;
  let nuevo_oficina = new RegisOficina(datos_enviados);
  await nuevo_oficina.save();
  res.send("Registro exitoso");
  console.log(datos_enviados)
});


//Sitio web registro
app.get("/registro", function (req, res) {
  res.sendFile(path.resolve("../cliente/registrocliente.html"));
});

//Ruta ----> Guardar un nuevo cliente en la BD clientes
app.post("/registro", async function (req, res) {
  let datos_enviados = req.body;
  let nuevo_cliente = new RegisCliente(datos_enviados);
  await nuevo_cliente.save();
  res.send("Registro exitoso");
  console.log(datos_enviados)
});
//Sitio web login
app.get("/login", function (req, res) {
  res.sendFile(path.resolve("../cliente/login.html"));
});

//Ruta ----> comprarar
app.post("/login", async function (req, res) {
  let emailLogin = req.body.email;
  let contracenaLogin = req.body.contracena;
  let bd = await RegisCliente.find({email : emailLogin, contracena : contracenaLogin},{email:1, contracena:1, _id:0})
  let mensaje;
  if(bd!=""){
    mensaje = "login exitoso"
  }else{
    mensaje = "email o contraceña incorrecta"
  }
  res.send(mensaje)

 console.log(bd)
});

//puerto del servidor
app.listen(3000, function () {
  console.log("Servidor OK!!!");
});