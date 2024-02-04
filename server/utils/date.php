<?php

  function getCurrentDatetime() {
    date_default_timezone_set("America/Caracas");
    $datetime = date("Y-m-d H:i:s");

    return $datetime;
  }