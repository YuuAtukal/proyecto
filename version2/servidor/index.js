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
const Tarea = require("./models/tareas");
const RegisCliente = require("./models/regisCliente")

//Rutas

/* ------ READ ------ */
//Sitio web principal (index)
app.get("/", function (req, res) {
  res.sendFile(path.resolve("../cliente/registro-cowork.html"));
});

// Buscar en la base de datos los documentos de Tareas
app.get("/prueba", async function (req, res) {
  let documentos = await Tarea.find();

  console.log(documentos);

  res.send(documentos);
});

/* ------ CREATE ------ */
// Inserta una nueva tarea en la Base de Datos
app.post("/nuevaTarea", async function (req, res) {
  console.log(req.body);
  let task = new Tarea(req.body);
  await task.save();
  res.send("La tarea se registró correctamente!");
});

/* ------ UPDATE ------ */
//petición para ver el archivo editar.html
app.get("/tarea/:id/:nombre_tarea", function (req, res) {
  let id_tarea = req.params.id;
  let nom_tarea = req.params.nombre_tarea;
  res.sendFile(path.resolve("../cliente/editar.html"));
});

//petición para buscar información en la BD, sobre una tarea específica
app.post("/tarea/:id/:nombre_tarea", async function (req, res) {
  let id_tarea = req.params.id;
  let nom_tarea = req.params.nombre_tarea;
  let documento = await Tarea.findById(id_tarea); //consultamos la BD
  res.send(documento);
});

//Petición para MODIFICAR una tarea
app.put("/tarea/:id/:nombre_tarea", async function (req, res) {
  let id_tarea = req.params.id;
  let datos_recibidos = req.body; //{ nombre: "cortar el pasto", detalle: "bla blbla" }

  await Tarea.updateOne({ _id: id_tarea }, datos_recibidos);

  res.send("Tarea modificada correctamente!");
});

/* ------ DELETE ------ */

//Petición para ELIMINAR una tarea
app.get("/eliminar/:id", async function (req, res) {
  let id_tarea = req.params.id;

  await Tarea.findByIdAndRemove(id_tarea);

  res.redirect("/");
});

//Sitio web registro
app.get("/registro", function (req, res) {
  res.sendFile(path.resolve("../cliente/registrocliente.html"));
});

//Ruta ----> Guardar un nuevo Gasto en la BD clientes
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