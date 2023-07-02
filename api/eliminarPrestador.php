<?php
//header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Methods: GET, OPTIONS, POST");

require "_auth.php";

$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";
$conn = new mysqli($servername, $username, $password, $dbname);
//$conn = new mysqli("localhost", "arturo", "cuceimobile", "chronoss_php");


try{
    $codigo = $_POST["codigo"];
    $token = $_POST["token"];
    
    $idProfe = getProfe($conn, $codigo);
    
    if(autenticarToken($conn, "profe", $token, $idProfe) == 1){
        $query = sprintf("delete from timelog where prestador = %s", $codigo);
        $result = $conn->query($query);

        $query = sprintf("delete from prestador where idPrestador = %s", $codigo);
        $result2 = $conn->query($query);

        echo "Prestador eliminado";
    }else{
        echo "X";
    }
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();

?>
