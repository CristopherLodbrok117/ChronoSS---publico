const TOAST_ID = "#toast";

const TOAST_ID_BACKGROUND = "#toast-header";
const TOAST_ID_TITULO = "#toast-titulo";
const TOAST_ID_MSG = "#toast-msg";
const TOAST_ID_ICONO = "#toast-icono";

const BACKGROUND_WARNING = "#FFC107";
const BACKGROUND_SUCCESS = "#0EF165";
const BACKGROUND_ESPERA = "#0dCAF0";

const TITULO_WARNING = "Espera!";
const TITULO_SUCCESS = "Acción completada";
const TITULO_ESPERA = "Un momento por favor";

const ICONO_WARNING = "bi-exclamation-triangle-fill";
const ICONO_CAMARA = "bi-camera-fill";
const ICONO_SUCCESS = "bi-person-check-fill";
const ICONO_SALIO = "bi-clock";


function mostrarToast(titulo, bg_color, texto, icono) {

  const toast = document.querySelector(TOAST_ID);
  let background = document.querySelector(TOAST_ID_BACKGROUND);
  let toastTitulo =  document.querySelector(TOAST_ID_TITULO);
  let mensaje = document.querySelector(TOAST_ID_MSG);
  let toastIcono = document.querySelector(TOAST_ID_ICONO);

  background.style.backgroundColor = bg_color;
  toastTitulo.textContent = titulo;
  mensaje.textContent = texto;
  fijarIcono(toastIcono, icono)

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}

function fijarIcono(icono, claseIcono){
  icono.classList.remove(ICONO_CAMARA, ICONO_SALIO, ICONO_SUCCESS, ICONO_WARNING);
  icono.classList.add(claseIcono);
}