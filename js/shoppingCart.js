
//单选、复选、反选
//jQuery插件
jQuery.fn.extend(
	{		
		//根据传入的值，决定是选择，还是取消
		"checkAll":function(isCheck){
			this.each(function(){
				this.checked = isCheck;
			});
		},
		
		//反选
		"notCheck":function(){
			this.each(function(){
				this.checked = !this.checked;
			});
		}		
	}
);


$(function(){
	$("#checkAll").click(function(){
		$(":checkbox").checkAll($("#checkAll").attr("checked"));	
	});
	$("#checkAlltotal").click(function(){
		$(":checkbox").checkAll($("#checkAlltotal").attr("checked"));	
	});
	
	//反向控制的思路：
	//点击每一个复选框时，需要遍历所有的复选框，看看是否有没选中的。
	$("#cart_goodsList :checkbox").click(function(){
		let allChecked = true;
		for(let i=0;i<$("#cart_goodsList :checkbox").length;i++){
			if(!$("#cart_goodsList :checkbox")[i].checked){
				allChecked = false;
				break;
			}
		}
		$("#checkAll").attr("checked",allChecked);	
		$("#checkAlltotal").attr("checked",allChecked);	
	});	
});


//购物车计算的实现
//数量按钮的实现

var length = $("#cart_goodsList").find(".cart-col-num").length;

var totalPrice = Number($(".cart-product-price.total")[0].innerHTML)+Number($(".cart-product-price.total")[1].innerHTML);
$("#totalPrice").html((totalPrice.toString())+".00");

for(var i=0;i<length;i++){
		
	$(".cart-subtract").eq(i).click(function(){
		var num = $(this).siblings(".cart-product-num").children(".cart-product-num-result").val();
		num--;
		if(num<1){
			num=1;
		}
		$(this).siblings(".cart-product-num").children(".cart-product-num-result").val(num);
		
		//每项商品总计

		var perPrice = Number($(this).parent(".cart-col-num_calculate").parent(".cart-col-num").siblings(".cart-col-price").children(".cart-product").html());
		var price =  $(this).parent(".cart-col-num_calculate").parent(".cart-col-num").siblings(".cart-col-total").children(".cart-product-price.total").html();

		price = perPrice * num;
		
		$(this).parent(".cart-col-num_calculate").parent(".cart-col-num").siblings(".cart-col-total").children(".cart-product-price.total").html((price.toString())+".00");
		
		var totalPrice = Number($(".cart-product-price.total")[0].innerHTML)+Number($(".cart-product-price.total")[1].innerHTML);
		$("#totalPrice").html((totalPrice.toString())+".00");
	});
	
	$(".cart-add").eq(i).click(function(){
		var num = $(this).siblings(".cart-product-num").children(".cart-product-num-result").val();
		num++;
		$(this).siblings(".cart-product-num").children(".cart-product-num-result").val(num);
		
		//每项商品总计

		var perPrice = Number($(this).parent(".cart-col-num_calculate").parent(".cart-col-num").siblings(".cart-col-price").children(".cart-product").html());
		var price =  $(this).parent(".cart-col-num_calculate").parent(".cart-col-num").siblings(".cart-col-total").children(".cart-product-price.total").html();

		price = perPrice * num;
		
		$(this).parent(".cart-col-num_calculate").parent(".cart-col-num").siblings(".cart-col-total").children(".cart-product-price.total").html((price.toString())+".00");
		
		var totalPrice = Number($(".cart-product-price.total")[0].innerHTML)+Number($(".cart-product-price.total")[1].innerHTML);
		$("#totalPrice").html((totalPrice.toString())+".00");
	});	
}

$(".cart-product-remove").click(function(){

//	($(this).parentsUntil(".cart_goodslist_item_body"))[0].deleteRow($(this).index());
	$(this).parentsUntil(".cart_goodslist").empty();
//	alert($(".cart-product-price.total")[0].innerHTML));
});