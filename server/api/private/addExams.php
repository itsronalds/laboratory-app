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

  $data = json_decode(file_get_contents("php://input"), false);

  if ($data->userFullname === "") {
    $errors = ["success" => false, "message" => "Nombre completo requerido"];
    $json = json_encode($errors);

    echo $json;
    exit();
  }

  if (strlen($data->userDni) !== 8 || !preg_match("/^[0-9]+$/", $data->userDni)) {
    $errors = ["success" => false, "message" => "Cédula inválida"];
    $json = json_encode($errors);

    echo $json;
    exit();
  }

  require "./../../database/connection.php";

  $query = "SELECT examsPrice FROM exams WHERE examsCategory = :examsCategory AND examsName = :examsName";
  $sql = $connection->prepare($query);
  $sql->bindParam(":examsCategory", $data->examsCategory);
  $sql->bindParam(":examsName", $data->examsName);
  $sql->execute();
  $row = $sql->fetch(PDO::FETCH_OBJ);
  $examsPrice = $row->examsPrice;

  $query = "INSERT INTO peopleExams(peopleFullname, peopleDni, peopleEmail, peopleExamsCategory, peopleExamsName, peopleExamsPrice) 
  VALUES(:peopleFullname, :peopleDni, :peopleEmail, :peopleExamsCategory, :peopleExamsName, :peopleExamsPrice)";

  try {
    $sql = $connection->prepare($query);
    $sql->bindParam(":peopleFullname", $data->userFullname);
    $sql->bindParam(":peopleDni", $data->userDni);
    $sql->bindParam(":peopleEmail", $data->userEmail);
    $sql->bindParam(":peopleExamsCategory", $data->examsCategory);
    $sql->bindParam(":peopleExamsName", $data->examsName);
    $sql->bindParam(":peopleExamsPrice", $examsPrice);
    //$sql->bindParam(":peopleExamsResult", "");
    $sql->execute();

    $json = json_encode(["success" => true, "message" => "Examen médico agregado con exito"]);

    echo $json;

    $connection = null;
  } catch (Exception $e) {
    echo $e->getMessage();
  }



  