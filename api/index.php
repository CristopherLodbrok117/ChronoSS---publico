<?php
$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";

$conn = new mysqli($servername, $username, $password, $dbname);

$query = "select idencargado, nombre, dependencia from encargado";


$result = $conn->query($query);
$row = $result->fetch_assoc();

echo $row["idencargado"].",".$row["nombre"].",".$row["dependencia"];

$conn->close();

















?>