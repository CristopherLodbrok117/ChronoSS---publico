checkAuth();
const backendServer = "https://chronoss.mx/api";
//const backendServer = "http://localhost:8000";

const tablaActivos = document.querySelector("table");
const codigoInput = document.querySelector("#codigo-input");
const botonEntrar = document.querySelector("#boton-entrar");
let prestadoresData = [];
let globalChecandoExcess = false;
updateActivos();
setInterval(renderTime, 1000);

function updateActivos(){
    let token = localStorage.getItem("terminal_token");
    let idprofe = localStorage.getItem("idprofe");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelectorAll(".tiempo-vivo-row").forEach(e => e.remove());
            prestadoresData = JSON.parse(xhttp.responseText);
            prestadoresData.forEach(prestador => {
                prestador.curTime = new Date(null);
                prestador.curTime.setSeconds(prestador.timestamp);
                console.log(prestador.timestamp);
                tablaActivos.innerHTML += ` <tr class="tiempo-vivo-row">
                                                <td>${prestador.codigo}</td>
                                                <td>${prestador.nombre}</td>
                                                <td class="tiempo-vivo" prestador="${prestador.codigo}">${prestador.curTime.toISOString().slice(11, 19)}</td>
                                            </tr>`;
            });
        }
    };
    xhttp.open("GET", `${backendServer}/getActivos.php?token=${token}&idprofe=${idprofe}`, true);
    xhttp.send(null);
}



function renderTime(){
    prestadoresData.forEach(prestador => {
        prestador.curTime.setSeconds(prestador.curTime.getSeconds() + 1);
        document.querySelector(`[class="tiempo-vivo"][prestador="${prestador.codigo}"]`).textContent = prestador.curTime.toISOString().slice(11, 19);
        
        if(prestador.curTime.getTime() >= 8*60*60*1000 && globalChecandoExcess == false){
            globalChecandoExcess = true;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    globalChecandoExcess = false;
                    console.log("Termino el chequeo");
                    if(xhttp.responseText == 1){
                        console.log("Salio alguien");
                        updateActivos();
                    }
                }
            };
            xhttp.open("POST", `${backendServer}/checkExcess.php`, true);
            xhttp.send("");   
        }
    });
}

function checkAuth(){
    let token = localStorage.getItem('terminal_token');
    if(token == null || token == ""){
        window.location.href = "../auth";
    }
}