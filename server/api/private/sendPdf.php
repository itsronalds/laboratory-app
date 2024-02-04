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

  require "./../../lib/FPDF/fpdf.php";

  $data = json_decode(file_get_contents("php://input"), true);
  extract($data);

  # Create PDF
  $pdf = new FPDF();
  $pdf->AddPage();

  $pdf->SetFont('Arial','B',16);
  $pdf->Cell(0,10,'Laboratorio',0,1,'C');
  $pdf->Cell(0,10,'Resultados de examen',0,1,'C');

  $pdf->Ln(10);

  $pdf->SetFont('Arial','B',11);
  $pdf->Cell(20, 10, utf8_decode("Resultado de exámen: $peopleExamsResult"), 0);

  // $pdf->Output();
  
  # Send email with pdf
  $to = $peopleExamsEmail; 
  $from = "lancerrnld@gmail.com"; 
  $subject = "send email with pdf attachment"; 
  $message = "<p>Please see the attachment.</p>";

  // a random hash will be necessary to send mixed content
  $separator = md5(time());

  // carriage return type (we use a PHP end of line constant)
  $eol = PHP_EOL;

  // attachment name
  $filename = "test.pdf";

  // encode data (puts attachment in proper format)
  $pdfdoc = $pdf->Output("", "S");
  $attachment = chunk_split(base64_encode($pdfdoc));

  // main header
  $headers  = "From: ".$from.$eol;
  $headers .= "MIME-Version: 1.0".$eol; 
  $headers .= "Content-Type: multipart/mixed; boundary=\"".$separator."\"";

  // no more headers after this, we start the body! //

  $body = "--".$separator.$eol;
  $body .= "Content-Transfer-Encoding: 7bit".$eol.$eol;
  $body .= "This is a MIME encoded message.".$eol;

  // message
  $body .= "--".$separator.$eol;
  $body .= "Content-Type: text/html; charset=\"iso-8859-1\"".$eol;
  $body .= "Content-Transfer-Encoding: 8bit".$eol.$eol;
  $body .= $message.$eol;

  // attachment
  $body .= "--".$separator.$eol;
  $body .= "Content-Type: application/octet-stream; name=\"".$filename."\"".$eol; 
  $body .= "Content-Transfer-Encoding: base64".$eol;
  $body .= "Content-Disposition: attachment".$eol.$eol;
  $body .= $attachment.$eol;
  $body .= "--".$separator."--";

  try {
    // send message
    $mail = mail($to, $subject, $body, $headers);

    if ($mail) {
      $json = json_encode(["success" => true, "message" => "Pdf enviado con exito al email del usuario"]);

      echo $json;
    }
  } catch (Exception $e) {
    echo $e->getMessage();
  }
  
  

