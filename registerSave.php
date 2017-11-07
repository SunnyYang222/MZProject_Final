<?php
	header("Content-type: text/html; charset=utf-8");
	
	//1、接收浏览器端的数据（即客户端的数据）

	$name = $_GET['userName'];
	
	//2、插入数据库
	
	//1、连接数据库
	$conn = mysql_connect("localhost","root","19930122");
	
	if(!$conn){
		die("亲，connect fail");
	}else{
//		echo "connect success";
	}
	
	//2、选择数据库
	mysql_select_db("login",$conn);
	
	//3、执行SQL语句
	$sqlStr="insert into personlogin(Phone)
     values('".$name."')";
    mysql_query($sqlStr,$conn);
    
    //4、关闭数据库
    mysql_close($conn); 
	

?>