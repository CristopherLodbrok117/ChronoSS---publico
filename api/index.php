<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");


$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";

//$conn = new mysqli($servername, $username, $password, $dbname);
$conn = new mysqli("localhost", "arturo", "cuceimobile", "chronoss_php");

$query = "select idencargado, nombre, dependencia from encargado";


$result = $conn->query($query);
$row = $result->fetch_assoc();

echo $row["idencargado"].",".$row["nombre"].",".$row["dependencia"];

$conn->close();

















?>