$(function() {
	var pId = 0;
	var typeId = 0;
	var productSortId_5 = 0;
	var productSortId_6 = 0;
	var productSortId_7 = 0;
	var wxQRTimer = null;
	var productToken = null;

	//初始化产品信息
	$.ajax({
		type: "get",
		url: url + "/yys/product/vip",
		data: {
			"ids": "5,6,7"
		},
		async: false,
		success: function(responseData) {
			if(responseData.success) {
				var products = responseData.data;
				setProductInfo(products["5"]);
				setProductInfo(products["6"]);
				setProductInfo(products["7"]);
			} else {
				$("body").tipAlert({
					title: responseData.msg,
					noMsg: true
				});
			}
		}
	});

	//渲染产品信息
	function setProductInfo(data) {
		var product = data.product;
		var productId = product.id;
		var params = data.params;
		var yysProductModel = data.yysProductModel;

		if(productId == 5) {
			productSortId_5 = product.sortId;
		}
		if(productId == 6) {
			productSortId_6 = product.sortId;
		}
		if(productId == 7) {
			productSortId_7 = product.sortId;
		}

		var productName = product.productName;
		var productPrice = yysProductModel.marketPrice;

		var param_2 = params.param_2; //提取客户数量
		if(param_2 == -1) {
			param_2 = "不限";
		} else {
			param_2 = param_2 + "个/月";
		}
		var param_3 = params.param_3; //邮箱验证数量
		if(param_3 == -1) {
			param_3 = "不限";
		} else {
			param_3 = param_3 + "个/天";
		}
		var param_8 = params.param_8; //海关数据
		if(param_8 == -1) {
			param_8 = "不限";
		} else {
			param_8 = param_8 + "条/月";
		}
		//指的是后续的鹰学堂模块，0普通权限，1高级权限
		var param_10 = params.param_10; //鹰学堂课程
		if(param_10 == 0) {
			param_10 = "VIP课程";
		} else {
			param_10 = "--";
		}
		var param_6 = params.param_6; //社交信息
		if(param_6 == -1) {
			param_6 = "不限";
		} else {
			param_6 = param_6 + "条/月";
		}
		var param_11 = params.param_11; //批量搜客户
		if(param_11 == -1) {
			param_11 = "不限";
		} else {
			param_11 = param_11 + "个/月";
		}
		var param_12 = params.param_12; //新客户推送
		if(param_12 == -1) {
			param_12 = "不限";
		} else {
			param_12 = param_12 + "个/月";
		}
		var userCounts = product.userCounts;

		//user_type=1单用户、0多用户
		var userType = product.userType;
		if(userType == 0) {
			userType = "SOHO/团队";
		} else {
			userType = "个人/SOHO";
		}

		//0：年数(年费)、1：月数(月费)
		var buyTimeType = product.buyTimeType;
		if(buyTimeType == 0) {
			buyTimeType = "年";
		} else {
			buyTimeType = "月";
		}

		var $product = $(".product-vip-" + productId);

		$product.find("h3").html(productName); //产品名称
		$product.find("li").eq(0).find(".vip-info-ans").html(userType); //适合人群
		$product.find("li").eq(1).find(".vip-info-ans").html(userCounts + "个"); //账号数

		$product.find("li").eq(3).find(".vip-info-ans").html(param_2); //提取客户数量
		$product.find("li").eq(4).find(".vip-info-ans").html(param_3); //邮箱验证
		$product.find("li").eq(5).find(".vip-info-ans").html(param_10); //鹰学堂课程
		//		$product.find("li").eq(6).find(".vip-info-ans").html(param_6); //社交信息
		//		$product.find("li").eq(7).find(".vip-info-ans").html(param_11); //批量搜客户
		//		$product.find("li").eq(8).find(".vip-info-ans").html(param_12); //新客户推送
		//$product.find("li").eq(6).find(".vip-info-ans").html(1 + buyTimeType); //使用时间
		//		$product.find("li").eq(9).find(".vip-info-ans").html(param_8); //海关数据

		$product.find(".productPrice").html(productPrice); //产品价格
		$product.find(".unit").html(buyTimeType); //年费或者月费

	}

	function tabChange() {
		var li = $(".infoBox");
		for(var i = 0, max = li.length; i < max; i++) {
			(function(i) {
				li[i].addEventListener('click', function() {
					li.removeClass('selected');
					$(this).addClass('selected');
					switch(i) {
						case 0:
							pId = 5;
							break;
						case 1:
							pId = 6;
							break;
						case 2:
							pId = 7;
							break;
					}
				})
			})(i)
		}

		if(productSortId >= productSortId_5 && productSortId <= productSortId_7) {
			if(productSortId == productSortId_5 || (productSortId > productSortId_5 && productSortId < productSortId_6)) {
				li.eq(1).click();
				$('.info1-disabled').show();
			} else if(productSortId == productSortId_6 || (productSortId > productSortId_6 && productSortId < productSortId_7)) {
				li.eq(2).click();
				$('.info1-disabled,.info2-disabled').show();
			} else if(productSortId == productSortId_7) {
				$('.info1-disabled,.info2-disabled,.info3-disabled').show();
			}
		} else {
			li.eq(0).click();
		}

		if(productSortId > productSortId_7) {
			$('.info1-disabled,.info2-disabled,.info3-disabled').show();
		}

	};

	function scrollInfo() {
		var scroll = setInterval('autoScroll("#FontScroll")', 1500);
		$("#FontScroll").hover(function() {
			clearInterval(scroll);
		}, function() {
			scroll = setInterval('autoScroll("#FontScroll")', 1500);
		});
	}
	tabChange();
	scrollInfo();
	//	BuyProduct();

	//数字累加滚动
	numberRoll();

	//立即购买点击事件
	$(".buy-content .buyButton").click(function() {
		$("body").surePay({
			type: 2,
			userId: userId,
			productId: pId,
			buyCount: 1,
			addUserNum: 0,
		});
	});
});
//自动滚动效果
function autoScroll(obj) {
	$(obj).find("ul").stop(false, true).animate({
		marginTop: "-36px"
	}, 1000, function() {
		$(this).css({
			marginTop: "0px"
		}).find("li:first,li:nth-child(2),li:nth-child(3)").appendTo(this);
	})
};

//数字累加滚动
function numberRoll() {
	var add = 10000; //叠加数量

	var number = getUserCount() + add; //初始化数量
	$.animateToPrice(number);

	setInterval(function() {
		number = getUserCount() + add;

		if(number > 99999) {
			$(".h-k").show(); //显示十万位数
		}

		if(number > 999999) {
			console.log("用户数达到百万级的数字翻动还没开发。");
		}

		$.animateToPrice(number);

	}, 5000);

}

//获取用户总数
function getUserCount() {
	var count = 0;

	$.ajax({
		type: "get",
		url: url + '/yys/user/count',
		async: false,
		success: function(responseData) {
			if(responseData.success) {
				count = responseData.data;
			} else {
				console.log(responseData.msg);
			}
		}
	});

	return count;
}

//唤醒第三方支付接口，把订单标记为支付失败状态
function payStart(userId, productToken) {
	var result = {
		success: false,
		msg: "唤醒第三方支付接口失败，请重试。"
	};
	$.ajax({
		type: "post",
		url: yysConfigs.yysServiceUrl + '/product/mobile/pay/start',
		data: {
			productToken: productToken,
			userId: userId
		},
		async: false,
		success: function(responseData) {
			result = responseData;
		}
	});

	return result;
}