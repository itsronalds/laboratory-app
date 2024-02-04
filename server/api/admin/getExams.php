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

  $query = $connection->prepare("SELECT * FROM exams");
  $query->execute();
  $rows = $query->fetchAll(PDO::FETCH_OBJ);

  if (count($rows) < 1) {
    exit();
  }

  $json = json_encode(["success" => true, "exams" => $rows]);

  echo $json;

  $connection = null;