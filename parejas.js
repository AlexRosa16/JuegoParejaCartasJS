var tiempo = 0;
var imagenes = ["carta1.jpeg", "carta2.jpeg", "carta3.jpeg", "carta4.jpeg", "carta5.jpeg", "carta6.jpeg", "carta7.jpeg", "carta8.jpeg", "carta9.jpeg", "carta10.jpeg", "carta11.jpeg", "carta12.jpeg"];
var arrayseleccionados = [];
var imagenesDuplicadas = imagenes.concat(imagenes);
var permitirClick = true;
var fallos = 0;
var aciertos = 0;

imagenesDuplicadas = imagenesDuplicadas.sort(() => Math.random() - 0.5);

var tablero = document.getElementById("tablero");
var tiempoElement = document.getElementById("tiempo");
var fallosElement = document.getElementById("fallos");
var continuar = document.getElementById("continuar");

if (localStorage.length === 0) {
    continuar.style.display = "none";
} else {
    continuar.style.display = "flex";

}

console.log(localStorage.length);

function guardarTableroEnLocalStorage() {
    localStorage.setItem('tablero', JSON.stringify(imagenesDuplicadas));
}

function guardarArraySeleccionadosEnLocalStorage() {
    localStorage.setItem('arrayseleccionados', JSON.stringify(arrayseleccionados));
}


function cargarTableroDesdeLocalStorage() {
    const tableroGuardado = localStorage.getItem('tablero');
    
    if (tableroGuardado) {
        imagenesDuplicadas = JSON.parse(tableroGuardado);
    }
}

function cargarArraySeleccionadosDesdeLocalStorage() {
    const arrayseleccionadosGuardado = localStorage.getItem('arrayseleccionados');
    
    if (arrayseleccionadosGuardado) {
        arrayseleccionados = JSON.parse(arrayseleccionadosGuardado);
    }
}


function cargarlocalstorage(){

    aciertos = parseInt(localStorage.getItem('aciertos', aciertos));
    fallos = parseInt(localStorage.getItem('fallos', fallos));
    tiempo = parseInt(localStorage.getItem('tiempo', tiempo));
    fallosElement.textContent = "Aciertos: " + aciertos + " | Fallos: " + fallos;
    console.log(tiempo);

    cargarTableroDesdeLocalStorage();
    cargarArraySeleccionadosDesdeLocalStorage();
}

function guardarlocalstorage(){
    localStorage.setItem('aciertos', aciertos);
    localStorage.setItem('fallos', fallos);
    localStorage.setItem('tiempo', tiempo);
    console.log('a');

    guardarTableroEnLocalStorage();
    guardarArraySeleccionadosEnLocalStorage();
}

function iniciarContador() {
    setInterval(function () {
        tiempo++;
        guardarlocalstorage();
        tiempoElement.textContent = "Tiempo: " + tiempo + " segundos";
    }, 1000); // Actualiza el tiempo cada segundo
}

function contarAciertosYFallos(acertado) {
    if (acertado) {
        aciertos++;
    } else {
        fallos++;
    }

    fallosElement.textContent = "Aciertos: " + aciertos + " | Fallos: " + fallos;
}

function jugar(continuar) {

    if(continuar == 'true'){        
        cargarlocalstorage();
    }

    document.getElementById("titulo").style.display = "none";
    document.getElementById("descripcion").style.display = "none";
    document.getElementById("h1empezar").style.display = "none";
    document.getElementById("botones").style.display = "none";
    document.getElementById("tablero").style.display = "flex";
    document.getElementById("tiempo").style.display = "flex";
    document.getElementById("fallos").style.display = "flex";


    iniciarContador();


    for (var i = 0; i < imagenesDuplicadas.length; i++) {
        crearCarta(i);
    }
}

function crearCarta(i) {
    let carta = document.createElement("div");
    carta.classList.add("carta");
    carta.setAttribute("id", "carta" + (i + 1));


    var img = document.createElement("img");
    img.src = imagenesDuplicadas[i];
    img.setAttribute("id",(i + 1));
    img.setAttribute("class","imagenes");
    carta.setAttribute("onclick","MostrarCarta("+(i +1)+")");



    carta.appendChild(img);
    tablero.appendChild(carta);
}


function MostrarCarta(id){

    if(arrayseleccionados.length < 2){
        arrayseleccionados.push(id);
        var idcarta = document.getElementById(id);
        idcarta.setAttribute("class","visibles");
        comprobarPareja();
    } 
   

}

function quitaronclick(id1, id2){

    let carta1 = document.getElementById("carta" + id1)
    let carta2 = document.getElementById("carta" + id2)

    carta1.removeAttribute("onclick");
    carta1.removeAttribute("onclick");

}



function comprobarPareja(carta) {

    if (arrayseleccionados.length === 2) {
        var primeraImagen = document.getElementById(arrayseleccionados[0]);
        var segundaImagen = document.getElementById(arrayseleccionados[1]);
        
        console.log(arrayseleccionados);
        console.log(primeraImagen.src);
        console.log(segundaImagen.src);
        if (primeraImagen && segundaImagen) {
            if (primeraImagen.src === segundaImagen.src && primeraImagen.id != segundaImagen.id ) {
                // Las imágenes son iguales, eliminarlas del array y reiniciar la variable permitirClick

                quitaronclick(primeraImagen.id,segundaImagen.id);
                arrayseleccionados = [];
                contarAciertosYFallos(true);
            } else {
                // Las imágenes son diferentes, ocultar y reiniciar la selección
                permitirClick = false; // Desactivar el click temporalmente
                setTimeout(function () {
                    // Oculta las imágenes después de un tiempo determinado
                    primeraImagen.setAttribute("class","imagenes");
                    segundaImagen.setAttribute("class","imagenes");


                    arrayseleccionados = [];
                    permitirClick = true; // Reactivar el click
                    contarAciertosYFallos(false);
                }, 1000); // Ajusta el tiempo según tus necesidades
            }
        }
    }
}
