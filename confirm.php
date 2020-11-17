<?php

$request_param = $_POST;

$request_datetime = date("Y年m月d日 H時i分s秒");


$mailto = $request_param['email'];
$to = "nittc.dance@gmail.com";
$mailfrom = "nittc.dance@gmail.com";

$subject = "お問い合わせ受付完了通知メール【L.A.R.G.O】";
$content = "";
$content .= $request_param['name']. "様\r\n";
$content .= "本日は、お問い合わせいただきありがとうございました。\r\n後日、メールにてご連絡入れさせていただきますので、\r\n今しばらくお待ちください。\r\nL.A.R.G.O代表より\r\n";
$content .= "=================================\r\n";
$content .= "お名前　 　　　　　　" . htmlspecialchars($request_param['name'])."\r\n";
$content .= "メールアドレス　 　　" . htmlspecialchars($request_param['email'])."\r\n";
$content .= "お問い合わせ内容　 　" . htmlspecialchars($request_param['content'])."\r\n";
$content .= "お問い合わせ日時　 　" . $request_datetime."\r\n";
$content .= "=================================\r\n";

//管理者確認用メール
$subject2 = "お問い合わせ受付通知メール【L.A.R.G.O】";
$content2 = "";
$content2 .= "【L.A.R.G.O】ホームページにて以下のお問い合わせがありました。\r\n";
$content2 .= "=================================\r\n";
$content2 .= "お名前　 　　　　　" . htmlspecialchars($request_param['name'])."\r\n";
$content2 .= "メールアドレス　 　" . htmlspecialchars($request_param['email'])."\r\n";
$content2 .= "お問い合わせ内容　 " . htmlspecialchars($request_param['content'])."\r\n";
$content2 .= "お問い合わせ日時   " . $request_datetime."\r\n";
$content2 .= "================================="."\r\n";

mb_language("ja");
mb_internal_encoding("UTF-8");
//mail 送信
if($request_param['token'] === '1234567'){
if(mb_send_mail($to, $subject2, $content2, $mailfrom)){
   mb_send_mail($mailto,$subject,$content,$mailfrom);
	 ?>
			echo "<script>alert('送信完了しました！');
			window.location = "./contact.html";
		</script>";
		<?php
} else {
   header('Content-Type: text/html; charset=UTF-8');
//  echo "メールの送信に失敗しました";
 ?>
 echo "<script>alert('メールの送信に失敗しました');
 window.location = "./contact.html";
</script>";
<?php
};
} else {
// echo "メールの送信に失敗しました（トークンエラー）";
?>
echo "<script>alert('メールの送信に失敗しました（トークンエラー）');
window.location = "./contact.html";
</script>";
<?php
}

?>