const backendServer = "https://chronoss.mx/api";
//const backendServer = "http://localhost:8000";


document.querySelector("#autorizar-button").addEventListener("click", function(){
    let idProfe = document.querySelector("#idprofe-input").value;
    let givenPassword = document.querySelector("#password-input").value;
    let tipo = document.querySelector("#tipo-combo").value;


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = xhttp.responseText;
            console.log(respuesta);
            if(respuesta == "X"){
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
    xhttp.open("GET", `${backendServer}/grantToken.php?idprofe=${idProfe}&password=${givenPassword}&tipo=${tipo}`, true);
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


