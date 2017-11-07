
//页面加载先获取cookie，若获取到登录名cookie，则自动登录，在首页头像下拉栏中显示登录用户信息
$(function(){
	var str=getCookie("loginName");
	reg = str.substring(3,7);
	
//	alert(getCookie("loginName"));
	if(str!=""){
		$("#userName").html(str.replace(reg,"*"));
		$("#userTip").html("私人订制");
	}	
});



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
