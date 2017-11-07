function $I(id){
	return document.getElementById(id);
}

function $Icreate(str){
	return document.createElement(str);
}

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

//省市联动
function ajaxByObjIncludeDefault(obj){
	//定义一个包括所有参数默认值的json对象。
	let defautObj={
		"url":"#",
		"method":"get",
		"data":"",
		"isAsync":true,
		"func":null	
	};
	
	for(let key in obj){
		defautObj[key]= obj[key];
	}
	
	let xhr = new XMLHttpRequest();
	let str=defautObj.url;
	if(defautObj.method.toLowerCase()=="get" && defautObj.data!=""){
		str=defautObj.url+"?"+defautObj.data;
	}
	xhr.open(defautObj.method,str,defautObj.isAsync);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			if(defautObj.func!=null){
				defautObj.func(xhr.responseText);
			}
		}
	}
	if(defautObj.method.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(defautObj.data);
	}else if(defautObj.method.toLowerCase()=="get"){
		xhr.send();
	}
}

//省市的数据
var data=null;

//显示所有省
function showProvince(){
	var htmlStr="";
	for(var i=0;i<data.城市代码.length;i++){
		htmlStr+="<option value='"+data.城市代码[i].省+"'>"+data.城市代码[i].省+"</option>";
	}
	$I("province").innerHTML = htmlStr;	
}

//显示市
function showCity(provinceName){
	//1、根据传入省份名字得到市的数组
	for(var i=0;i<data.城市代码.length;i++){
		if(provinceName == data.城市代码[i].省){
			var citys =  data.城市代码[i].市;
			break;
		}
	}
	
	//2、循环市的数组，并显示
	var htmlStr="";
	for(var i=0;i<citys.length;i++){
		htmlStr+="<option>"+citys[i].市名+"</option>";
	}
	$I("city").innerHTML = htmlStr;	
	
}

function getData(){
	ajaxByObjIncludeDefault({
		"url":"json/city.json",
		"func":function(str){
			data = JSON.parse(str);		
			//2、显示省的下拉框
			showProvince();
			//3、显示市的下拉框
			showCity($I("province").value);
		}
	});	
}


window.onload = function(){
	//1、从后端获取省市的数据
	getData();
	
	$I("province").onchange = function(){
		showCity(this.value);
	}
}

//省市联动的出现和选择
	$(".address_select_seclected").mouseenter(function(){
		$(".address_content").css("display","block");

	});
	$(".address_select").mouseleave(function(){
		var province = $("#province").val();
		var city = $("#city").val();
		$(".address_select_seclected").html(province+"&nbsp&nbsp"+city+"市【请选择】");
	});


//商品详情放大镜
//单例模式
var singletonMirror=(function(){
	//类
	function Mirror(obj){
		var defaultObj={
			boxDom:this.boxDom,
			mirrorDom:null,
			showBoxDom:null,
			bigImgDom:null,
			bigImg:"",
			
			width:50,
			height:50,
			
			mult:2
		};
	
		for(let key in obj){
			defaultObj[key]=obj[key];
		}
		
		for(let key in defaultObj){
			this[key]=defaultObj[key];
		}
		
		this.initUI();
		this.initEvent();
	}
	//方法
	Mirror.prototype={
		//一、动态创建放大镜的dom界面
		initUI:function(){
			//1.产生dom对象
			this.createAllDom();
			//2.对dom对象进行动态改变（left，top，width，height，mult）和dom元素的父对象
			this.updateAttr();
			
		},
		
		createAllDom:function(){
			//1.产生放大镜
			this.mirrorDom=$Icreate("div");
			let cssStr="position: absolute;left: 0;top: 0;background: #CCCCCC;opacity: 0.5;";
			this.mirrorDom.style.cssText=cssStr;
			
			//2.产生大图的可视区域
			this.showBoxDom=$Icreate("div");
			cssStr="position: absolute;overflow: hidden;";
			cssStr+="top: 0px;";
			this.showBoxDom.style.cssText=cssStr;		
			
			//3.产生大图
			this.bigImgDom=$Icreate("img");
			cssStr="position: absolute;left: 0px;top: 0px;";
			this.bigImgDom.style.cssText=cssStr;
		},
		
		//修改放大镜的相关属性；
		updateAttr:function(){
			//1.修改放大镜
			this.mirrorDom.style.width=this.width+"px";
			this.mirrorDom.style.height=this.height+"px";
			this.mirrorDom.style.display="block";
			this.boxDom.appendChild(this.mirrorDom);
			
			//2.产生大图的可视区域
			this.showBoxDom.style.width=this.width*this.mult+"px";
			this.showBoxDom.style.height=this.height*this.mult+"px";
			this.showBoxDom.style.left=this.boxDom.offsetWidth+"px";
			this.mirrorDom.style.display="block";
			this.boxDom.appendChild(this.showBoxDom);
			
			//3.产生大图
			this.bigImgDom.src=this.bigImg;
			this.bigImgDom.style.width = this.mult*this.boxDom.offsetWidth+"px";
			this.bigImgDom.style.height = this.mult*this.boxDom.offsetHeight+"px";
			this.mirrorDom.style.display="block";
			this.showBoxDom.appendChild(this.bigImgDom);
		},
		
		//二、初始化事件
		initEvent:function(){
			let obj = this;
			
			/*
			obj.boxDom.onmouseover=function(){
				obj.mirrorDom.style.display="block";
				obj.showBoxDom.style.display="block";
			}
			*/
			obj.boxDom.onmouseout=function(){
				obj.mirrorDom.style.display="none";
				obj.showBoxDom.style.display="none";
			}
			
			obj.mirrorDom.onmouseover=function(){
				obj.mirrorDom.style.display="block";
				obj.showBoxDom.style.display="block";
			}
		
			obj.mirrorDom.onmouseout=function(){
				obj.mirrorDom.style.display="none";
				obj.showBoxDom.style.display="none";
			}
			
			
			obj.boxDom.onmousemove=function(event){
				let evt=event||window.event;
				//让镜子跟着鼠标移动
				let left=evt.pageX-obj.boxDom.offsetLeft-obj.width/2;
				let top=evt.pageY-obj.boxDom.offsetTop-obj.height/2;
				
				//边界判断
				if(left<0){
					left=0;
				}else if(left>obj.boxDom.offsetWidth-obj.width){
					left=obj.boxDom.offsetWidth-obj.width;
				}
				if(top<0){
					top=0;
				}else if(top>obj.boxDom.offsetHeight-obj.height){
					top=obj.boxDom.offsetHeight-obj.height;
				}
				
				obj.mirrorDom.style.left=left+"px";
				obj.mirrorDom.style.top=top+"px";
				
				//放大的部分也跟随移动
				obj.bigImgDom.style.left=(-1*obj.mult*left)+"px";
				obj.bigImgDom.style.top=(-1*obj.mult*top)+"px";
			}			
		}
	}
	
	var instance;
	return {
		getInstance:function(obj){
			if(instance==undefined){
				instance=new Mirror(obj);
			}else{
				//1、把单例对象的属性进行修改
				//1）、放大镜的宽，高，倍数
				instance.boxDom=obj.boxDom;
				instance.width=obj.width;
				instance.bigImg=obj.bigImg;
				instance.width=obj.width;
				instance.height=obj.height;
				instance.mult=obj.mult;
				
				//2、把对相应dom对象的属性也进行修改
				instance.updateAttr();
				//3、增加事件
				instance.initEvent();
			}
			return 	instance;
		}
	}	
})();

	$I("goodsDetails_preview_booth").onmouseover=function(){
		singletonMirror.getInstance({
			boxDom:this,
			width:70,
			height:70,
			bigImg:$(".goodsDetails_preview_booth>a").children("img").attr("src"),
			mult:3
		});
	}



//点击“添加购物车”按钮时，先从cookie中获取当前页面的商品ID和当前用户名

	
$(".buybtn.cart").click(function(){
	var goodsId=getCookie("goodsId");
	var loginName=getCookie("loginName");
	var goodsCount=$("#accountNum").val();
	$.ajax({
		url: 'addgoodsCart.php',
		type: 'get',
		data: {
			"loginName":loginName,
			"goodsId":goodsId,
			"goodsCount":goodsCount
			},
		success:function(str) {
			if(str==1){	
				alert("添加成功");
				var barNum = $("#barNum").HTML();
				barNum=barNum+goodsCount;
				$("#barNum").HTML(barNum);
			}else{
				alert("添加失败");
			}
		}
	});
});


$(".buybtn.purchase").click(function(){
	var goodsId=getCookie("goodsId");
	var loginName=getCookie("loginName");
	var goodsCount=$("#accountNum").val();
	$.ajax({
		url: 'addgoodsCart.php',
		type: 'get',
		data: {
			"loginName":loginName,
			"goodsId":goodsId,
			"goodsCount":goodsCount
			},
		success:function(str) {
			if(str==1){	
				var barNum = $("#barNum").HTML();
				barNum=barNum+goodsCount;
				$("#barNum").HTML(barNum);
			}else{
				
			}
		}
	});
	location.href="shoppingCar.html";
});

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