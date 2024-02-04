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

  try {
    $query = "DELETE FROM employees WHERE IDEmployee = :IDEmployee";
    $sql = $connection->prepare($query);
    $sql->bindParam(":IDEmployee", $_GET["id"]);
    $sql->execute();

    $json = json_encode(["success" => true, "message" => "Empleado eliminado con exito!"]);
    echo $json;

    $connection = null;
  } catch (Exception $e) {
    echo $e->getMessage();
  }
