var logoClass = function(){


    this.mostrarMensaje = function(titulo, texto, noExit = false){
      document.querySelector('.mensajeModal').innerHTML = `<h1>${titulo}</h1><p>${texto}</p>${(!noExit) ? '<p>Presiona <strong>Escape</strong> para salir</p>' : ''}`;
      document.querySelector('.mensajeModal').style = 'display:inline';
    }

    this.cerrarMensaje = function(){
      document.querySelector('.mensajeModal').innerHTML = ``;
      document.querySelector('.mensajeModal').style = 'display:none';
    }

    this.parseOrdenes = function(){
      logo.cerrarMensaje();
      let ordenes = document.querySelector('#instrucciones').value.split('\n');
      let startAt = 0;
      console.log(ordenes);
      for (i = 0; i < ordenes.length; i ++){
        console.log(ordenes[i]);
        if(ordenes[i]){
          try{
            console.log(`startAt es ${startAt}`);
            console.log(`Ejecutando: logo.${ordenes[i].replace(/\)/,', startAt)')}`)
            if(!ordenes[i].match(/ /g) && !ordenes[i].match(/\(/g)){
              throw('Error');
            }
            result = eval(`logo.${ordenes[i].replace(/\)/,', startAt)')}`);
            console.log(`Resultado: ${result}`)
            if(result){
              startAt = result;
            }
          }
          catch(e){
            logo.mostrarMensaje('Ha ocurrido un error', `Un error ocurrió al intentar ejecutar la línea ${i+1}:<br /><pre><code>${ordenes[i]}</code></pre>Pulsa Reset para ver los comandos disponibles.`);
            console.log(e)
          }
        }
        else{
          console.log('Orden vacia');
        }
      }
    }

    this.theme = function(theme){
      if(theme == 'light'){
        document.body.classList.add('light');
        localStorage.setItem('theme','light');
      }
      else if(theme == 'dark'){
        document.body.classList.remove('light');
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

    this.adelante = function(cant = null, startAt = 0){
      setTimeout(function(){
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

        if(logo.debug){
          console.log(`Compensando la rotación de la línea`);
          console.log(`compensaX: ${compensaX}, compensaY: ${compensaY}`);
        }
        if(logo.pluma){
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
      }, startAt + 50);

      return (startAt + 50)

    }

    this.atras = function(cant){
      this.adelante((cant * -1));
    }

    this.derecha = function(grad, startAt = 0){
      setTimeout(function(){
        logo.orientacion = logo.orientacion - grad;
        document.getElementById('tortuga').setAttribute('style', `left:calc(50% + ${logo.posicion[0]}px);top:calc(50% + ${logo.posicion[1]}px);${(logo.orientacion) ? 'transform:rotate(' + (-logo.orientacion) + 'deg)' : ''}`);
        if(this.debug){
          console.log(`Nueva orientacion: ${logo.orientacion}`);
        }
      }, startAt + 50);

      return (startAt + 50)
    }

    this.izquierda = function(grad, startAt = 0){
      setTimeout(function(){
        logo.orientacion = logo.orientacion + grad;
        document.getElementById('tortuga').setAttribute('style', `left:calc(50% + ${logo.posicion[0]}px);top:calc(50% + ${logo.posicion[1]}px);${(logo.orientacion) ? 'transform:rotate(' + (-logo.orientacion) + 'deg)' : ''}`);
        if(this.debug){
          console.log(`Nueva orientacion: ${logo.orientacion}`);
        }
      }, startAt + 50);

      return (startAt + 50)
    }


    this.clear = function(){
      document.location.reload();
    }

    this.circulo = function(tamanio, startAt = 0){
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
        startAt += 10;
        setTimeout(function(){
          logo.adelante(tamanio * 0.0088 * ratio, 5);
          logo.derecha(ratio, 3);
        },(startAt));
      }
      return (startAt + 50);
    }

    this.poligono = function(lados, lado, startAt = 0){
      startAt = logo.derecha((360 / lados) - 90, startAt);
      for(i = 0; i < lados; i++){
        startAt += 100;
        setTimeout(function(){
          logo.adelante(lado);
          logo.derecha((360 / lados));
        },(startAt));

        // logo.adelante(lado);
        // logo.derecha((360 / lados));
      }
      // setTimeout(function(){
      //   logo.izquierda((360 / lados) - 90);
      // },(startAt + 100));
      startAt = logo.izquierda((360 / lados) - 90, (startAt + 50));
      return (startAt + 50);
    }

    this.triangulo = function(lado, startAt = 0){
      return logo.poligono(3,lado, startAt);
    }

    this.cuadrado = function(lado, startAt = 0){
      return logo.poligono(4,lado, startAt);
    }

    this.pentagono = function(lado, startAt = 0){
      return logo.poligono(5,lado, startAt);
    }

    this.hexagono = function(lado, startAt = 0){
      return logo.poligono(6,lado, startAt);
    }

    this.octagono = function(lado, startAt = 0){
      return logo.poligono(8,lado, startAt);
    }

    this.estrella = function(puntas, lado, startAt = 0){
      for(i = 0; i < puntas; i++){
        setTimeout(function(){
          logo.adelante(lado);
          logo.derecha((360 / puntas));
          logo.adelante(lado);
          logo.izquierda((360 / puntas) * 2);
        },(i*100));
      }
    }


    this.estrellaDavid = function(lado, startAt = 0){
      logo.triangulo(lado);
      logo.pluma = false
      logo.derecha(60)
      logo.adelante((lado * 1.15))
      logo.derecha(120)
      logo.pluma = true
      logo.triangulo(lado)
      logo.pluma = false
      logo.derecha(60)
      logo.adelante((lado * 0.6))
      logo.derecha(120)
      logo.pluma = true
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
  logo.mostrarMensaje('Este <strong>NO</strong> es Logo Writer!', 'Pero puedes usar los mismos comandos básicos. Inténtalo:<br /><br />Instrucciones: <br />adelante(x) / derecha(90) / izquierda(45)<br /><br />Formas: <br />cuadrado(largoLado) / triangulo(largoLado)<br />poligono(lados, largoLado) / circulo(diametro)<br />estrella(cantPuntas, largoPunta)<br /><br />Otros: <br />pluma = true|false / theme(\'dark\'|\'light\')', true);
  let theme = localStorage.getItem('theme');
  if(theme){
    logo.theme(theme);
  }
}
