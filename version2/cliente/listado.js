$(document).ready(function () {
  //Petición al servidor hecha con AJAX
  $.ajax({
    url: "http://localhost:3000/listado",
    method: "post",

    success: function (respuesta) {
      let resp = respuesta;
      console.log(resp);
     lista(resp)

      /* window.location.href = "http://localhost:3000/detalle/"+resp.id; */
    },
  });

  function lista(array) {
    for (let i = 0; i < array.length; i++) {
      var $divCol = $("<div></div>").addClass("col-lg-6");
      var $divPosRel = $("<div></div>").addClass("position-relative mb-5");
      var $img = $("<img>")
        .addClass("img-fluid rounded-3 mb-3")
        .attr("src",array[i].imagen)
        .attr("alt", "...")
        .attr("width", "700")
        .attr("height", "400");
      var $pCard = $("<p></p>").addClass("card-text mb-0");
      var $a = $("<a></a>")
        .addClass("h3 fw-bolder text-decoration-none link-dark stretched-link")
        .attr("href", "http://localhost:3000/detalle/"+array[i]._id)
        .text(array[i].titulo);
      var $ul = $("<ul></ul>").attr("id", "miLista");
      var $li1 = $("<li></li>").text( array[i].descripcion)
      var $li2 = $("<li></li>").text("direccion " + array[i].direccion);
      var $li3 = $("<li></li>").text("telefono " + array[i].telefono);

      $divCol.append($divPosRel);
      $divPosRel.append($img);
      $divPosRel.append($pCard);
      $pCard.append($a);
      $pCard.append($ul);
      $ul.append($li1);
      $ul.append($li2);
      $ul.append($li3);

      $("#lista").append($divCol);
    }
  }
});
