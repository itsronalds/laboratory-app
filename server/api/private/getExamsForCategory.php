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

  $examsCategory = $_GET["examsCategory"];

  $query = "SELECT * FROM exams WHERE examsCategory = :examsCategory";

  $sql = $connection->prepare($query);
  $sql->bindParam(":examsCategory", $examsCategory);
  $sql->execute();
  $rows = $sql->fetchAll(PDO::FETCH_OBJ);

  if (count($rows) > 0) {
    $json = json_encode(["success" => true, "exams" => $rows]);
    echo $json;
  }

  $connection = null;