<?php
require_once "settings/settingscallback.php";
$usermail = $_POST['email'];
$username = $_POST['name'];
$userphone = $_POST['phone'];
$content  = nl2br($_POST['message']);
// Формирование заголовка письма
$subject  = "Новое сообщение";
$headers  = "From: " . strip_tags($usermail) . "\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новое сообщение </h2>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$username."</p>\r\n";
$msg .= "<p><strong>Номер телефона:</strong> ".$userphone."</p>\r\n";
$msg .= "<p><strong>Почта:</strong> ".$usermail."</p>\r\n";
$msg .= "<p><strong>Сообщение:</strong> ".$content."</p>\r\n";
$msg .= "</body></html>";
// отправка сообщения
send($VK_IM_ID,"web-originals.ru"."\r\nИмя:".$username."\r\nНомер телефона:".$userphone."\r\nПочта:".$usermail."\r\nСообщение:".$content, $VK_ACCESS_TOCEN,$VK_SECRET);
if(@mail($sendto, $subject, $msg, $headers)) {
	echo "true";
} else {
	echo "false";
}

function send($id, $message,$access_tocken)
{
    $url = 'https://api.vk.com/method/messages.send';
    $params = array(
        'user_ids' => $id,    // Кому отправляем
        'message' => $message,   // Что отправляем
        'access_token' => $access_tocken,  // access_token можно вбить хардкодом, если работа будет идти из под одного юзера
        'v'=>'5.38',
    );
    $sig = md5("/method/messages.send?".http_build_query($params));
    $params['sig']= $sig;
    // В $result вернется id отправленного сообщения
    $result = file_get_contents($url, false, stream_context_create(array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-type: application/x-www-form-urlencoded',
            'content' => http_build_query($params)
        )
    )));
    echo $result;
}

?>