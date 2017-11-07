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