function $I(id){
	return document.getElementById(id);
}

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
			cssStr="position: absolute;border: 1px solid #000000;overflow: hidden;";
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
