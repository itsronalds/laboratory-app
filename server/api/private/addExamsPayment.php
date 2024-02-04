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

  if ($bankName === "" || !preg_match("/^[a-zA-Z\s]+$/", $bankName)) {
    $errors = ["success" => false, "message" => "Nombre de banco requerido"];
    $json = json_encode($errors);
    echo $json;

    exit();
  }

  if ($accountNumber === "" || !preg_match("/^[0-9]+$/", $accountNumber)) {
    $errors = ["success" => false, "message" => "Número de cuenta requerido o inválido"];
    $json = json_encode($errors);
    echo $json;

    exit();
  }

  if (strlen($accountCode) !== 3 ||  !preg_match("/^[0-9]+$/", $accountCode)) {
    $errors = ["success" => false, "message" => "Número de cuenta requerido o inválido"];
    $json = json_encode($errors);
    echo $json;

    exit();
  }

  require "./../../database/connection.php";

  $query = "SELECT IDPeopleExams FROM peopleExams WHERE peopleFullname = :peopleFullname AND peopleDni = :peopleDni AND peopleEmail = :peopleEmail";
  $sql = $connection->prepare($query);
  $sql->bindParam(":peopleFullname", $peopleFullname);
  $sql->bindParam(":peopleDni", $peopleDni);
  $sql->bindParam(":peopleEmail", $peopleEmail);
  $sql->execute();
  $row = $sql->fetch(PDO::FETCH_OBJ);

  if (empty($row)) {
    $errors = ["success" => false, "message" => "Los datos de usuarios no se pueden cambiar"];
    $json = json_encode($errors);
    echo $json;

    $connection = null;

    exit();
  }

  try {
    $query = "INSERT INTO payments(IDPeopleExams, paymentBankName, paymentAccountNumber, paymentAccountCode) VALUES(:IDPeopleExams, :paymentBankName, :paymentAccountNumber, :paymentAccountCode)";
    $sql = $connection->prepare($query);
    $sql->bindParam(":IDPeopleExams", $IDPeopleExams);
    $sql->bindParam(":paymentBankName", $bankName);
    $sql->bindParam(":paymentAccountNumber", $accountNumber);
    $sql->bindParam(":paymentAccountCode", $accountCode);
    $sql->execute();

    $peopleExamsPaymentStatus = true;

    $query = "UPDATE peopleExams SET peopleExamsPaymentStatus = :peopleExamsPaymentStatus WHERE IDPeopleExams = :IDPeopleExams";
    $sql = $connection->prepare($query);
    $sql->bindParam(":peopleExamsPaymentStatus", $peopleExamsPaymentStatus);
    $sql->bindParam(":IDPeopleExams", $IDPeopleExams);
    $sql->execute();

    $json = json_encode(["success" => true, "message" => "Pago agregado"]);
    echo $json;

    $connection = null;
  } catch (Exception $e) {
    echo $e->getMessage();
  }
  


  