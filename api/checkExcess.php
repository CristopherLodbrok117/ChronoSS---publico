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


$query = "select prestador, max(stamp) as stamp".
         " from timelog".
         " inner join prestador on timelog.prestador = prestador.idPrestador".
         " where enServicio = true".
         " group by prestador;";

$activos = $conn->query($query);
$respuesta = 0;
if ($activos->num_rows > 0) {
    while($row = $activos->fetch_assoc()) {
        $dif = time() - strtotime($row["stamp"]);
        $codigo = $row["prestador"];
        if($dif >= 8*60*60){
            $conn->query("update prestador set enServicio = false where idPrestador = ".$codigo.";");
            $conn->query("insert into timelog(prestador, tipo) values(".$codigo.", 'sal');");
            echo "1";
        }
    }
}
$conn->close();
?>