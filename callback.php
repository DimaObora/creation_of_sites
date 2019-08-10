<?php

use VK\Client\VKApiClient;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';
require_once "settings/settingscallback.php";

if(!isset($_POST['phone'])){
    exit(0);
    //error exeption
}
$form = 0;
if(isset($_POST['email'])){
    $form = 1;
}
if(isset($_POST['g-recaptcha-response'])){
    $form = 1;
}

$usermail = "";
$username = "";
$userphone = "";
$content  = "";
$gRecaptchaResponse = "";
$msg = "";
$msgmin = "";
$badfields = 0;

switch ($form){
    case 1:
        $usermail = $_POST['email'];
        $username = $_POST['name'];
        $userphone = $_POST['phone'];
        $content  = nl2br($_POST['message']);
        $gRecaptchaResponse = $_POST['g-recaptcha-response'];
        $recaptcha = new \ReCaptcha\ReCaptcha($SECRET_RECAPCHA);
        $resp = $recaptcha->setExpectedHostname($EXPECTED_HOSTNAME)
            ->verify($gRecaptchaResponse, getIpClient());
        if ($resp->isSuccess()) {
            //verificed
        } else {
            $errors = $resp->getErrorCodes();
            exit(0);
            //error exeption
        }
        // Формирование тела письма
        $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
        $msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новое сообщение </h2>\r\n";
        $msg .= "<p><strong>Имя:</strong> ".$username."</p>\r\n";
        $msg .= "<p><strong>Номер телефона:</strong> ".$userphone."</p>\r\n";
        $msg .= "<p><strong>Почта:</strong> ".$usermail."</p>\r\n";
        $msg .= "<p><strong>Сообщение:</strong> ".$content."</p>\r\n";
        $msg .= "</body></html>";
        $msgmin = "Web-Originals"."\r\nИмя:".$username."\r\nНомер телефона:".$userphone."\r\nПочта:".$usermail."\r\nСообщение:".$content;
        break;
    case 0:
        $userphone = $_POST['phone'];
        // Формирование тела письма
        $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
        $msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Консультация </h2>\r\n";
        $msg .= "<p><strong>Номер телефона:</strong> ".$userphone."</p>\r\n";
        $msg .= "</body></html>";
        $msgmin = "Консультация!\r\nWeb-Originals"."\r\nНомер телефона:".$userphone;
        break;
    default:
        exit(0);
        //error exeption
        break;
}


// отправка сообщения
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 2;                                       // Enable verbose debug output
    $mail->CharSet = "utf-8";
    $mail->isSMTP();                                            // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                                   // Enable SMTP authentication
    $mail->Username = $EMAIL_LOGIN;                     // SMTP username
    $mail->Password = $EMAIL_PASSWORD;                               // SMTP password
    $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($EMAIL_LOGIN, 'Web-Originals');
    $mail->addAddress($SEND_TO_EMAIL, 'username');     // Add a recipient
    if(isset($SEND_TO_EMAIL_CC))
        $mail->AddCC($SEND_TO_EMAIL_CC);

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Новое сообщение';

    $mail->Body = $msg;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

$vk = new VKApiClient();
$vk->messages()->send($VK_ACCESS_TOCEN, $params = array(
    'user_ids' => $VK_IM_ID,    // Кому отправляем
    'message' => $msgmin,   // Что отправляем);
    'random_id' => rand(10000, 100000000),
));


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