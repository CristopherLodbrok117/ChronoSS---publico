// const backendServer = "http://148.202.152.33/Servicio_Social"; 
const backendServer = "https://chronoss.mx/api";


document.querySelector("#boton-registrar").addEventListener("click", function() {
  let codigo = document.querySelector("#codigo").value;
  let password = document.querySelector("#password").value;
  let dependencia = document.querySelector("#dependencia").value;
  let nombreEncargado = document.querySelector("#nombre-encargado").value;
  let email = document.querySelector("#email").value;

  if(codigo == '' || password == '' || dependencia == '' || nombreEncargado == '' || email == ''){
    mostrarToast(TITULO_WARNING, BACKGROUND_WARNING, "Faltan campos por llenar", ICONO_WARNING);
    return;
  }
  mostrarToast(TITULO_SUCCESS, BACKGROUND_ESPERA, `Para completar su registro dar click al link que se le envio a su correo`, ICONO_SUCCESS);
  // Llamada para verificar correo

  const senddata = new FormData();
  senddata.append("idEncargado", codigo);
  senddata.append("passw", password);
  senddata.append("dependencia", dependencia);
  senddata.append("nombre", nombreEncargado);
  senddata.append("email", email);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange  = function() {
    if(this.readyState == 4 && this.status == 200) {
      // let respuesta = xhttp.responseText;
      mostrarToast(TITULO_SUCCESS, BACKGROUND_ESPERA, `Para completar su registro dar click al link que se le envio a su correo`, ICONO_SUCCESS);
    }
  };
  // xhttp.open("POST", `${backendServer}/registrarEncargado.php`, true);
  // xhttp.send(senddata);
});


