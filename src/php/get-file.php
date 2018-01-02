
<?php
/**
 * 读取文件内容
 */
$file_path = $_GET['file_path'];
if(file_exists($file_path)){
$str = file_get_contents($file_path);//将整个文件内容读入到一个字符串中
// 动态执行回掉函数
$callback=$_GET['callback'];  
echo $callback."($str)"; // ？？？？？


}
?>