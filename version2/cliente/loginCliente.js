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
         
          if(respuesta != "incorrecto"){
            localStorage.setItem("logueado", true);
            localStorage.setItem("usuario",respuesta )
            window.location.href = "http://localhost:3000/inicio"
          }else{
            localStorage.setItem("logueado", false);
            alert("usuario o contraceña incorrectos")
          }         

         
        },
      });
    });
  });