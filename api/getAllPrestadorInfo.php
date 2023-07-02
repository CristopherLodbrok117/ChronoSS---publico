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
    if(autenticarToken($conn, "profe", $token, $idProfe) == 1){
        $query = sprintf("select idPrestador, nombre, enServicio, tiempoAcumulado from prestador where jefe = %s", $idProfe);
        $result = $conn->query($query);

        $senddata = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $timelogs = array();
                $res = $conn->query("select tipo, stamp from timelog where prestador = ".$row["idPrestador"].";");
                if($res->num_rows > 0){
                    while($r = $res->fetch_assoc()){
                        $a = array("stamp" => $r["stamp"], "tipo" => $r["tipo"]);
                        array_push($timelogs, $a);
                    }
                }
                $arr = array("codigo" => $row["idPrestador"],
                            "nombre" => $row["nombre"],
                            "enServicio" => $row["enServicio"],
                            "tiempoAcumulado" => $row["tiempoAcumulado"],
                            
                            "timelogs" => $timelogs
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

?>
