<?php
  require "./../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "POST") {
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

  $data = json_decode(file_get_contents("php://input"), true);

  require "./../../database/connection.php";

  require "./../../validations/admin.php";
  require "./../../utils/date.php";

  $validation = addExamsValidation($data);

  if ($validation !== 1) {
    $errors = ["success" => false, "message" => $validation["message"]];
    echo json_encode($errors);

    exit();
  }

  extract($data);

  try {
    $query = $connection->prepare("SELECT IDExams FROM exams WHERE examsName = :examsName AND examsCategory = :examsCategory");
    $query->bindParam(":examsName", $examsName);
    $query->bindParam(":examsCategory", $examsCategory);
    $query->execute();
    $rows = $query->fetchAll(PDO::FETCH_OBJ);

    if (count($rows) > 0) {
      $errors = ["success" => false, "message" => "El examen se encuentra registrado"];
      echo json_encode($errors);

      exit();
    }

    $query = $connection->prepare("INSERT INTO exams(examsName, examsCategory, examsPrice) VALUES(:examsName, :examsCategory, :examsPrice)");
    $query->bindParam(":examsName", $examsName);
    $query->bindParam(":examsCategory", $examsCategory);
    $query->bindParam(":examsPrice", $examsPrice);
    $query->execute();

    $newExams = ["IDExams" => $connection->lastInsertId(), "examsName" => $examsName, "examsCategory" => $examsCategory, "examsPrice" => $examsPrice, "examsCreatedAt" => getCurrentDatetime()];

    $json = json_encode(["success" => true, "newExams" => $newExams, "message" => "Examen agregado"]);

    echo $json;

    $connection = null;
  } catch(Exception $e) {
    echo $e->getMessage();
  }