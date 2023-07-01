<?php    
$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";
$conn = new mysqli($servername, $username, $password, $dbname);


try{
    $idProfe = $_POST["idprofe"];
    $dependencia = $_POST["dependencia"];
    $nombre = $_POST["nombre"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    $passwordHasheado = password_hash($password, PASSWORD_DEFAULT);

    $query = sprintf("insert into encargado (idEncargado, passw, dependencia, nombre, email) ".
                     "values(%s, '%s', '%s', '%s', '%s')", $idProfe, $passwordHasheado, $dependencia, $nombre, $email);
    
    $result = $conn->query($query);
    $result = $conn->query($query);
    echo $result;
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();

?>
