<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$token = "2119094427:AAGfoedYSUra6gyQNFoqAbhSwBQRPd5S9s0";
$chat_id = "-770442689";
$arr = array(
  'Имя: ' => $name,
  'Телефон: ' => $phone,
  'Email:' => $email,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>