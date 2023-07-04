checkAuth();
const backendServer = "https://chronoss.mx/api";
//const backendServer = "http://localhost:8000";

const listaPrestadores = document.querySelector("#lista-prestadores");
let globalInfoPrestadores = [];


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        globalInfoPrestadores = JSON.parse(xhttp.responseText);
        renderPrestadores(globalInfoPrestadores);
    }
};
xhttp.open("GET", `${backendServer}/getAllPrestadorInfo.php?idprofe=${localStorage.getItem("idprofe")}&token=${localStorage.getItem("profe_token")}`, true);
xhttp.send(null);



document.querySelector("#filtro-codigo").addEventListener("input", filtrar);
document.querySelector("#filtro-nombre").addEventListener("input", filtrar);


function filtrar(){
    let codigo = document.querySelector("#filtro-codigo").value;
    let nombre = document.querySelector("#filtro-nombre").value.toLowerCase();
    
    let infoPrest = globalInfoPrestadores.filter(function(prestador){
        return prestador.codigo.includes(codigo) && prestador.nombre.toLowerCase().includes(nombre);
    });
    renderPrestadores(infoPrest);
}



function renderPrestadores(prestadoresData){

    document.querySelectorAll(".item").forEach(e => e.remove());
    prestadoresData.forEach(prestador => {
        let horasAcum = Math.floor(prestador.tiempoAcumulado / 3600);
        let minutosAcum = prestador.tiempoAcumulado % 3600;
        minutosAcum = Math.floor(minutosAcum/60);
        let segundosAcum = prestador.tiempoAcumulado % 60;
        
        
        let timelogsString = "";
        let timelogs = prestador.timelogs;
        timelogs.sort((a,b) => (a.stamp < b.stamp) ? 1 : ((b.stamp < a.stamp) ? -1 : 0));

        timelogs.forEach(log => {
            let d = new Date(log.stamp);
            d.setHours(d.getHours()-6);
            timelogsString += `
                <tr>
                    <td>${d.toLocaleString("es-MX")}</td>
                    <td class="${log.tipo == 'ent' ? "tdEntrada" : "tdSalida"}">${log.tipo == 'ent' ? "Entrada" : "Salida"}</td>
                </tr>
            `;
        });
        listaPrestadores.innerHTML += `
            <div class="item" prestador="${prestador.codigo}">
            <div class="item-header">
                <p>${prestador.codigo} - ${prestador.nombre}</p>
            </div>
            <div class="cajon">
                <div style="display: flex; justify-content: space-evenly;">
                    <p>Horas totales: ${horasAcum} : ${minutosAcum} : ${segundosAcum}</p>
                    <p>En servicio : ${prestador.enServicio == 1 ? "Si" : "No"}</p>
                </div>

                <div style="display: flex; justify-content: center; align-items: center;">
                    <p>Quitar/poner horas :</p>
                    <input type="number" class="quitapon" value="0">
                    <button class="boton-ok">OK</button>
                </div>
                
                <div style="display: flex; justify-content: center;">
                    <table>
                        <thead>
                            <th colspan="2">Timelogs</th>
                        </thead>
                        ${timelogsString}
                    </table>
                </div>
                <div style="display: flex; justify-content: center"><button class="boton-eliminar">Eliminar Prestador</button></div>
            </div>
        </div>
        `;
    });
    addListeners();
}

function addListeners(){
    const headers = document.querySelectorAll(".item-header");
    headers.forEach(header => {
        header.addEventListener("click", function(){
            let codigo = header.parentNode.getAttribute("prestador");
            let cajon = header.parentNode.querySelector(".cajon");

            if(cajon.style.display == "block"){
                cajon.style.display = "none";
            }else{
                cajon.style.display = "block";
            }
        });
    });

    const okBotones = document.querySelectorAll(".boton-ok");
    okBotones.forEach(okbttn => {
        okbttn.addEventListener("click", function(){
            let codigo = okbttn.parentNode.parentNode.parentNode.getAttribute("prestador");
            let delta = okbttn.parentNode.querySelector(".quitapon").value;

            const senddata = new FormData();

            senddata.append("codigo", codigo);
            senddata.append("delta", delta);
            senddata.append("token", localStorage.getItem('profe_token'));

        
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let respuesta = xhttp.responseText;
                    alert(respuesta);
                    location.reload();
                }
            };
            xhttp.open("POST", `${backendServer}/modificarHoras.php`, true);
            xhttp.send(senddata);
        });
    });

    const eliminarBotones = document.querySelectorAll(".boton-eliminar");
    eliminarBotones.forEach(elbttn => {
        elbttn.addEventListener("click", function(){
            let codigo = elbttn.parentNode.parentNode.parentNode.getAttribute("prestador");
            
            const senddata = new FormData();

            senddata.append("codigo", codigo);
            senddata.append("token", localStorage.getItem('profe_token'));
        
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let respuesta = xhttp.responseText;
                    if(respuesta == 1){
                        alert("Eliminacion correcta!");
                    }else{
                        alert(respuesta);
                    }
                    location.reload();
                }
            };
            xhttp.open("POST", `${backendServer}/eliminarPrestador.php`, true);
            xhttp.send(senddata);
        });
    });



}
function checkAuth(){
    let token = localStorage.getItem('profe_token');
    if(token == null || token == ""){
        window.location.replace("../auth/");
    }
}



