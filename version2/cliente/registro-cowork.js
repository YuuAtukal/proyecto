$(document).ready(function () {
    //Escribo todo lo necesario para enviar los datos al servidor
    $("#formOficina").submit(function (e) {
      e.preventDefault();
  
      let datos_formulario = $("#formOficina").serialize();
  
      //Petición al servidor hecha con AJAX
      $.ajax({
        url: "http://localhost:3000/registroOficina",
        method: "post",
        data: datos_formulario,
        success: function (respuesta) {
          alert(respuesta);
          window.location.href = "http://localhost:3000/registroOficina";
        },
      });
    });
  });