<?php

    Class Conexion extends mysqli {
        private $host = "localhost";
        private $db = "tapas";
        private $user = "tapas";
        private $pass = "tapas";

        public function __construct(){
            try{
                parent::__construct($this->host, $this->user, $this->pass, $this->db);
            }catch(mysqli_sql_exception $e){
                echo "Error". $e->getMessage();
                header("HTTP/1.1 400 Bad Rerquest");
                exit;
            }
        }
    }   

?>