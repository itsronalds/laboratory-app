<?php
  require "./../../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit();
  }
  
  $data = json_decode(file_get_contents("php://input"), true);

  require "./../../../validations/auth.php";

  $validation = adminLogInValidation($data);

  if ($validation !== 1) {
    $errors = json_encode(["success" => false, "message" => $validation["message"]]);
    echo $errors;

    exit();
  }

  require "./../../../database/connection.php";
  require "./../auth.php";

  $auth = new Auth();
  $auth->adminLogIn($data, $connection);