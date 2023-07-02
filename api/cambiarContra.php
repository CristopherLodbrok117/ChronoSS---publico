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
    $idProfe = $_POST["idprofe"];
    $oldpassword = $_POST["vieja"];
    $newpassword= $_POST["nueva"];
    if(autenticarPassword($conn, $oldpassword, $idProfe) == 1){
        $passwordHasheado = password_hash($newpassword, PASSWORD_DEFAULT);
        $query = sprintf("update encargado set passw = '%s' where idEncargado = %s ",
                         $passwordHasheado, $idProfe);
        $conn->query($query);
        $query = sprintf("delete from token where dueno = %s", $idProfe);
        $conn->query($query);
    }else{
        echo "X";
    }
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();


?>
