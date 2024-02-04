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

  $IDExams = $_GET["id"];

  try {
    $query = $connection->prepare("DELETE FROM exams WHERE IDExams = :IDExams");
    $query->bindParam(":IDExams", $IDExams);
    $query->execute();

    $json = json_encode(["success" => true, "message" => "Examen eliminado con exito!"]);

    echo $json;

    $connection = null;
  } catch (Exception $e) {
    echo $e->getMessage();
  }