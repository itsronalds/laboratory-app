<?php

  function addAdminValidation($data) {
    extract($data);

    if ($adminFullname === "" || !preg_match("/^[a-zA-Z\s]+$/", $adminFullname)) {
      return array("success" => 0, "message" => "Nombre completo inválido");
    }

    if ($adminDni === "" || !preg_match("/^[0-9]+$/", $adminDni)) {
      return array("success" => 0, "message" => "Número de cédula requerido");
    }

    if (strlen($adminDni) !== 8) {
      return array("success" => 0, "message" => "Número de cédula requerido");
    }

    if (!filter_var($adminEmail, FILTER_VALIDATE_EMAIL)) {
      return array("success" => 0, "message" => "Email inválido");
    }

    if ($adminPassword === "") {
      return array("success" => 0, "message" => "Cotraseña requerida");  
    }

    if (count($_FILES) < 1) {
      return array("success" => 0, "message" => "Avatar requerido");   
    }

    # Admin avatar validation
    $isCorrectType = str_starts_with($_FILES["adminAvatar"]["type"], "image");

    # Si es diferente a verdadero(true = 1)
    if ($isCorrectType != 1) {
      return array("success" => 0, "message" => "Avatar inválido");
    }

    return 1;
  }

  function addEmployeeValidation($data) {
    extract($data);

    if ($employeeFullname === "" || !preg_match("/^[a-zA-Z\s]+$/", $employeeFullname)) {
      return array("success" => 0, "message" => "Nombre completo inválido");
    }

    if ($employeeDni === "" || !preg_match("/^[0-9]+$/", $employeeDni)) {
      return array("success" => 0, "message" => "Número de cédula requerido");
    }

    if (strlen($employeeDni) !== 8) {
      return array("success" => 0, "message" => "Número de cédula requerido");
    }

    if (!filter_var($employeeEmail, FILTER_VALIDATE_EMAIL)) {
      return array("success" => 0, "message" => "Email inválido");
    }

    if ($employeePassword === "") {
      return array("success" => 0, "message" => "Cotraseña requerida");  
    }

    if ($employeeAddress === "") {
      return array("success" => 0, "message" => "Dirección requerida");  
    }

    if (count($_FILES) < 1) {
      return array("success" => 0, "message" => "Avatar requerido");   
    }

    # Admin avatar validation
    $isCorrectType = str_starts_with($_FILES["employeeAvatar"]["type"], "image");

    # Si es diferente a verdadero(true = 1)
    if ($isCorrectType != 1) {
      return array("success" => 0, "message" => "Avatar inválido");
    }

    return 1;
  }

  function addExamsValidation($data) {
    extract($data);

    if ($examsName === "" || !preg_match("/^[a-zA-Z0-9\s]+$/", $examsName)) {
      return ["success" => 0, "message" => "Nombre de examen invalido"];
    }

    $categories = ["Analisis de fluidos corporales", "Pruebas de diagnostico por imagenes", "Examenes de segundo nivel"];

    if (!in_array($examsCategory, $categories)) {
      return ["success" => 0, "message" => "Categoría inválida"];
    }

    if (!is_numeric($examsPrice)) {
      return ["success" => 0, "message" => "Precio inválido"];
    }

    return 1;
  };

  function updateExamsValidation($data) {
    extract($data);

    if ($examsName === "" || !preg_match("/^[a-zA-Z0-9\s]+$/", $examsName)) {
      return ["success" => 0, "message" => "Nombre de examen invalido"];
    }

    $categories = ["Analisis de fluidos corporales", "Pruebas de diagnostico por imagenes", "Examenes de segundo nivel"];

    if (!in_array($examsCategory, $categories)) {
      return ["success" => 0, "message" => "Categoría inválida"];
    }

    if (!is_numeric($examsPrice)) {
      return ["success" => 0, "message" => "Precio inválido"];
    }

    return 1;
  }