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
    $idProfe = $_GET["idprofe"];
    $token = $_GET["token"];
    if(autenticarToken($conn, "terminal", $token, $idProfe) == 1){
        $query = sprintf("select idPrestador, nombre from prestador where enServicio = 1 and jefe = %s", $idProfe);
        $result = $conn->query($query);

        $senddata = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                
                $arr = array("codigo" => $row["idPrestador"],
                            "nombre" => $row["nombre"],
                            "timestamp" => getDiferencia($conn, $row["idPrestador"])
                            );
                array_push($senddata, $arr);
            }
        }
        echo json_encode($senddata);
    }else{
        echo "X";
    }
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();



function getDiferencia($conn, $codigoUsuario){
    $query = "select stamp from timelog ".
              "where prestador = ".$codigoUsuario." and ".
              "tipo = 'ent' ".
              "order by stamp desc ".
              "limit 1;";
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    return time() - strtotime($row["stamp"]);
  }
?>
