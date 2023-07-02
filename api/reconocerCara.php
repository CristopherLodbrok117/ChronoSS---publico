<?php
//header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Methods: GET, OPTIONS, POST");


$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";
$conn = new mysqli($servername, $username, $password, $dbname);
//$conn = new mysqli("localhost", "arturo", "cuceimobile", "chronoss_php");


try{
    $idProfe = $_GET["idprofe"];
    $cara = $_GET["rasgos"];
    $cara = trim($cara, "][");
    $cara = explode(",", $cara);
    $cara = array_map('floatval', $cara);

    $query = sprintf("select idPrestador, nombre, cara from prestador where jefe = %s", $idProfe);
    $result = $conn->query($query);
    $distancias = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $vector = $row["cara"];
            $vector = trim($vector, "][");
            $vector = explode(", ", $vector);
            $vector = array_map('floatval', $vector);
            $r = array(
                "idprestador" => $row["idPrestador"],
                "nombre" => $row["nombre"],
                "delta" => euclides($cara, $vector)
            );
            array_push($distancias, $r);
        }
    }
    echo json_encode($distancias);
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();


function euclides($cara, $vector){
    $acum = 0;
    for($i = 0;$i < count($cara);$i++){
        $dif = $cara[$i] - $vector[$i];
        $dif = abs($dif);
        $dif = $dif**2;
        $acum += $dif;
    }
    return sqrt($acum);
}


?>
