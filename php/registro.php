<?php

    require_once('Conexion.php');

    $con = new Conexion();

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $datos = json_decode(file_get_contents("php://input"), true);

        if($datos != null){
            $nombre = $datos['nombre'];
            $apellido1 = $datos['apellido1'];
            $apellido2 = $datos['apellido2'];
            $correo = $datos['correo'];
            $pass = $datos['pass'];
            $confirmPass = $datos['confirmPass'];
            $privacidad = $datos['privacidad'];
            
            if($privacidad = 'on'){
                $privacidad = true;
            }else{
                $privacidad = false;
            }

            try{
                $sqlRepetido = "SELECT nombre FROM usuarios WHERE nombre = '$nombre' OR correo = '$correo'";
                $result = $con->query($sqlRepetido);
                $usuario_existe = $result->fetch_all(MYSQLI_ASSOC);

                if(!empty($usuario_existe)){
                    header("http/1.1 402 User already exist");
                    exit;
                }
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 500 Interval Server Error");
            }
            try{
                if($pass === $confirmPass){
                    $pass_has = password_hash($pass, PASSWORD_BCRYPT);
                    
                    $sql = "INSERT INTO usuarios (nombre, primerApellido, segundoApellido, correo, pass, politicas, rol) VALUES ('$nombre', '$apellido1', '$apellido2', '$correo', '$pass_has', '$privacidad', 'usuario')";
                    $con->query($sql);
                    if($con->affected_rows > 0){
                        $user = array();
                        $user['name'] = $nombre;
                        print_r($user);
                        echo json_encode($user);
                        header("HTTP/1.1 201 Created");
                    }

                }
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 500 interval Server Error");
            }
        }else{
            header("HTTP/1.1 400 Bad Request");
            
       }
        exit;
    }


?>