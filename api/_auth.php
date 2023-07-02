<?php


function autenticarPassword($conn, $passw, $idProfe) {
    $query = sprintf("select passw from encargado where idEncargado = %s", $idProfe);
    $result = $conn->query($query);
    if($result->num_rows < 1){
        return 0;
    }
    $row = $result->fetch_assoc();
    $realPW = $row["passw"];

    if (password_verify($passw, $realPW)){
        return 1;
    }else{
        return 0;
    }
}

function autenticarToken($conn, $tipo, $givenToken, $idProfe){
    $query = sprintf("select content from token where dueno = %s and tipo = '%s'", $idProfe, $tipo);
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            if($givenToken == $row("content")){
                return 1;
            }       
        }
    }
    return 0;
}

function getProfe($conn, $idPrestador){
    $query = sprintf("select jefe from prestador where idPrestador = %s", $idPrestador);
    $result = $conn->query($query);
    if($result->num_rows < 1){
        return 0;
    }
    $row = $result->fetch_assoc();
    return $row["jefe"];
}

?>