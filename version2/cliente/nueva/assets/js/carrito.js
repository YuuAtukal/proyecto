$(document).ready(function () {
 

  //Petición al servidor hecha con AJAX
  
  $.ajax({
    url: "http://localhost:3000/carrito",
    method: "post",

    success: function (respuesta) {
      var resp = respuesta;
        $("#fechaInicio").text(resp[0].fechaEntrada);
        $("#fechaInicioH").val(resp[0].fechaEntrada);
        $("#fechaFin").text(resp[0].fechaSalida);
        $("#fechaFinH").val(resp[0].fechaSalida);
        $("#imagen").attr("src", resp[0].imagen);
        $("#imagenH").val(resp[0].imagen);
        $("#duracionEstancia").text(resp[0].cantidad + " " + resp[0].tipo);
        $("#duracionEstanciaH").val(resp[0].cantidad + " " + resp[0].tipo);
        $("#total").text(resp[0].total);
        $("#totalH").val(resp[0].total);
        $("#tituloDireccion").text(resp[0].titulo + ", " + resp[0].direccion);
        $("#tituloDireccionH").val(resp[0].titulo + ", " + resp[0].direccion);
        $("#cedula").val(resp[0].numCedula);
      
      
    },
  });



  $("#formPago").submit(function (e) {
    e.preventDefault();

    let pago = $("#formPago").serialize();

    //Petición al servidor hecha con AJAX
    $.ajax({
      url: "http://localhost:3000/carrito",
      method: "put",
      data: pago,
      success: function (respuesta) {
        alert(respuesta);
        Eliminar();
        window.location.href = "http://localhost:3000/inicio";
      },
    });
  });

  function Eliminar() {
    let pago = $("#formPago").serialize();
    $.ajax({
      url: "http://localhost:3000/carrito",
      method: "delete",
      data: pago,
      success: function (respuesta) {
        console.log(respuesta);
      },
    });
  }

});
