<?php
require "_auth.php";

$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";
$conn = new mysqli($servername, $username, $password, $dbname);


try{
    $idProfe = $_GET["idprofe"];
    $password = $_GET["password"];
    $tipo = $_GET["tipo"];
    
    if(autenticarPassword($conn, $password, $idProfe) == 1){
        $newToken = bin2hex(random_bytes(150));
        $query = sprintf("insert into token (content, dueno, tipo) values('%s', '%s', '%s')",
                         $newToken, $idProfe, $tipo);
        $conn->query($query);
        echo $newToken;
    }else{
        echo "X";
    }
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();


?>
