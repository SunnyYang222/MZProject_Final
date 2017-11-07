<?php
	//1、接收用户的输入（客户端的数据）
	$userName = $_POST['userName'];
	$password = $_POST['password'];
	
	//连接数据库，查询该用户名是否在数据库存在
	//1、连接数据库
	$conn = mysql_connect("localhost","root","19930122");
	
	if(!$conn){
		die("亲，connect fail");
	}else{
		//echo "connect success";
	}
	
	//2、选择数据库
	mysql_select_db("login",$conn);
	
	//3、执行SQL语句
	$sqlStr="select * from personlogin where Phone='".$userName."' and password='".$password."'";
	
    $result = mysql_query($sqlStr,$conn);
    $rowCount = mysql_num_rows($result);
    //echo $rowCount;
    if($rowCount==0){
    	echo "0";//登陆失败    	
    }else{
    	echo "1";//登陆成功
    }
    //4、关闭数据库
    mysql_close($conn); 
	
?>