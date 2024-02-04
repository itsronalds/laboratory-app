<?php

  $servername = "127.0.0.1";
  $username = "root";
  $password = "12345678910";
  $dbname = "laboratory_db";
  $port = 3306;

  try {
    $connection = new PDO("mysql:host=$servername;dbname=$dbname;port=$port", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    # echo "Connected successfully";
} catch(PDOException $e) {
    echo $e->getMessage();
  }