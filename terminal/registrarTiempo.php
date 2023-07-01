<?php
$servername = "db5013554698.hosting-data.io";
$username = "dbu1229465";
$password = "cuceimobile";
$dbname = "dbs11355777";

$conn = new mysqli($servername, $username, $password, $dbname);

$codigoUsuario = $_POST["codigo"];

try{

$isActive = checkIfActive($conn, $codigoUsuario);

if($isActive == -1){
  echo "No hay alumno registrado con ese codigo";
}elseif($isActive == 0){
  $conn->query("update prestador set enServicio = true where idPrestador = ".$codigoUsuario.";");
  $conn->query("insert into timelog(prestador, tipo) values(".$codigoUsuario.", 'ent');");
  echo "Entraste";
}elseif($isActive == 1){
  $conn->query("update prestador set enServicio = false where idPrestador = ".$codigoUsuario.";");
  $diferenciaTiempo = getDiferencia($conn, $codigoUsuario);
  if($diferenciaTiempo < 8*60*60){
    $conn->query("update prestador set tiempoAcumulado = tiempoAcumulado + ".$diferenciaTiempo." where idPrestador = ".$codigoUsuario.";");
  }else{
    echo "x";
  }
  $conn->query("insert into timelog(prestador, tipo) values(".$codigoUsuario.", 'sal');");
  $acum = $conn->query("select tiempoAcumulado from prestador where idPrestador = ".$codigoUsuario.";");
  $segs = $acum->fetch_assoc();
  echo $segs["tiempoAcumulado"];
}
}
catch(Exception $e) {echo 'Message: ' .$e->getMessage();}

$conn->close();



function checkIfActive($conn, $idPrestador) {
  $query = "select enServicio from prestador where idPrestador = ".$idPrestador.";";
  $result = $conn->query($query);
  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
  } 
  else {
    return -1;
  }
  return $row["enServicio"];
}

function getDiferencia($conn, $codigoUsuario){
  $query = "select stamp from timelog ".
            "where prestador = ".$codigoUsuario." and ".
            "tipo = 'ent' ".
            "order by stamp desc ".
            "limit 1;";
  $result = $conn->query($query);
  $row = $result->fetch_assoc();
  return time() - strtotime($row["stamp"]);
}


function autenticar($givenToken, $tipo, $conn){    
  $query = "select valueToken from token where idToken = '".$tipo."';";
  $result = $conn->query($query);
  $row = $result->fetch_assoc();
  $realToken = $row["valueToken"];
  if($realToken == $givenToken){
      return 1;
  }else{
      return 0;
  }
}

?>