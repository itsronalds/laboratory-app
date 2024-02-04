<?php

  function adminLogInValidation($data) {
    extract($data);

    if (!filter_var($adminEmail, FILTER_VALIDATE_EMAIL)) {
      return ["success" => 0, "message" => "Email inválido"];
    }

    if ($adminPassword === "") {
      return ["success" => 0, "message" => "Email inválido"];
    }

    return 1;
  }