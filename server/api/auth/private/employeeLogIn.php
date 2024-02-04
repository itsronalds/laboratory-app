<?php
  require "./../../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit();
  }

  $data = json_decode(file_get_contents("php://input"), true);
  extract($data);

  if ($employeeEmail === "" || !filter_var($employeeEmail, FILTER_VALIDATE_EMAIL)) {
    $errors = ["success" => false, "message" => "Credenciales inválidas"];
    $json = json_encode($errors);
    echo $json;

    exit();
  }

  if ($employeePassword === "") {
    $errors = ["success" => false, "message" => "Credenciales inválidas"];
    $json = json_encode($errors);
    echo $json;

    exit();
  }

  require "./../../../database/connection.php";
  require "./../auth.php";

  $auth = new Auth();
  $auth->employeeLogIn($data, $connection);