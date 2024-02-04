<?php

  class Auth {
    public function adminLogIn($data, $dbConnection) {
      extract($data);

      try {
        $query = $dbConnection->prepare("SELECT IDAdmin, adminPassword FROM admins WHERE adminEmail = :adminEmail");
        $query->bindParam(":adminEmail", $adminEmail);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_OBJ);

        if (empty($row) === true) {
          $errors = json_encode(["success" => false, "auth" => false, "role" => false, "message" => "Credencial incorrecta"]);
          echo $errors;

          exit();
        }

        $passwordVerify = password_verify($adminPassword, $row->adminPassword);

        if ($passwordVerify !== true) {
          $errors = json_encode(["success" => false, "auth" => false, "role" => false, "message" => "Credencial incorrecta"]);
          echo $errors;

          exit();
        }

        require "./../../../utils/encrypt.php";

        try {
          $json = json_encode(["id" => $row->IDAdmin, "role" => "admin"]);

          # Encrypt data
          $encrypt = encrypt($json);

          $json = json_encode(["success" => true, "auth" => true, "role" => "admin", "token" => $encrypt]);
          
          echo $json;

          $dbConnection = null;
        } catch (Exception $e) {
          echo $e->getMessage();
        }

        # Iniciamos session start func
        //session_start();

        /*
        if (!isset($_SESSION["token"])) {
          # Creamos la variable de sesión del usuario
          $_SESSION["token"] = ["id" => $row->IDAdmin, "role" => "admin"];

          $json = json_encode(["success" => true, "auth" => true, "role" => "admin"]);
          
          echo $json;

          $dbConnection = null;
        }
        */
      } catch (Exception $e) {
        echo $e->getMessage();
      }
    }

    public function employeeLogIn($data, $dbConnection) {
      extract($data);

      $query = "SELECT IDEmployee, employeePassword FROM employees WHERE employeeEmail = :employeeEmail";
      $sql = $dbConnection->prepare($query);
      $sql->bindParam(":employeeEmail", $employeeEmail);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_OBJ);

      if (empty($row)) {
        $errors = json_encode(["success" => false, "auth" => false, "role" => false, "message" => "Credencial incorrecta"]);
        echo $errors;

        exit();
      }

      $passwordVerify = password_verify($employeePassword, $row->employeePassword);

      if ($passwordVerify !== true) {
        $errors = json_encode(["success" => false, "auth" => false, "role" => false, "message" => "Credencial incorrecta"]);
        echo $errors;

        exit();
      }

      require "./../../../utils/encrypt.php";

      try {
        $json = json_encode(["id" => $row->IDEmployee, "role" => "employee"]);

        # Encrypt data
        $encrypt = encrypt($json);

        $json = json_encode(["success" => true, "auth" => true, "role" => "employee", "token" => $encrypt]);
        
        echo $json;

        $dbConnection = null;
      } catch (Exception $e) {
        echo $e->getMessage();
      }

      /*
      # Iniciamos session start func
      session_start();

      if (!isset($_SESSION["token"])) {
        # Creamos la variable de sesión del usuario
        $_SESSION["token"] = ["id" => $row->IDEmployee, "role" => "employee"];

        $json = json_encode(["success" => true, "auth" => true, "role" => "employee"]);
         
        echo $json;

        $dbConnection = null;
      }
      */
    }
  }