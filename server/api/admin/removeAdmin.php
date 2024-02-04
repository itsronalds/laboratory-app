<?php

  require "./../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
    exit();
  }

  /*
  session_start();

  if (!isset($_SESSION["token"])) {
    exit();
  }
  */

  require "./../../utils/session.php";

  $headers = getallheaders();
  $access = verifySession($headers);

  if ($access === 0) {
    return;
  }
  
  require "./../../database/connection.php";

  
  $IDAdmin = $_GET["id"];

  $query = "DELETE FROM admins WHERE IDAdmin = :IDAdmin";

  $sql = $connection->prepare($query);
  $sql->bindParam(":IDAdmin", $IDAdmin);
  $sql->execute();

  $json = json_encode(["success" => true, "message" => "Admin eliminado con exito"]);

  echo $json;

  $connection = null;