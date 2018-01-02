<?php
$path = $_POST['file_path'];
$content = $_POST['file_content'];

$res = file_put_contents($path, $content);
if ($res)
 {echo $res;}
else
 {echo $res;}
?>