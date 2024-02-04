<?php
  require "./../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
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

  try {
    $query = "DELETE FROM peopleExams WHERE IDPeopleExams = :IDPeopleExams";
    $sql = $connection->prepare($query);
    $sql->bindParam(":IDPeopleExams", $_GET["id"]);
    $sql->execute();

    $json = json_encode(["success" => true, "message" => "Exámen eliminado con exito!"]);
    echo $json;

    $connection = null;
  } catch (Exception $e) {
    echo $e->getMessage();
  }
