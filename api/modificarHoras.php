<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");

require "_auth.php";

$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";
//$conn = new mysqli($servername, $username, $password, $dbname);
$conn = new mysqli("localhost", "arturo", "cuceimobile", "chronoss_php");


try{
    $codigo = $_POST["codigo"];
    $token = $_POST["token"];
    $delta = $_POST["delta"];

    $idProfe = getProfe($conn, $codigo);
    
    if(autenticarToken($conn, "profe", $token, $idProfe) == 1){
        $delta = $delta*60*60;
        $query = sprintf("update prestador set tiempoAcumulado = tiempoAcumulado + %s where idPrestador = %s", $delta, $codigo);
        $conn->query($query);
        echo ($delta/3600)." horas ajustadas";
    }else{
        echo "X";
    }
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();

?>
