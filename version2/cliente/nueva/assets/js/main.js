(function () {
  "use strict";

  /**
   * Contador
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Tambien ayuda al contador
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * No lo vas a creer pero tambien ayuda al contador
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Hace que los enlaces del nav esten activos al hacer scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Permite mover la pagina cuando seleccionas algo del nav
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Cambia la clase .header-scrolled a #header cuando la página se desplaza
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Boton para volver arriba
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Movedor de comentarios
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Inicia el Pure Counter 
   */
  new PureCounter();

  /* // Obtenemos los elementos del DOM que vamos a utilizar
  const selectOpcion = document.getElementById('opcion');
  const input = document.getElementById('cantidad');
  const total = document.getElementById('total');

  // Agregamos un event listener al select y al input
  selectOpcion.addEventListener('change', calcularTotal);
  input.addEventListener('input', calcularTotal);

  // Función que calcula el total
  function calcularTotal() {
    // Obtenemos el valor seleccionado en el select y la cantidad ingresada en el input
    const valor = selectOpcion.value;
    const cantidad = Number(input.value);

    // Creamos una variable para almacenar el total
    let totalCalculado = 0;

    // Dependiendo del valor seleccionado, calculamos el total multiplicando la cantidad ingresada por el valor correspondiente
    //lo que hay que cambiar son los numeros 1,2,3 y 4, y ahi poner el valor de cada mes, semana etc
    if (valor === 'meses') {
      totalCalculado = cantidad * 1;
    } else if (valor === 'semanas') {
      totalCalculado = cantidad * 2;
    } else if (valor === 'dias') {
      totalCalculado = cantidad * 3;
    } else if (valor === 'horas') {
      totalCalculado = cantidad * 4;
    }

    // Actualizamos el contenido del elemento con el total calculado
    total.textContent = `$${totalCalculado}`;
  } */


})()

$(document).ready(function () {
  let url_actual = window.location.href;
  var resp;

  //Petición al servidor hecha con AJAX
  $.ajax({
    url: url_actual,
    method: "post",

    success: function (respuesta) {
       resp = respuesta;
      console.log(resp);

      $("#titulo").text(resp[0].titulo);
      $("#descripcion").text(resp[0].descripcion);
      $("#imagen").attr("src", resp[0].imagen);
      $("#direccion").text(resp[0].direccion);
      let serv = resp[0].servicios;
      servicios(serv);
      let opc = resp[0].tipoAlquiler;
      opciones(opc);
      let precios = resp[0].precioAlquiler
      calTotal(precios)
    },
  });
 


  function servicios(array) {
    for (let i = 0; i < array.length; i++) {
      $("<div/>", {
        class: "col-md-6 mt-4",
      })
        .append(
          $("<div/>", {
            class: "icon-box",
          }).append(
            $("<h4/>").append(
              $("<a/>", {
                text: array[i],
              })
            )
          )
        )
        .appendTo("#servicios");
    }
  }

  function opciones(array) {
    var i = 0;

    while (i < array.length) {
      $("#opciones").append(
        $("<option>", {
          value: i,
          text: array[i],
        })
      );
      i++;
    }
  }
  function calTotal(array){

    $("#cantidad").change( function(){
     let opcion= parseInt( $("#opciones").val())
     let cantidad = parseInt( $("#cantidad").val())
     let total = array[opcion] * cantidad
     $("#total").text(total)


    })

  }
});
