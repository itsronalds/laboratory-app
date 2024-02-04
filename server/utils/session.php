<?php

  function verifySession($headers) {
    if (!isset($headers["X-Access-Token"])) {
      $json = json_encode(["success" => false, "auth" => false, "role" => ""]);
      echo $json;
    
      exit();
    } 
    
    require "encrypt.php";
    
    $data = decrypt($headers["X-Access-Token"]);
    $data = json_decode($data);
    
    if (isset($data->role) && isset($data->id)) {
      return $data;
    } else {
        return 0;
      }
  }