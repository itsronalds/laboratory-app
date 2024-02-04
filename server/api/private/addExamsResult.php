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
  extract($data);

  if ($peopleExamsResult === "") {
    $errors = ["success" => false, "message" => "Resultado requerido"];
    $json = json_encode($errors);

    echo $json;

    exit();
  }

  require "./../../database/connection.php";

  try {
    $query = "UPDATE peopleExams SET peopleExamsResult = :peopleExamsResult WHERE IDPeopleExams = :IDPeopleExams";
    $sql = $connection->prepare($query);
    $sql->bindParam(":peopleExamsResult", $peopleExamsResult);
    $sql->bindParam(":IDPeopleExams", $IDPeopleExams);
    $sql->execute();

    $json = json_encode(["success" => true, "message" => "Resultado de examen agregado con exito!"]);
    echo $json;

    $connection = null;
  } catch (Exception $e) {
    echo $e->getMessage();
  }



  