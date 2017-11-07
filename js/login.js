
//表单正则验证
function checkAll(type,value){
	var reg;
	switch(type){
		case "userName": reg=userNameReg();break;
		case "passWord": reg=passWordReg();break;
		case "email": reg=emailReg();break;
		case "personId": reg=personIdReg();break;
		case "tel": reg=telReg();break;
		
		default:;
	} 	
	if(reg.test(value)){
		return true;
	}else{
		return false;
	}
}
//用户名
//数字、字母、下划线，且数字不能开头，长度在6-15之间
function userNameReg(){
	return /^[a-zA-Z_]\w{5,14}$/;
}

//密码
//数字、字母、下划线，且开头必须为字母,长度6-20
function passWordReg(){
	return /^[a-zA-Z]\w{5,19}$/;
}
//手机号
function telReg(){
	return /^1\d{10}$/;
}

$(function(){
	$("#loginName").val(getCookie("userName"));
//	alert(document.cookie);
//	alert(getCookie("userName"));
});


$("#loginName").blur(function(){
	var loginName = $(this).val();
	
	if(loginName==""){
		$(".tip_txt").html("请填写完整的信息！");
	}else if((checkAll("tel",loginName)==false) && (checkAll("userName",loginName)==false)){
			$(".tip_txt").html("登录账号或登录手机号不正确");
		}else if((checkAll("tel",loginName)==true)||(checkAll("userName",loginName)==true)){
			$(".tip_txt").html("登录账号格式正确!");
		}
});

$("#passWord").blur(function(){
	var passWord = $(this).val();
	
	if(passWord==""){
		$(".tip_txt").html("请填写完整的信息！");
	}else if(checkAll("passWord",passWord)==false){
		$(".tip_txt").html("登录密码格式有误");
	}else if(checkAll("passWord",passWord)==true){
		$(".tip_txt").html("密码格式正确!");
	}		
});

$("#phone").blur(function(){
	var phone = $(this).val();
	
	if(phone==""){
		$(".tip_txt").html("手机号码为必填项!");
	}else if(checkAll("tel",phone)==true){
			$(".tip_txt").html("手机号码格式正确!");
		}else if(checkAll("tel",phone)==false){
			$(".tip_txt").html("请输入正确手机号码!");
		}
});


//数据库连接
$("#register_btn_nextstep").click(function(){
	
	$.ajax({
		url: 'login.php',
		type: 'post',
		data: {
			"userName":$("#loginName").val(),
			"password":$("#passWord").val()
			},
		success:function(str) {
			if(str==1){
				//若此时'记住密码'复选框被选中则,保存cookie
				if($("#remember").is(':checked')) {
					var loginName = $("#loginName").val();
					var passWord = $("#passWord").val();
				    setCookie("loginName",loginName,7);
				    setCookie("passWord",passWord,7);
			    }
				location.href="MZindex.html";
			}else{
				alert("用户名或者密码错误，登录失败！");
			}
		}		
	});
	
});


//若'记住密码'被选中则,保存cookie
//cookie的操作
//功能：保存cookie
function setCookie(key,value,dayCount){
	var date=new Date();
	date.setDate(date.getDate()+dayCount);
	document.cookie= key+"="+value+";expires="+date.toGMTString();
}
//功能：读取cookie
function getCookie(key){
	var str=document.cookie;
	var arr=str.split("; ");
	var index=-1;
	for(var i=0;i<arr.length;i++){
		if(arr[i].indexOf(key+"=")==0){
			index=i; 
			break;
		}
	}
	if(index==-1){
		return "";
	}else{
		return arr[index].substring((key+"=").length);
	}
}

//功能：删除cookie
function removeCookie(key){
	setCookie(key,value,-1);
}
