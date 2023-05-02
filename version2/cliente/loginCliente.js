$(document).ready(function () {
    //Escribo todo lo necesario para enviar los datos al servidor
    $("#loginForm").submit(function (e) {
      e.preventDefault();
  
      let datos_login = $("#loginForm").serialize();
  
      //Petición al servidor hecha con AJAX
      $.ajax({
        url: "http://localhost:3000/login",
        method: "post",
        data: datos_login,
        success: function (respuesta) {
          alert(respuesta);
        },
      });
    });
  });