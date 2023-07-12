checkAuth();
// const backendServer = "http://148.202.152.33/Servicio_Social";
// const servicio = "/management/altaPrestador.php";
// const tipoRequest = "POST";
const backendServer = "https://chronoss.mx/api"; 

const RESPUESTA_SERVER_ERRONEA = "X";

const btnCamRegistrar = document.querySelector("#boton-registrar");
const streamContainer = document.querySelector("#webcamContainer");
const canva = document.querySelector("#overlay");
const spinner = document.querySelector(".lds-dual-ring");
let rasgos = [];

const videoFeed = document.querySelector("#inputVideo");
let imgCamara = document.querySelector("#img-camara");



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
  if(fullFaceDescriptions.length > 0 ){
      spinner.style.display = "none";
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
  let codigo = document.querySelector("#codigo-estudiante").value;
  let nombre = document.querySelector("#nombre-estudiante").value;
  
  if(codigo == "" || nombre == "") {
    mostrarToast(TITULO_WARNING, BACKGROUND_WARNING, "Faltan campos por llenar", ICONO_WARNING);
    return;
  }
  
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
          if(respuesta == "1"){
            mostrarToast(TITULO_SUCCESS, BACKGROUND_ESPERA, `${nombre} fue registrado como prestador de servicio`, ICONO_SUCCESS);
          }else{
            mostrarToast(TITULO_WARNING, BACKGROUND_WARNING, respuesta, ICONO_WARNING);
          }
          // location.reload();
          setTimeout(function(){ location.reload(); }, 5000);
      }
  };
  xhttp.open("POST", `${backendServer}/altaPrestador.php`, true);
  xhttp.send(senddata);

});

function checkAuth(){
  let token = localStorage.getItem('profe_token');
  if(token == null || token == ""){
      window.location.replace("../auth/");
  }
}