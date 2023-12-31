const CLASE_IMG_MINIMIZADA = "img-camara-minimizada";  

const btnCamRegistrar = document.querySelector("#boton-camara");
const streamContainer = document.querySelector("#webcamContainer");
const imgCamara = document.querySelector("#img-camara"); // Animación de la camara
const codigoInput = document.querySelector("#codigo-input");
const spinner = document.querySelector(".lds-dual-ring");
let camaraAbierta = false;
let rasgos = [];
let detectado = false, cargado = false;


( async () => {
    await faceapi.loadFaceLandmarkModel('./models');
    await faceapi.loadSsdMobilenetv1Model('./models');
    await faceapi.loadFaceRecognitionModel('./models');
})();

btnCamRegistrar.addEventListener("click", function(){
    let camModule = `
        <video onloadeddata="onPlay(this)" id="inputVideo" autoplay muted playsinline class="videotso"></video>
        
        <p id="webcam-label"></p>
        
    `;
    streamContainer.innerHTML += camModule;
    abrirCamara();
});



async function abrirCamara() {
    camaraAbierta = true;
    minimizarImagenCamara();
    const stream = await navigator.mediaDevices.getUserMedia({ video : {} });
    document.querySelector("#inputVideo").srcObject = stream;
    streamContainer.style.visibility = "visible";
    mostrarToast(TITULO_SUCCESS, BACKGROUND_ESPERA, "Haciendo reconocimiento facial", ICONO_CAMARA);
}

async function onPlay(){
    if(!camaraAbierta) return;
    const videoFeed = document.querySelector("#inputVideo");
    if(!cargado){spinner.style.display = "inline-block";}

    let fullFaceDescriptions = await faceapi.detectAllFaces(videoFeed)
    .withFaceLandmarks()
    .withFaceDescriptors();
    
    if(fullFaceDescriptions.length > 0){
        detectado = true;
        spinner.style.display = "none";
        cargado = true;
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
                //document.querySelector("#webcam-label").textContent = "DESCONOCIDO";
                mostrarToast(TITULO_SUCCESS, BACKGROUND_SUCCESS, "Desconocido", ICONO_SUCCESS);
                setTimeout(removeCam, 1000);
            }else{
                document.querySelector("#webcam-label").textContent = mejorCandidato.nombre;
                setTimeout(removeCam, 1000);
                const senddata = new FormData();
                let codigo = mejorCandidato.idprestador;
                //codigoInput.value = codigo;
                senddata.append("codigo", codigo);
                senddata.append("token", localStorage.getItem("terminal_token"));
                
                var xhttp2 = new XMLHttpRequest();
                xhttp2.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        updateActivos();
                        mostrarToast(TITULO_SUCCESS, BACKGROUND_SUCCESS, `${mejorCandidato.nombre} reconocido`, ICONO_SUCCESS);
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

// document.querySelector("#boton-entrar").addEventListener("click", function() {
//     removeCam();
//     // codigoInput.value = "210397316";
// });


function removeCam(){
    camaraAbierta = false;
    detectado = false;
    streamContainer.innerHTML = "";
    // streamContainer.style.visibility = "hidden"; // Si lo descomento elimina parte de la animación de la cam
    maximizarImagenCamara();
    // mostrarToast(TITULO_SUCCESS, BACKGROUND_SUCCESS, "Se detecto a un chaval", ICONO_SUCCESS);
}


// Animación de la camara

function minimizarImagenCamara () {
    // camaraActiva = true;
    // if(imgCamara.classList.contains(CLASE_IMG_MINIMIZADA)){
    //     console.log("Imagen de camara ya minimizada");
    //     return;
    // }
    imgCamara.classList.add(CLASE_IMG_MINIMIZADA);
    // console.log("Se minimizo la imagen de la camara");

}

function maximizarImagenCamara () {
    // // camaraActiva = false;
    // if(!imgCamara.classList.contains(CLASE_IMG_MINIMIZADA)){
    //     return;
    // }
    imgCamara.classList.remove(CLASE_IMG_MINIMIZADA);
    // console.log("Se maximizo la imagen de la camara");
}
