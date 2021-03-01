/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
/*function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();*/

//inicializar select
function init(){
  var types = [];
  var cities = [];
  $.get('data-1.json', function(data){
      for(let i = 0; i < data.length; i++){
          if(types.indexOf(data[i].Tipo) === -1) types.push(data[i].Tipo);
          if(cities.indexOf(data[i].Ciudad) === -1) cities.push(data[i].Ciudad);
      }
      for(let i = 0; i < cities.length; i++){
          $('#selectCiudad').append('<option value="'+cities[i]+'">'+cities[i]+'</option>');
      }
      for(let j = 0; j < types.length; j++){
          $('#selectTipo').append('<option value="'+types[j]+'">'+types[j]+'</option>');
      }
      $('select').material_select();
  });
}

//Inicializar sliders
$(document).ready(function(){
  inicializarSlider();
  init();
});

//Agregar y renderiza los resultados en la pagina
function showResult(array){
  $('.resultados').empty();
  for(let i=0; i<array.length; i++){
      $('.resultados').append(`<div class="card horizontal">
          <div class="card-image place-wrapper">
              <img class="img-responsive place-image" src="img/home.jpg">
          </div>
          <div class="card-stacked">
              <div class="card-content">
                  <p>
                      <b>Dirección: </b>${array[i].Direccion}<br>
                      <b>Ciudad: </b>${array[i].Ciudad}<br>
                      <b>Teléfono: </b>${array[i].Telefono}<br>
                      <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                      <b>Tipo: </b>${array[i].Tipo}<br>
                      <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                  </p>
              </div>
              <div class="card-action">
                  <a>Ver mas</a>
              </div>
          </div>
      </div>`);
  }
}

//Muestra todos los resultados
$('#mostrarTodos').click(function(){
  $.get('data-1.json', function(data){
      showResult(data);
  });
});

//Busqueda
$('#submitButton').click(function(){
  let city = $('#selectCiudad option:selected').val();
  let type = $('#selectTipo option:selected').val();
  let price = $('#rangoPrecio').val();

  $.get('buscador.php', {ciudad:city, tipo:type, precio:price}, function(response){
      let data = JSON.parse(response);
      var r = data.data;
      showResult(r);
  });
});