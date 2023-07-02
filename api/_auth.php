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








?>