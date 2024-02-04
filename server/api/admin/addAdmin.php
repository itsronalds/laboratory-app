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

  # Archivo de base de datos
  require "./../../database/connection.php";

  require './../../validations/admin.php';

  $validation = addAdminValidation($_POST);

  if ($validation !== 1) {
    $errors = ["success" => false, "message" => $validation["message"]];
    echo json_encode($errors);
    
    exit();
  }

  # Obtenemos todos los datos por su nombre de variable
  extract($_POST);

  try {
    # Hacemos una consulta para verificar que el admin no exista
    $query = $connection->prepare("SELECT IDAdmin FROM admins WHERE adminEmail = :adminEmail OR adminDni = :adminDni");
    $query->bindParam(":adminEmail", $adminEmail);
    $query->bindParam(":adminDni", $adminDni);
    $query->execute();
    $rows = $query->fetchAll(PDO::FETCH_OBJ);

    if (count($rows) > 0) {
      $errors = ["success" => false, "message" => "El administrador se encuentra registrado"];
      echo json_encode($errors);

      exit();
    }

    # Admin avatar
    $adminAvatar = $_FILES["adminAvatar"]["tmp_name"];
    $adminAvatar = "data:image/png;base64," . base64_encode(file_get_contents($adminAvatar));

    # Admin code
    srand(time());
    $adminCode = rand();
    $adminCode = strval($adminCode);
    $adminCode = $adminCode[0] . $adminCode[1] . $adminCode[2] . $adminCode[3];
    $adminCode = intval($adminCode);

    # Hash password
    $adminPassword = password_hash($adminPassword, PASSWORD_BCRYPT);

    # Sql insert
    $query = $connection->prepare("INSERT INTO admins(adminCode, adminFullname, adminDni, adminEmail, adminPassword, adminAvatar) 
    VALUES(:adminCode, :adminFullname, :adminDni, :adminEmail, :adminPassword, :adminAvatar)");
    $query->bindParam(":adminCode", $adminCode);
    $query->bindParam(":adminFullname", $adminFullname);
    $query->bindParam(":adminDni", $adminDni);
    $query->bindParam(":adminEmail", $adminEmail);
    $query->bindParam(":adminPassword", $adminPassword);
    $query->bindParam(":adminAvatar", $adminAvatar);
    $query->execute();

    $json = json_encode(["success" => true, "message" => "Registro exitoso"]);

    echo $json;

    # Close db connection
    $connection = null;
  } catch(Exception $e) {
    echo $e->getMessage();
  }
  
  



