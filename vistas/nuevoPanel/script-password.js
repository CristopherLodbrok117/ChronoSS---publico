

// const backendServer = "http://148.202.152.33/Servicio_Social";
const backendServer = "https://chronoss.mx/api";
const servicio = "/altaPrestador.php";
const tipoRequest = "POST"; 

const BG_ACTUALIZADO = "password-actualizada";
const BG_ERROR = "password-erronea";
const BG_WARNING = "password-warning";

document.querySelector("#boton-cambiar").addEventListener("click", function(){
  let viejacontra = document.querySelector("#old-password").value;
  let nuevacontra = document.querySelector("#new-password").value;
  let nuevacontra2 = document.querySelector("#new-password-rep").value;
  
  // Pruebas
  if(viejacontra == 'mal') {  // Eliminar if
    mostrarToast(TITULO_WARNING, BACKGROUND_WARNING, "Contraseña actual mal escrita", ICONO_WARNING);
    actualizarFondoImg(BG_ERROR);
    return;
  }
  else if(nuevacontra != nuevacontra2){
      mostrarToast(TITULO_WARNING, BACKGROUND_WARNING, "Las nuevas contraseñas no coinciden", ICONO_WARNING)
      actualizarFondoImg(BG_WARNING);
      return;
  }
  else { // Eliminar if
    mostrarToast(TITULO_SUCCESS, BACKGROUND_ESPERA, "Se actualizo la contraseña", ICONO_SUCCESS);
    actualizarFondoImg(BG_ACTUALIZADO);
    return;
  }


  // const senddata = new FormData();
  // senddata.append("contra", viejacontra);
  // senddata.append("contranueva", nuevacontra);

  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //         let respuesta = xhttp.responseText;
  //         if(respuesta == "-1"){
  //             mostrarToast(TITULO_WARNING, BACKGROUND_WARNING, "Tu actual contraseña no coincide", ICONO_WARNING);
  //             actualizarFondoImg(BG_ERROR);
  //             location.reload();
  //         }else{
  //             mostrarToast(TITULO_SUCCESS, BACKGROUND_ESPERA, "Se actualizo la contraseña", ICONO_SUCCESS);
  //             actualizarFondoImg(BG_ACTUALIZADO);
  //             limpiarCampos();
  //             //location.reload();
  //         }
  //     }
  // };
  // xhttp.open("POST", `${backendServer}/cambiarContra.php`, true);
  // xhttp.send(senddata);
});

function actualizarFondoImg(claseColorBg) {
  const imgBackground = document.querySelector("#img-bg");
  imgBackground.classList.remove(BG_ERROR, BG_ACTUALIZADO, BG_WARNING);
  imgBackground.classList.add(claseColorBg);
}

function limpiarCampos() {
  const oldPassword = document.querySelector("#old-password");
  const newPassword = document.querySelector("#new-password");
  const repPassword = document.querySelector("#new-password-rep");

  oldPassword.value = '';
  newPassword.value = '';
  repPassword.value = '';
}

document.querySelector("#boton-cancelar").addEventListener("click", limpiarCampos);