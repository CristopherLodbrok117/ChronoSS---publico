<?php


try{
    require "_auth.php";

    $servername = "db5013554698.hosting-data.io";
    $username = "dbu1229465";
    $password = "cuceimobile";
    $dbname = "dbs11355777";
    $conn = new mysqli($servername, $username, $password, $dbname);

    $idProfe = $_POST["idprofe"];
    $codigo = $_POST["codigo"];
    $nombre = $_POST["nombre"];
    $rasgos = $_POST["rasgos"];
    $token = $_POST["token"];

    if(autenticarToken($conn, "terminal", $token, $idProfe) == 1){
        $query = sprintf("insert into prestador (idPrestador, nombre, jefe, cara) values (%s, '%s', %s, '%s')", $codigo, $nombre, $idProfe, $rasgos);
        $conn->query($query);
        echo 1;
    }else{
        echo "X";
    }
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();

?>
