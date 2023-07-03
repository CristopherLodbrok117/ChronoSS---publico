const backendServer = "https://chronoss.mx/api";


document.querySelector("#boton-autorizar").addEventListener("click", function(){ 
    let idProfe = document.querySelector("#id-profe").value;
    let givenPassword = document.querySelector("#password-profe").value;
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


