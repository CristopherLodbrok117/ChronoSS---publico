//const backendServer = "http://127.0.0.1:5000";
//const backendServer = "http://148.202.152.33/Servicio_Social";
const backendServer = "https://chronoss.mx/api";


document.querySelector("#autorizar-button").addEventListener("click", function(){
    let idProfe = document.querySelector("#idprofe-input").value;
    let givenPassword = document.querySelector("#password-input").value;
    let tipo = document.querySelector("#tipo-combo").value;


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = xhttp.responseText;
            if(respuesta == "0"){
                alert("error");
                location.reload();
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



document.querySelector("#boton-cambiar").addEventListener("click", function(){
    let viejacontra = document.querySelector("#old-pw").value;
    let nuevacontra = document.querySelector("#new-pw").value;
    let nuevacontra2 = document.querySelector("#new-pw-rep").value;
    
    if(nuevacontra != nuevacontra2){
        alert("La nueva contraseñas no coincide!");
        return;
    }

    const senddata = new FormData();
    senddata.append("contra", viejacontra);
    senddata.append("contranueva", nuevacontra);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = xhttp.responseText;
            if(respuesta == "-1"){
                alert("Contraseña vieja erronea");
                location.reload();
            }else{
                alert("La contraseña se cambió!");
                location.reload();
            }
        }
    };
    xhttp.open("POST", `${backendServer}/cambiarContra.php`, true);
    xhttp.send(senddata);
});


