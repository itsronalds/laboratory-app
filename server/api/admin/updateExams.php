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

  require "./../../validations/admin.php";

  $data = json_decode(file_get_contents("php://input"), true);

  $validation = updateExamsValidation($data);

  if ($validation !== 1) {
    $errors = ["success" => true, "message" => $validation["message"]];
    echo json_encode($errors);

    exit();
  }

  require "./../../database/connection.php";

  extract($data);

  try {
    $query = $connection->prepare("UPDATE exams SET examsName = :examsName, examsCategory = :examsCategory, examsPrice = :examsPrice WHERE IDExams = :IDExams");
    $query->bindParam(":examsName", $examsName);
    $query->bindParam(":examsCategory", $examsCategory);
    $query->bindParam(":examsPrice", $examsPrice);
    $query->bindParam(":IDExams", $IDExams);
    $query->execute();

    $json = json_encode(["success" => true, "updatedExams" => $data, "message" => "Examen actualizado con exito!"]);

    echo $json;

    $connection = null;
  } catch (Exception $e) {
    echo $e->getMessage();
  }
  

