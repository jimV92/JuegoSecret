//El valor de estas varibales fue dado en la funcion de condiciones inciales
let numeroSecreto = 0; 
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//Para los mensajes iniciales, los elementos son h1 p etc, 
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//console.log(numeroSecreto);
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);//parseInt para forzar que sea nnumber y no string
    
    if (numeroSecreto === numeroDeUsuario){
        asignarTextoElemento('h1',`Acertaste el numero en ${intentos} ${(intentos === 1) ? 'vez' : 'veces' }`);   // template string dentro de un parametro $, para arreglar el singular se debe usar el terneario cuanso sea 1 intento, usar comillas inclinadas
        document.getElementById('reiniciar').removeAttribute('disabled');//habilitar boton de nuevo juego , removemos el atributo disable cuando se acierta el numero
    } else {
        //El usuario no acerto
        if (numeroDeUsuario < numeroSecreto) {
            asignarTextoElemento('h1', 'El numero secreto es mayor');
        } else {
            asignarTextoElemento('h1','El numero es menor');
        }
        intentos ++;
        limpiarCaja();
    }
    return;
}

//Funcion de limpieza de caja
function limpiarCaja(){
    document.querySelector('#valorUsuario').value= ''; //.value para tomar el valor de valor usuario pero considerar el #  
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles');
    }else{
        //Si el numero generadoesta incluido en la lista, RECURSIVIDAD llamando a la misma funcion
        if (listaNumerosSorteados.includes(numeroGenerado)) { 
            return generarNumeroSecreto();
        }else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
    
            
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del numero secreto !'); //mensaje incial
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`); //mensaje inicial
    numeroSecreto = generarNumeroSecreto(); //generar numero aleatorio
    intentos = 1; //inicializar el conteo de numero de intentos
}

//Nuevo Juego -----------------------
function reiniciarJuego() {
    //Limpiar la caja
    limpiarCaja();
    //Indicar mensaje de inicio
    condicionesIniciales();
    //Desabilitar el boton de nuevo juevo
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();

