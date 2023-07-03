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
    $idProfe = $_POST["idprofe"];
    $dependencia = $_POST["dependencia"];
    $nombre = $_POST["nombre"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    $passwordHasheado = password_hash($password, PASSWORD_DEFAULT);
    $newHash = bin2hex(random_bytes(75));

    $query = sprintf("insert into verifEncargado (idEncargado, passw, dependencia, nombre, email, verifToken) ".
                     "values(%s, '%s', '%s', '%s', '%s', '%s')", $idProfe, $passwordHasheado, $dependencia, $nombre, $email, $newHash);
    
    $conn->query($query);

    $subject = "Verificación de correo - ChronoSS";
    $msg = '
        <div style="
        background: white;
        background-image: radial-gradient(rgb(201, 201, 201) 1px, transparent 0);
        background-size: 40px 40px;
        text-align: center;">
            <h1>Verificación de correo electrónico para encargado.</h1>
            <img src="https://chronoss.mx/img/chronoss_logo.png" alt="chronoss logo" width="283" style="filter: invert(100%) hue-rotate(180deg) saturate(3);">
            <p>Por favor haga click en el siguiente botón para completar su registro</p>
            <a href="https://chronoss.mx/conf.php?hash='.$newHash.'"><button style="
                cursor: pointer;
                font-weight: 600;
                border-radius: 3px;
                padding: 12px 24px;
                border: 0;
                color: #000021;
                background: #1de9b6;
                font-size: 16px;
                margin-bottom: 60px;
                ">Verificar</button></a>
            <p><strong>En caso de no poder usar el botón copie y pegue el la siguiente URL en su navegador: </strong></p>
            <p style="word-break: break-all	;">https://chronoss.mx/conf.php?hash='.$newHash.'</p>
        </div>
    ';

    $headers  = "From: webmaster@chronoss.mx\r\n";
    $headers .= "Reply-To: webmaster@chronoss.mx\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    mail($email, $subject, $msg, $headers);

    echo "Se envio correo de verificación";
}

catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();

?>
