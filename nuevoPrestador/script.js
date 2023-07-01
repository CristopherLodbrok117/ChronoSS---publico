//const backendServer = "http://127.0.0.1:5000";
//https://chronoss.mx/terminal/getAllPrestadorInfo.php
const backendServer = "https://chronoss.mx/terminal";

const btnCamRegistrar = document.querySelector("#boton-entrar");
const streamContainer = document.querySelector("#webcamContainer");
const canva = document.querySelector("#overlay");
let rasgos = [];

const videoFeed = document.querySelector("#inputVideo");

( async () => {

    await faceapi.loadFaceLandmarkModel('./models');
    await faceapi.loadSsdMobilenetv1Model('./models');
    await faceapi.loadFaceRecognitionModel('./models');
    const stream = await navigator.mediaDevices.getUserMedia({ video : {} });
    videoFeed.srcObject = stream;
})();



async function onPlay(){
    console.log("HOLAS");   
    let fullFaceDescriptions = await faceapi.detectAllFaces(videoFeed)
    .withFaceLandmarks()
    .withFaceDescriptors();
    if(fullFaceDescriptions.length > 0){
        rasgos = [...fullFaceDescriptions[0].descriptor];
    }else{
        rasgos = [];
    }
    
    const dims = faceapi.matchDimensions(canva, videoFeed, true);
    const resizedResults = faceapi.resizeResults(fullFaceDescriptions, dims);

    faceapi.draw.drawDetections(canva, resizedResults);
    faceapi.draw.drawFaceLandmarks(canva, resizedResults);
    
    setTimeout(() => onPlay(), 2000);

}

btnCamRegistrar.addEventListener("click", function(){
    const senddata = new FormData();
    let codigo = document.querySelector("#codigo-input").value;
    let nombre = document.querySelector("#nombre-input").value;
    if(codigo == "" || nombre == "") return;

    senddata.append("codigo", codigo);
    senddata.append("nombre", nombre);
    senddata.append("token", localStorage.getItem('terminal_token'));
    senddata.append("idprofe", localStorage.getItem('idprofe'));
    senddata.append("rasgos", JSON.stringify(rasgos))

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = xhttp.responseText;
            console.log(respuesta);
            if(respuesta == "x"){
                alert("Algo malio sal!");
            }else{
                alert("Registro correcto");
            }
            location.reload();
        }
    };
    xhttp.open("POST", `${backendServer}/altaPrestador.php`, true);
    xhttp.send(senddata);

});



