//checkAuth();
//const backendServer = "http://148.202.152.33/Servicio_Social";
//const backendServer = "http://127.0.0.1:5000";
const backendServer = "https://chronoss.mx/api";

const tablaActivos = document.querySelector("table");
// const codigoInput = document.querySelector("#codigo-input");
// const botonEntrar = document.querySelector("#boton-entrar");
let prestadoresData = [];
let globalChecandoExcess = false;
updateActivos();
setInterval(renderTime, 1000);

/*
codigoInput.addEventListener("input", function(){
    let curCodigo = codigoInput.value;
    const encontrado = prestadoresData.findIndex(prest => prest.codigo==curCodigo);
    if(encontrado >= 0){
        botonEntrar.textContent = "Salir";
        botonEntrar.style.backgroundColor = "#ff8080";
    }else{
        botonEntrar.textContent = "Entrar";
        botonEntrar.style.backgroundColor = "#b3ffb3";
    }
});

codigoInput.addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    botonEntrar.click();
    event.preventDefault();
});*/

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
                tablaActivos.innerHTML += ` <tr class="tiempo-vivo-row colorium">
                                                <td>${prestador.codigo}</td>
                                                <td class="col-nombre">${prestador.nombre}</td>
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
/*
document.querySelector("#boton-entrar").addEventListener('click', function(){
    
    const senddata = new FormData();
    let codigo = document.querySelector("#codigo-input").value;
    if(codigo == "") return;
    document.querySelector("#codigo-input").value = "";
    senddata.append("codigo", codigo);
    senddata.append("token", localStorage.getItem('terminal_token'));

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = parseInt(xhttp.responseText);
            if( ! isNaN(respuesta)){
                let horas = respuesta/3600;
                let horasFloor = Math.floor(horas);
                let minutos = horas - horasFloor;
                minutos = Math.floor(minutos * 60);

                alert(`Sesión finalizada con éxito. \nHoras acumuladas  ${horasFloor} : ${minutos}`);
                botonEntrar.textContent = "Entrar";
                botonEntrar.style.backgroundColor = "#b3ffb3";
            }
            updateActivos();
        }
    };
    xhttp.open("POST", `${backendServer}/registrarTiempo`, true);
    xhttp.send(senddata);
    codigoInput.focus();

});
*/
function checkAuth(){
    let token = localStorage.getItem('terminal_token');
    if(token == null || token == ""){
        window.location.href = "../auth";
    }
}