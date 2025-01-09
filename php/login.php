<?php
    require_once('Conexion.php');
    require_once('../vendor/autoload.php');

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $con = new Conexion();

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $datos = json_decode(file_get_contents('php://input'),true);

        if($datos != null){
            $nombre = $datos['user'];
            $pass = $datos['contraseña'];

            try{
                $sql = "SELECT * FROM usuarios WHERE nombre = '$nombre'";
                $result = $con->query($sql);
                $usuario = $result->fetch_assoc();

                if($usuario && password_verify($pass, $usuario['pass'])){
                    $key = 'claveSecreta';
                    $alg = 'HS512';
                    $payload = [
                        'nombre' => $nombre,
                        'rol' => $usuario['rol'],
                        'iat' => time(),
                        'exp' => time() + 3600,
                    ];
                    $jwt = JWT::encode($payload, $key, $alg);
                    $respuesta = [
                        "nombre" => $nombre,
                        "rol" => $usuario['rol'],
                        "jwt" => $jwt,
                    ];
                    header("HTTP/1.1 200 Ok");
                    header("Content-type:Application/json");
                    echo json_encode($respuesta);
                    exit;
                }else{
                    header("HTTP/1.1 401 Unauthorized");
                    exit;
                }
            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 500 Interval Server Error");
                exit;
            }
        }
        header("HTTP/1.1 400 Bad Reuquest");
        exit;

    }

?>