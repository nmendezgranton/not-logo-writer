var logoClass = function(){


    this.mostrarMensaje = function(titulo, texto){
      document.querySelector('.mensajeModal').innerHTML = `<h1>${titulo}</h1><p>${texto}</p><p>Presiona <strong>Escape</strong> para salir</p>`;
      document.querySelector('.mensajeModal').style = 'display:inline';
    }

    this.cerrarMensaje = function(){
      document.querySelector('.mensajeModal').innerHTML = ``;
      document.querySelector('.mensajeModal').style = 'display:none';
    }

    this.parseOrdenes = function(){
      logo.cerrarMensaje();
      let ordenes = document.querySelector('#instrucciones').value.split('\n');
      for (i = 0; i < ordenes.length; i ++){
        if(ordenes[i]){
          try{
            if(!ordenes[i].match(/ /g) && !ordenes[i].match(/\(/g)){
              throw('Error');
            }
            eval(`logo.${ordenes[i]}`);
          }
          catch(e){
            logo.mostrarMensaje('Ha ocurrido un error', `Un error ocurrió al intentar ejecutar la línea ${i+1}:<br /><pre><code>${ordenes[i]}</code></pre>Los comandos que puedes usar son:<br />adelante(numero)<br />derecha(grados)<br />izquierda(grados).`);
          }
        }
      }
    }

    this.theme = function(theme){
      if(theme == 'dark'){
        document.body.classList.add('dark');
        localStorage.setItem('theme','dark');
      }
      else if(theme == 'light'){
        document.body.classList.remove('dark');
        localStorage.removeItem('theme');
      }
    }

    this.version = 0.1;
    this.debug = false;
    this.orientacion = 0;
    this.posicion = [0,0];
    this.pluma = true;
    this.ordenes = [];

    this.init = function(){

    }

    Math.radianes = function(deg){
      return deg * Math.PI / 180;
    }

    this.adelante = function(cant = null){
      if(this.debug){
        console.log(`Posicion inicial es left: ${this.posicion[0]} top: ${this.posicion[1]}`);
        console.log(`Orientacion inicial es ${this.orientacion}`);
      }
      moverDerecha =  Math.sin(Math.radianes(logo.orientacion))*cant;
      moverArriba = Math.cos(Math.radianes(logo.orientacion))*cant;

      if(this.debug){
        console.log(`Mover derecha es: ${moverDerecha}`);
        console.log(`Mover arriba es: ${moverArriba}`);
      }

      if((logo.posicion[0] - moverDerecha) == 0){
        posicionIzquierda = '50%';
      }
      else{
        posicionIzquierda = ((logo.posicion[0] - moverDerecha) > 0) ? 'calc(50% + ' + Math.abs(parseInt(logo.posicion[0] - moverDerecha)) + 'px)' : 'calc(50% - ' + Math.abs(parseInt(logo.posicion[0] - moverDerecha)) + 'px)';
      }
      if((logo.posicion[1] - moverArriba) == 0){
        posicionArriba = '50%';
      }
      else{
        posicionArriba = ((logo.posicion[1] - moverArriba) > 0) ? 'calc(50% + ' + Math.abs(parseInt(logo.posicion[1] - moverDerecha)) + 'px)' : 'calc(50% - ' + Math.abs(parseInt(logo.posicion[1] - moverArriba)) + 'px)';
      }

      let compensaX = Math.sin(Math.radianes(90 - logo.orientacion - 90)) * cant / 2;
      let compensaY =  cant / 2 - (Math.cos(Math.radianes(90 - logo.orientacion - 90)) * cant / 2);
      if((logo.posicion[0] - moverDerecha - compensaX) == 0){
        posicionIzquierdaLinea = '50%';
      }
      else{
        posicionIzquierdaLinea = ((logo.posicion[0] - moverDerecha - compensaX) > 0) ? 'calc(50% + ' + Math.abs(parseInt(logo.posicion[0] - moverDerecha - compensaX)) + 'px)' : 'calc(50% - ' + Math.abs(parseInt(logo.posicion[0] - moverDerecha - compensaX)) + 'px)';
      }
      if((logo.posicion[1] - moverArriba - compensaY) == 0){
        posicionArribaLinea = '50%';
      }
      else{
        posicionArribaLinea = ((logo.posicion[1] - moverArriba - compensaY) > 0) ? 'calc(50% + ' + Math.abs(parseInt(logo.posicion[1] - moverArriba - compensaY)) + 'px)' : 'calc(50% - ' + Math.abs(parseInt(logo.posicion[1] - moverArriba - compensaY)) + 'px)';
      }

      if(this.debug){
        console.log(`Compensando la rotación de la línea`);
        console.log(`compensaX: ${compensaX}, compensaY: ${compensaY}`);
      }
      if(this.pluma){
        document.getElementById('canvas').innerHTML += `<div class="line" id="" style="height:${cant}px;${(logo.orientacion) ? 'transform:rotate(' + (-logo.orientacion) + 'deg)' : ''};left:${posicionIzquierdaLinea};top:${posicionArribaLinea}">`;
      }
      logo.posicion[0] = logo.posicion[0] - moverDerecha;
      logo.posicion[1] = logo.posicion[1] - moverArriba;
      document.getElementById('tortuga').setAttribute('style', `left:calc(50% + ${logo.posicion[0]}px);top:calc(50% + ${logo.posicion[1]}px);${(logo.orientacion) ? 'transform:rotate(' + (-logo.orientacion) + 'deg)' : ''}`);


      if(this.debug){
        console.log(`Posicion final es left: ${this.posicion[0]} top: ${this.posicion[1]}`);
        console.log(`Orientacion final es ${this.orientacion}`);
        console.log('- - - - Done - - - -');
      }

    }

    this.atras = function(cant){
      this.adelante((cant * -1));
    }

    this.derecha = function(grad){
      logo.orientacion = logo.orientacion - grad;
      document.getElementById('tortuga').setAttribute('style', `left:calc(50% + ${logo.posicion[0]}px);top:calc(50% + ${logo.posicion[1]}px);${(logo.orientacion) ? 'transform:rotate(' + (-logo.orientacion) + 'deg)' : ''}`);
      if(this.debug){
        console.log(`Nueva orientacion: ${logo.orientacion}`);
      }
    }

    this.izquierda = function(grad){
      logo.orientacion = logo.orientacion + grad;
      document.getElementById('tortuga').setAttribute('style', `left:calc(50% + ${logo.posicion[0]}px);top:calc(50% + ${logo.posicion[1]}px);${(logo.orientacion) ? 'transform:rotate(' + (-logo.orientacion) + 'deg)' : ''}`);
      if(this.debug){
        console.log(`Nueva orientacion: ${logo.orientacion}`);
      }
    }


    this.clear = function(){
      document.location.reload();
    }

    this.circulo = function(tamanio){
      if(tamanio < 50){
        ratio = 6;
      }
      if(tamanio < 100){
        ratio = 4;
      }
      else if(tamanio < 200){
        ratio = 3;
      }
      else if(tamanio < 500){
        ratio = 2;
      }
      for(i = 0; i < (360 / ratio); i++){
        setTimeout(function(){
          // logo.adelante(tamanio * 0.0088);
          // logo.derecha(1);
          logo.adelante(tamanio * 0.0088 * ratio);
          logo.derecha(ratio);
        },(i*10));
      }
    }

    this.poligono = function(lados, lado){
      logo.derecha((360 / lados) - 90);
      for(i = 0; i < lados; i++){
        setTimeout(function(){
          logo.adelante(lado);
          logo.derecha((360 / lados));
        },(i*100));
      }
      setTimeout(function(){
        logo.izquierda((360 / lados) - 90);
      },(i*100 + 100));
    }

    this.triangulo = function(lado){
      logo.poligono(3,lado);
    }

    this.cuadrado = function(lado){
      logo.poligono(4,lado);
    }

    this.pentagono = function(lado){
      logo.poligono(5,lado);
    }

    this.hexagono = function(lado){
      logo.poligono(6,lado);
    }

    this.octagono = function(lado){
      logo.poligono(8,lado);
    }

    this.estrella = function(puntas, lado){
      for(i = 0; i < puntas; i++){
        setTimeout(function(){
          logo.adelante(lado);
          logo.derecha((360 / puntas));
          logo.adelante(lado);
          logo.izquierda((360 / puntas) * 2);
        },(i*100));
      }
    }


  }
logo = new logoClass();



document.onkeydown = function(evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = (evt.key === "Escape" || evt.key === "Esc");
  } else {
    isEscape = (evt.keyCode === 27);
  }
  if (isEscape) {
    logo.cerrarMensaje();
  }
};

document.addEventListener('click', function (event) {
	if (event.target.matches('#ejecutar')){
    logo.parseOrdenes();
  }
}, false);

window.onload = function(){
  document.querySelector('#instrucciones').focus();
  logo.mostrarMensaje('Este <strong>NO</strong> es Logo Writer!', 'Pero puedes usar los mismos comandos básicos. Inténtalo.');
  let theme = localStorage.getItem('theme');
  if(theme){
    logo.theme(theme);
  }
}
