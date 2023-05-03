$(document).ready(function () {
  let url_actual = window.location.href;
   
      //Petición al servidor hecha con AJAX
      $.ajax({
        url:  url_actual,
        method: "post",
        
        success: function (respuesta) {
          let resp = respuesta;
          console.log(resp);

          $("#titulo").text(resp[0].titulo)
         
        },
      });
    });
