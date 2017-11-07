
function checkAll(type,value){
	var reg;
	switch(type){
		case "userName": reg=userNameReg();break;
		case "passWord": reg=passWordReg();break;
		case "email": reg=emailReg();break;
		case "personId": reg=personIdReg();break;
		case "phone": reg=phoneReg();break;
		
		default:;
	} 	
	if(reg.test(value)){
		return true;
	}else{
		return false;
	}
}
//手机号
function phoneReg(){
	return /^1\d{10}$/;
}


$("#phone").blur(function(){
	var phone = $(this).val();
	
	if(phone==""){
		$(".tip_txt").html("手机号码为必填项!");
	}else if(checkAll("phone",phone)==false){
		$(".tip_txt").html("请输入正确手机号码!");
	}else if(checkAll("phone",phone)==true){
		//数据库连接
		$.ajax({
			url: 'register.php',
			type: 'get',
			data: {"userName":$("#phone").val()},
			success:function(str) {
				if(str==1){
					$(".tip_txt").html("该手机号已被占用！");
					$(".register_btn_nextstep").click(function(){
						alert("手机号被占用，请重新选择注册手机！");
					});
				}else if(str==0){
					$(".tip_txt").html("该手机号有效,点击注册按钮完成注册！");
					$(".register_btn_nextstep").click(function(){
						$.get(
							"registerSave.php",
							{
								"userName":$("#phone").val(),
							},
							function(data){					
								
							}
						);
						var userName = $("#phone").val();
					    setCookie("userName",userName,7);
						location.href="login.html";
					});
				}
			}
		})

	}
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
	if(index=-1){
		return "";
	}else{
		return arr[index].substring((key+"=").length);
	}
}

//功能：删除cookie
function removeCookie(key){
	setCookie(key,value,-1);
}