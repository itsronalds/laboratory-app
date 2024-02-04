<?php
  require "./../../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    exit();
  }

  require "./../../../utils/session.php";

  $headers = getallheaders();
  $access = verifySession($headers);

  if ($access === 0) {
    return;
  }

  require "./../../../database/connection.php";

  try {     
    $query = $connection->prepare("SELECT adminCode, adminFullname, adminAvatar FROM admins WHERE IDAdmin = :IDAdmin");
    $query->bindParam(":IDAdmin", $access->id);
    $query->execute();
    $row = $query->fetch(PDO::FETCH_OBJ);

    $json = json_encode(["success" => true, "data" => $row]);

    echo $json;
  } catch (Exception $e) {
    echo $e->getMessage();
  }

  /*
  session_start();

  if (!isset($_SESSION["token"])) {
    exit();
  }

  require "./../../../database/connection.php";

  try {     
  $query = $connection->prepare("SELECT adminCode, adminFullname, adminAvatar FROM admins WHERE IDAdmin = :IDAdmin");
  $query->bindParam(":IDAdmin", $_SESSION["token"]["id"]);
  $query->execute();
  $row = $query->fetch(PDO::FETCH_OBJ);

  $json = json_encode(["success" => true, "data" => $row]);

  print_r($json);
  } catch (Exception $e) {
    echo $e->getMessage();
  }
  */
