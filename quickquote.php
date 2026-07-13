<?php

header("Access-Control-Allow-Origin: https://www.smartproeg.com");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';
$config = require __DIR__ . '/config.php';



function sanitize($field) {
  return htmlspecialchars(trim($_POST[$field] ?? ''));
}

$name    = sanitize('name');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$message = sanitize('message');

if (empty($name) || empty($email) || empty($message)) {
  http_response_code(422);
  exit('missing-fields');
}

$mail = new PHPMailer(true);


try {
  // إعدادات SMTP
  $mail->isSMTP();
  $mail->Host       = $config['mail']['host'];
  $mail->SMTPAuth   = true;
  $mail->Username   = $config['mail']['username'];
  $mail->Password   = $config['mail']['password'];
 $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port       = 465;

  // العناوين
  $mail->setFrom($config['mail']['from'], 'Smart Pro Website');
  $mail->addAddress($config['mail']['to']);

  // البريد بصيغة HTML
  $mail->isHTML(true);
  $mail->Subject = 'New Quick Quote Request';
  $mail->Body    = "
      <h2>Quick Quote Request</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>   
    <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
  ";

  $mail->send();
  http_response_code(200);
  echo 'success';
} catch (Exception $e) {
  http_response_code(500);
   echo 'mailer-error: ' . $mail->ErrorInfo;
}
