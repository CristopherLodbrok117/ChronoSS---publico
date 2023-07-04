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
    $hash = $_GET["hash"];

    $query = sprintf("select idEncargado, passw, dependencia, nombre, email ".
                     "from verifEncargado where verifToken = '%s'", $hash);

    $res = $conn->query($query);
    if($res->num_rows > 0){
        $row = $res->fetch_assoc();
        $query = sprintf("insert into encargado (idEncargado, passw, dependencia, nombre, email) ".
                         "values (%s, '%s', '%s', '%s', '%s')", 
                         $row["idEncargado"], 
                         $row["passw"], 
                         $row["dependencia"], 
                         $row["nombre"], 
                         $row["email"]
                    );
        $conn->query($query);

        $query = sprintf("delete from verifEncargado where idEncargado = %s", $row["idEncargado"]);
        $conn->query($query);
        echo 'Gracias por registrarse en el sistema <a href="https://chronoss.mx">ChronoSS</a>, '.$row["nombre"].".";
    }
    else{
        echo "Hash desconocido.";
    }
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();

?>
