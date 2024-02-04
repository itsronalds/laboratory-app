<?php

  function encrypt($data) {
    $ciphering = "AES-128-CTR";
    $iv_length = openssl_cipher_iv_length($ciphering);
    $options = 0;
    $encryption_iv = '1234567891011121';
    $encryption_key = "The secret...";
    $encryption = openssl_encrypt($data, $ciphering,
    $encryption_key, $options, $encryption_iv);
   
    return $encryption;
  }

  function decrypt($encryption) {
    $ciphering = "AES-128-CTR";
    $decryption_key = "The secret...";
    $options = 0;
    $decryption_iv = '1234567891011121';
    $decryption = openssl_decrypt($encryption, $ciphering, 
    $decryption_key, $options, $decryption_iv);

    return $decryption;
  };