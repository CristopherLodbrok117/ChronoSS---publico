const backendServer = "https://chronoss.mx/api";
//const backendServer = "http://localhost:8000";

const vistaLogin = document.querySelector("#login");
const vistaInfo = document.querySelector("#info");

const botonEntrar = document.querySelector("#boton-entrar");
let codigo;
const horas = document.querySelector("#horas");
const minutos = document.querySelector("#minutos");
const segundos = document.querySelector("#segundos");
const nombre = document.querySelector("#nombre");
const cargando = document.querySelector("#cargando");
const stamps = document.querySelectorAll(".stamp .content");
const botonSalir = document.querySelector("#boton-salir");

const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];


codigo = localStorage.getItem("codigo");
if(codigo != null){readCodigo();}


botonEntrar.addEventListener("click", function(){
    cargando.classList.add("loader");
    codigo = document.querySelector("#codigo-input").value;
    readCodigo();
});

botonSalir.addEventListener("click", function(){
    localStorage.removeItem("codigo");
    location.reload();
});

function readCodigo(){
    let promesa = new Promise(fetchData);
    promesa.then(
        value => displayData(value),
        error => alert(error)
    );
}

function fetchData(succ, reject){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(xhttp.responseText);            
            cargando.classList.remove("loader");
            if(respuesta.codigo != null){
                localStorage.setItem("codigo", respuesta.codigo);
                succ(respuesta);
            }else{
                reject("No hay alumno con ese codigo registrado");
            }
        }
    };
    xhttp.open("GET", `${backendServer}/consulta.php?codigo=${codigo}`, true);
    xhttp.send();
}

function displayData(data){
    vistaLogin.style.display = "none";
    vistaInfo.style.visibility = "visible";

    nombre.textContent = data.nombre;

    let t = secondsToTime(data.tiempoAcumulado);
    horas.style.setProperty('--hrs', t[0]);
    minutos.style.setProperty('--min', t[1]);
    segundos.style.setProperty('--sec', t[2]);

    stamps[0].textContent = arreglarFecha(data.timelogs[0].stamp);
    stamps[1].textContent = arreglarFecha(data.timelogs[data.timelogs.length-1].stamp);
    
}

function secondsToTime(segundos){
    let hrs = Math.floor(segundos/3600);
    segundos -= hrs*3600;
    let min = Math.floor(segundos/60);
    segundos -= min*60;
    return [hrs, min, segundos];
}

function arreglarFecha(stamp){
    let fecha = stamp.split(" ")[0];
    fecha = fecha.split("-");

    let year = fecha[0];
    let mes = meses[parseInt(fecha[1])-1];
    let dia = fecha[2];
    return `${dia} de ${mes} de ${year}`;
}