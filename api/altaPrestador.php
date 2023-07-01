<?php
$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";
$conn = new mysqli($servername, $username, $password, $dbname);


try{
    //$idProfe = $_POST["idprofe"];
    $idProfe = 777;
    $codigo = $_POST["codigo"];
    $nombre = $_POST["nombre"];
    $rasgos = $_POST["rasgos"];

    $query = sprintf("insert into prestador (idPrestador, nombre, jefe, cara) values (%s, '%s', %s, '%s')", $codigo, $nombre, $idProfe, $rasgos);
    $result = $conn->query($query);

    echo $result;
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();

?>
