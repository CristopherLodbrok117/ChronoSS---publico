const btnCamRegistrar = document.querySelector("#camara-registrar");
const streamContainer = document.querySelector("#webcamContainer");
let camaraAbierta = false;
let rasgos = [];
let detectado = false;


( async () => {
    await faceapi.loadFaceLandmarkModel('./models');
    await faceapi.loadSsdMobilenetv1Model('./models');
    await faceapi.loadFaceRecognitionModel('./models');
})();

btnCamRegistrar.addEventListener("click", function(){
    let camModule = `
        <video onloadeddata="onPlay(this)" id="inputVideo" autoplay muted playsinline></video>
        <canvas id="overlay"></canvas>
        <p id="webcam-label"></p>
        <span id="boton-cerrar" onclick="removeCam()">X</span>
    `;
    streamContainer.innerHTML += camModule;
    abrirCamara();
});



async function abrirCamara() {
    camaraAbierta = true;
    const stream = await navigator.mediaDevices.getUserMedia({ video : {} });
    document.querySelector("#inputVideo").srcObject = stream;
    streamContainer.style.visibility = "visible";
}

async function onPlay(){
    if(!camaraAbierta) return;
    const videoFeed = document.querySelector("#inputVideo");
    let fullFaceDescriptions = await faceapi.detectAllFaces(videoFeed)
    .withFaceLandmarks()
    .withFaceDescriptors();
    if(fullFaceDescriptions.length > 0){
        detectado = true;
        rasgos = [...fullFaceDescriptions[0].descriptor].map( e =>  Number(e.toFixed(4)) );
        callServer();
    }else{
        rasgos = [];
    }
   if(!detectado)
        setTimeout(() => onPlay(), 1000);
}

function callServer(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            respuesta = JSON.parse(xhttp.responseText);
            respuesta.sort((a, b) => {
                return a.delta - b.delta;
            });
            console.log(respuesta);
            mejorCandidato = respuesta[0];
            if(mejorCandidato.delta > 0.35){
                document.querySelector("#webcam-label").textContent = "DESCONOCIDO";
                setTimeout(removeCam, 1000);
            }else{
                document.querySelector("#webcam-label").textContent = mejorCandidato.nombre;
                setTimeout(removeCam, 1000);
                const senddata = new FormData();
                let codigo = mejorCandidato.idprestador;
                senddata.append("codigo", codigo);
                senddata.append("token", localStorage.getItem("terminal_token"));
                
                var xhttp2 = new XMLHttpRequest();
                xhttp2.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        updateActivos();
                    }
                };
                xhttp2.open("POST", `${backendServer}/registrarTiempo.php`, true);
                xhttp2.send(senddata);
            }
        }
    };
    xhttp.open("GET", `${backendServer}/reconocerCara.php?idprofe=${localStorage.getItem("idprofe")}&rasgos=${JSON.stringify(rasgos)}&token=${localStorage.getItem("terminal_token")}`, true);
    xhttp.send(""); 
}

function removeCam(){
    camaraAbierta = false;
    detectado = false;
    streamContainer.innerHTML = "";
    streamContainer.style.visibility = "hidden";
}