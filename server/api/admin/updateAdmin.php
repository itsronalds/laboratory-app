<?php
  require "./../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
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

  $data = json_decode(file_get_contents("php://input"), true);

  extract($data);

  if (empty($adminPassword)) {
    $query = "UPDATE admins SET adminFullname = :adminFullname, adminDni = :adminDni, adminEmail = :adminEmail WHERE IDAdmin = :IDAdmin";

    $sql = $connection->prepare($query);
    $sql->bindParam(":adminFullname", $adminFullname);
    $sql->bindParam(":adminDni", $adminDni);
    $sql->bindParam(":adminEmail", $adminEmail);
    $sql->bindParam(":IDAdmin", $IDAdmin);
    $sql->execute();

    $json = json_encode(["success" => true, "newAdmin" => $data]);

    echo $json;

    $connection = null;
  } else {
    $adminPassword = password_hash($adminPassword, PASSWORD_BCRYPT);

    $query = "UPDATE admins SET adminFullname = :adminFullname, adminDni = :adminDni, adminEmail = :adminEmail, adminPassword = :adminPassword WHERE IDAdmin = :IDAdmin";

    $sql = $connection->prepare($query);
    $sql->bindParam(":adminFullname", $adminFullname);
    $sql->bindParam(":adminDni", $adminDni);
    $sql->bindParam(":adminEmail", $adminEmail);
    $sql->bindParam(":adminPassword", $adminPassword);
    $sql->bindParam(":IDAdmin", $IDAdmin);
    $sql->execute();

    $data["adminPassword"] = "";

    $json = json_encode(["success" => true, "newAdmin" => $data]);

    echo $json;

    $connection = null;
  }