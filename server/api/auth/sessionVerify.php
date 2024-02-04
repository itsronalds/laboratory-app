<?php

  require "./../../config/headers.php";

  if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    exit();
  }

  $headers = getallheaders();

  if (!isset($headers["X-Access-Token"])) {
    $json = json_encode(["success" => true, "auth" => false, "role" => ""]);
    echo $json;

    exit();
  } 

  require "./../../utils/encrypt.php";

  $data = decrypt($headers["X-Access-Token"]);
  $data = json_decode($data);

  if (isset($data->role) && isset($data->id)) {
    $json = json_encode(["success" => true, "auth" => true, "role" => $data->role]);
    echo $json;
  } else {
    $json = json_encode(["success" => true, "auth" => false, "role" => ""]);
    echo $json;

    exit();
  }

  /*
  header('Set-Cookie: PHPSESSID= ' . session_id() . '; SameSite=None; Secure'); 
  session_start();

  if (!isset($_SESSION["token"])) {
    $json = json_encode(["success" => true, "auth" => false, "role" => ""]);

    echo $json;
    exit();
  }
  */



  // $json = json_encode(["success" => true, "auth" => true, "role" => $_SESSION["token"]["role"]]);

  // echo $json;