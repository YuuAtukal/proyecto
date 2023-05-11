$(document).ready(function () {

  //Petición al servidor hecha con AJAX
  $.ajax({
    url: "http://localhost:3000/carrito",
    method: "post",

    success: function (respuesta) {
      var resp = respuesta;

      $("#titulo").text(resp[0].titulo);
      $("#descripcion").text(resp[0].descripcion);
      $("#imagen").attr("src", resp[0].imagen);
      $("#imagen").val(resp[0].imagen);
      $("#direccion").text(resp[0].direccion);
      let serv = resp[0].servicios;
      servicios(serv);
      let opc = resp[0].tipoAlquiler;
      opciones(opc);
      let precios = resp[0].precioAlquiler;
      calTotal(precios);
    },
  });
});
