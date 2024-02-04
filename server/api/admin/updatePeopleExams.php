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

  $data = json_decode(file_get_contents("php://input"), true);
  extract($data);

  require "./../../database/connection.php";

  try {
    $query = "UPDATE peopleExams SET peopleFullname = :peopleFullname, peopleDni = :peopleDni, peopleEmail = :peopleEmail WHERE IDPeopleExams = :IDPeopleExams";
    $sql = $connection->prepare($query);
    $sql->bindParam(":peopleFullname", $peopleFullname);
    $sql->bindParam(":peopleDni", $peopleDni);
    $sql->bindParam(":peopleEmail", $peopleEmail);
    $sql->bindParam(":IDPeopleExams", $IDPeopleExams);
    $sql->execute();

    $json = json_encode(["success" => true, "message" => "Datos de usuario actualizados con exito!"]);

    echo $json;
  } catch (Exception $e) {
    echo $e->getMessage();
  }
