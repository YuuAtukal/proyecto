$(document).ready(function () {
  
    var log = localStorage.getItem("logueado");

    if(log == "true"){
        $("#op_username").text(localStorage.getItem("usuario")).show()
        $("#op_username").attr("href", "/cliente")
        $("#op_login").hide()
        $("#btn_registrar").removeClass("disabled")

    }else{
        $("#op_username").hide();
        $("#op_login").show()
        $("#btn_registrar").addClass("disabled")
    }


    });
