//const backendServer = "http://127.0.0.1:5000";
//const backendServer = "http://148.202.152.33/Servicio_Social";
const backendServer = "https://chronoss.mx/api";


document.querySelector("#boton-autorizar").addEventListener("click", function(){
    let idProfe = document.querySelector("#id-profe").value;
    let givenPassword = document.querySelector("#password-profe").value;
    let tipo = document.querySelector("#tipo-combo").value;

    if(idProfe == '' || givenPassword == '' || tipo == '') {
        mostrarToast(TITULO_WARNING, BACKGROUND_WARNING, "Faltan campos por llenar", ICONO_WARNING);
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = xhttp.responseText;
            if(respuesta == "0"){
                mostrarToast(TITULO_WARNING, BACKGROUND_WARNING, "Error", ICONO_WARNING);
                // location.reload();
            }else{
                localStorage.setItem(`${tipo}_token`, respuesta);
                localStorage.setItem("idprofe", idProfe);
                alert(`Token de ${tipo} autorizado!`);
                location.reload();
            }
        }
    };
    xhttp.open("GET", `${backendServer}/grantToken.php?idProfe=${idProfe}&passw=${givenPassword}&tipo=${tipo}`, true);
    xhttp.send(null);
});




