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

  if (empty($employeePassword)) {
    $query = "UPDATE employees SET employeeFullname = :employeeFullname, employeeDni = :employeeDni, employeeEmail = :employeeEmail, employeeAddress = :employeeAddress WHERE IDEmployee = :IDEmployee";

    $sql = $connection->prepare($query);
    $sql->bindParam(":employeeFullname", $employeeFullname);
    $sql->bindParam(":employeeDni", $employeeDni);
    $sql->bindParam(":employeeEmail", $employeeEmail);
    $sql->bindParam(":employeeAddress", $employeeAddress);
    $sql->bindParam(":IDEmployee", $IDEmployee);
    $sql->execute();

    $json = json_encode(["success" => true, "message" => "Empleado actualizado"]);

    echo $json;

    $connection = null;
  } else {
    $employeePassword = password_hash($employeePassword, PASSWORD_BCRYPT);

    $query = "UPDATE employees SET employeeFullname = :employeeFullname, employeeDni = :employeeDni, employeeEmail = :employeeEmail, employeePassword = :employeePassword, employeeAddress = :employeeAddress WHERE IDEmployee = :IDEmployee";

    $sql = $connection->prepare($query);
    $sql->bindParam(":employeeFullname", $employeeFullname);
    $sql->bindParam(":employeeDni", $employeeDni);
    $sql->bindParam(":employeeEmail", $employeeEmail);
    $sql->bindParam(":employeePassword", $employeePassword);
    $sql->bindParam(":employeeAddress", $employeeAddress);
    $sql->execute();

    $json = json_encode(["success" => true, "message" => "Empleado actualizado"]);

    echo $json;

    $connection = null;
  }