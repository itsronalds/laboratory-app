<?php

  require "./../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    return;
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

  if (count($_POST) < 1 && count($_FILES) < 1) {
    return;
  } 

  require "./../../database/connection.php";

  require './../../validations/admin.php';

  $validation = addEmployeeValidation($_POST);

  if ($validation !== 1) {
    $errors = ["success" => false, "message" => $validation["message"]];
    echo json_encode($errors);
    
    exit();
  }

  extract($_POST);

  try {
    $query = $connection->prepare("SELECT IDEmployee FROM employees WHERE employeeEmail = :employeeEmail OR employeeDni = :employeeDni");
    $query->bindParam(":employeeEmail", $employeeEmail);
    $query->bindParam(":employeeDni", $employeeDni);
    $query->execute();
    $rows = $query->fetchAll(PDO::FETCH_OBJ);

    if (count($rows) > 0) {
      $errors = ["success" => false, "message" => "El empleado se encuentra registrado"];
      echo json_encode($errors);

      exit();
    }

    $employeeAvatar = $_FILES["employeeAvatar"]["tmp_name"];
    $employeeAvatar = "data:image/png;base64," . base64_encode(file_get_contents($employeeAvatar));
  
    srand(time());
    $employeeCode = rand();
    $employeeCode = strval($employeeCode);
    $employeeCode = $employeeCode[0] . $employeeCode[1] . $employeeCode[2] . $employeeCode[3];
    $employeeCode = intval($employeeCode);

    $employeePassword = password_hash($employeePassword, PASSWORD_BCRYPT);

    $query = $connection->prepare("INSERT INTO employees(employeeCode, employeeFullname, employeeDni, employeeEmail, employeePassword, employeeAddress, employeeAvatar) 
    VALUES(:employeeCode, :employeeFullname, :employeeDni, :employeeEmail, :employeePassword, :employeeAddress, :employeeAvatar)");
    $query->bindParam(":employeeCode", $employeeCode);
    $query->bindParam(":employeeFullname", $employeeFullname);
    $query->bindParam(":employeeDni", $employeeDni);
    $query->bindParam(":employeeEmail", $employeeEmail);
    $query->bindParam(":employeePassword", $employeePassword);
    $query->bindParam(":employeeAddress", $employeeAddress);
    $query->bindParam(":employeeAvatar", $employeeAvatar);
    $query->execute();

    $json = json_encode(["success" => true, "message" => "Registro exitoso"]);

    echo $json;

    $connection = null;
  } catch(Exception $e) {
    echo $e->getMessage();
  }