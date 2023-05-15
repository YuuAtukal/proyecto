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
app.use("/assets", express.static(path.resolve("../cliente/nueva/assets")));

//Modelos de datos
const RegisOficina = require("./models/regisOficina");
const RegisCliente = require("./models/regisCliente");
const RegisCompra = require("./models/compras");
//rutas

/* ------ READ ------ */
//Sitio web registro oficina
app.get("/registroOficina", function (req, res) {
  res.sendFile(path.resolve("../cliente/registro-cowork.html"));
});
//Ruta ----> Guardar una oficina  en la BD oficinas
app.post("/registroOficina", async function (req, res) {
  let oficina_enviada = req.body;
  let nuevo_oficina = new RegisOficina(oficina_enviada);
  await nuevo_oficina.save();
  let ident = await RegisOficina.find({ email: req.body.email }, { _id: 1 });
  let mensaje = { id: ident[0]._id, txt: "envio exitoso" };
  res.send(mensaje);
  console.log(oficina_enviada);
});
// ruta para el detalle
app.get("/detalle/:id", function (req, res) {
  let id_oficina = req.params.id;
  res.sendFile(path.resolve("../cliente/nueva/index.html"));
  console.log(id_oficina);
});

// ruta para enviar los datos a detalle
app.post("/detalle/:id", async function (req, res) {
  let id_oficina = req.params.id;
  let datos = await RegisOficina.find({ _id: id_oficina });
  res.send(datos);
  console.log(id_oficina);
});
//Ruta ----> guardar la compra un la bd compra
app.put("/detalle/:id", async function (req, res) {
  let id_compra = req.params.id;
  let numTipo = req.body.tipo;
  let numCantidad = req.body.cantidad;
  let datos = await RegisOficina.find({ _id: id_compra });
  let datos_enviados = {
    titulo: datos[0].titulo,
    direccion: datos[0].direccion,
    imagen: datos[0].imagen,
    tipo: datos[0].tipoAlquiler[numTipo],
    cantidad: numCantidad,
    total: datos[0].precioAlquiler[numTipo] * numCantidad,
    numCedula : req.body.numCedula,
    fechaEntrada : req.body.fechaEntrada,
    fechaSalida : req.body.fechaSalida,
  };
  console.log("cedula " + req.body.numCedula)
  console.log("fechaEntrada " + req.body.fechaEntrada)
  console.log("fechaEntrada " + req.body.fechaEntrada)
  let nuevo_compra = new RegisCompra(datos_enviados);
  await nuevo_compra.save();
  let idCom = await RegisCompra.find(({ titulo: datos[0].titulo, imagen: datos[0].imagen  }, { _id: 1 }))
  res.send(idCom);
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
  console.log(datos_enviados);
});
//Sitio web login
app.get("/login", function (req, res) {
  res.sendFile(path.resolve("../cliente/login.html"));
});

//Ruta ----> comprarar
app.post("/login", async function (req, res) {
  let emailLogin = req.body.email;
  let contracenaLogin = req.body.contracena;
  let bd = await RegisCliente.find(
    { email: emailLogin, contracena: contracenaLogin },
    { email: 1, contracena: 1, _id: 0 }
  );
  let mensaje;
  if (bd != "") {
    mensaje = "login exitoso";
  } else {
    mensaje = "email o contraceña incorrecta";
  }
  res.send(mensaje);

  console.log(bd);
});
//Sitio web listado
app.get("/listado", function (req, res) {
  res.sendFile(path.resolve("../cliente/portfolio-overview.html"));
});

//Sitio web listado
app.post("/listado", async function (req, res) {
  let bdOficina = await RegisOficina.find();
  res.send(bdOficina);
});

// ruta para el carrito
app.get("/carrito", function (req, res) {
  let id_oficina = req.params.id;
  res.sendFile(path.resolve("../cliente/nueva/carrito.html"));
});



//puerto del servidor
app.listen(3000, function () {
  console.log("Servidor OK!!!");
});
