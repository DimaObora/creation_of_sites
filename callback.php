<?php

use VK\Client\VKApiClient;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';
require_once "settings/settingscallback.php";

$usermail = $_POST['email'];
$username = $_POST['name'];
$userphone = $_POST['phone'];
$content  = nl2br($_POST['message']);
$gRecaptchaResponse = $_POST['g-recaptcha-response'];

$recaptcha = new \ReCaptcha\ReCaptcha($secret);
$resp = $recaptcha->setExpectedHostname($EXPECTED_HOSTNAME)
    ->verify($gRecaptchaResponse, getIpClient());
if ($resp->isSuccess()) {
    // Verified!

// отправка сообщения
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 2;                                       // Enable verbose debug output
        $mail->CharSet =  "utf-8";
        $mail->isSMTP();                                            // Set mailer to use SMTP
        $mail->Host       = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = $EMAIL_LOGIN;                     // SMTP username
        $mail->Password   = $EMAIL_PASSWORD;                               // SMTP password
        $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        //Recipients
        $mail->setFrom($EMAIL_LOGIN, 'Web-Originals');
        $mail->addAddress($SEND_TO_EMAIL, 'username');     // Add a recipient

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Новое сообщение';
        // Формирование тела письма
        $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
        $msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новое сообщение </h2>\r\n";
        $msg .= "<p><strong>Имя:</strong> ".$username."</p>\r\n";
        $msg .= "<p><strong>Номер телефона:</strong> ".$userphone."</p>\r\n";
        $msg .= "<p><strong>Почта:</strong> ".$usermail."</p>\r\n";
        $msg .= "<p><strong>Сообщение:</strong> ".$content."</p>\r\n";
        $msg .= "</body></html>";
        $mail->Body    = $msg;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

    $vk = new VKApiClient();
    $vk->messages()->send($VK_ACCESS_TOCEN, $params = array(
        'user_ids' => $VK_IM_ID,    // Кому отправляем
        'message' => "web-originals.ru"."\r\nИмя:".$username."\r\nНомер телефона:".$userphone."\r\nПочта:".$usermail."\r\nСообщение:".$content,   // Что отправляем);
        'random_id' => rand(10000,100000000),
    ));

} else {
    $errors = $resp->getErrorCodes();
}


function getIpClient()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}