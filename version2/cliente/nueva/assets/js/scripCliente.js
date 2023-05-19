$(document).ready(function () {

    

    //Petición al servidor hecha con AJAX
    
    $.ajax({
      url: "http://localhost:3000/cliente",
      method: "post",
  
      success: function (respuesta) {
        var resp = respuesta;
          $("#nombreCompleto").text(resp[0].nombre + " " +resp[0].apellido );
          $("#telefono").text(resp[0].telefono);
          $("#email").text(resp[0].email);
          $("#fechaFinH").val(resp[0].fechaSalida);
          $("#imagen").attr("src", resp[0].imagen);
          $("#imagenH").val(resp[0].imagen);
        
      },
    })

    $.ajax({
      url: "http://localhost:3000/cliente",
      method: "put",
  
      success: function (respuesta) {
        var resp = respuesta;
          $("#reserva").text(resp[0].titulo + " - fehca: " +resp[0].fechaInicio + " - " + resp[0].fechaFin + " - valor: COP$ " + resp[0].total  +"- numero de reserva " + resp[0]._id );
         
        
      },
    })


})