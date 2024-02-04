<?php
  require "./../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "GET") {
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

  $query = "SELECT IDPeopleExams, peopleFullname, peopleDni, peopleExamsCategory, peopleExamsName FROM peopleExams WHERE peopleExamsResult IS null";

  $sql = $connection->prepare($query);
  $sql->execute();
  $rows = $sql->fetchAll(PDO::FETCH_OBJ);
  
  if (count($rows) > 0) {
    $json = json_encode(["success" => true, "exams" => $rows]);

    echo $json;
  }

  $connection = null;
  