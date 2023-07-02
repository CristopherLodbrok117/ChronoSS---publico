<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
  
$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";
//$conn = new mysqli($servername, $username, $password, $dbname);
$conn = new mysqli("localhost", "arturo", "cuceimobile", "chronoss_php");


try{
    //$idProfe = $_POST["idprofe"];
    $codigo = $_POST["codigo"];

    $query = sprintf("delete from timelog where prestador = %s", $codigo);
    $result = $conn->query($query);

    $query = sprintf("delete from prestador where idPrestador = %s", $codigo);
    $result2 = $conn->query($query);

    echo $result.$result2;
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();

?>
