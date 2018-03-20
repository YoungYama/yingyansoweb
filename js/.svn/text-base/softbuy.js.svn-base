var minUserCounts = 2; //最小账号数
var maxUserCounts = 9;
var preAddNum = 2; //账号数增幅
var preAddNumPrice = 600; //增加账号数对应的金额增幅
var userNum = 0; //当前用户数
var productPrice = 2580;

$(function() {

	if(productId == 7) {
		$(".product-vip-7 #to-buy").css({
			"cursor": "not-allowed",
			"background-color": "#f4f4f4",
			"border": "1px solid #ccc",
			"color": "#999"
		});
	}

	//初始化产品信息
	$.ajax({
		type: "get",
		url: url + "/yys/product/vip",
		data: {
			"ids": "7"
		},
		async: false,
		success: function(responseData) {
			if(responseData.success) {
				var products = responseData.data;
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

		var productName = product.productName;
		productPrice = yysProductModel.marketPrice;

		minUserCounts = product.userCounts;
		userNum = minUserCounts;

		preAddNum = yysProductModel.preAddNum;
		preAddNumPrice = yysProductModel.preAddNumPrice;
		maxUserCounts = yysProductModel.maxNum;

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

		$(".change-user-num .icon-jian").attr("title", minUserCounts + "个账号起购");
		$(".change-user-num .icon-jian").css({
			"color": "#9e9e9e",
			"cursor": "not-allowed"
		});
		$("#year-coin").html(buyTimeType); //年费或者月费
		$(".product-vip-7 .productPrice").html(productPrice); //产品价格
		$(".product-vip-7 #user-num").html("标准"); //账号数

		$(".product-vip-7 #pre-price").html(preAddNumPrice);

	}

	function scrollInfo() {
		var scroll = setInterval('autoScroll("#FontScroll")', 1500);
		$("#FontScroll").hover(function() {
			clearInterval(scroll);
		}, function() {
			scroll = setInterval('autoScroll("#FontScroll")', 1500);
		});
	}

	scrollInfo();

	//数字累加滚动
	//numberRoll();

	//立即开通点击事件
	$("#to-buy").click(function() {
		userNum = userNum.toString();
		if(userNum == "标准") {
			userNum = minUserCounts;
		} else {
			userNum = userNum.replace("人", "");
		}
		
		userNum = parseInt(userNum);

		var addUserNum = userNum - minUserCounts;
		if(addUserNum < 0) {
			addUserNum = 0;
		}

		$("body").surePay({
			type: 2,
			userId: userId,
			productId: 7,
			buyCount: 1,
			addUserNum: addUserNum,
		});
	});

	//增减账号数
	$(".change-user-num i").click(function() {
		var clazz = $(this).attr("class");
		var $userNum = $("#add-user-div #user-num");
		userNum = $userNum.html();

		if(userNum == "标准") {
			userNum = minUserCounts;
		} else {
			userNum = userNum.replace("人", "");
		}

		userNum = parseInt(userNum);
		var oldUserNum = userNum;
		var $money = $(".product-vip-7 .productPrice");
		productPrice = $money.html();
		productPrice = parseFloat(productPrice);

		if(clazz.indexOf("jian") != -1) {
			userNum = userNum - preAddNum;
			if(userNum <= minUserCounts) {
				userNum = minUserCounts;
				$(".change-user-num .icon-jia").attr("title", "");
				$(".change-user-num .icon-jian").attr("title", minUserCounts + "个账号起购");
				$(".change-user-num i").css({
					"color": "#9e9e9e",
					"cursor": "not-allowed"
				});
				$(".change-user-num .icon-jia").css({
					"color": "#128bed",
					"cursor": "pointer"
				});
				if(userNum < minUserCounts) {
					return;
				}
			} else {
				$(".change-user-num .icon-jia").attr("title", "");
				$(".change-user-num .icon-jian").attr("title", "");
				$(".change-user-num .icon-jia").css({
					"color": "#128bed",
					"cursor": "pointer"
				});
			}
		} else {
			userNum = userNum + preAddNum;
			if(maxUserCounts != -1 && userNum >= maxUserCounts) {
				userNum = maxUserCounts;
				$(".change-user-num .icon-jia").attr("title", "最多" + userNum + "账号");
				$(".change-user-num .icon-jian").attr("title", "");
				$(".change-user-num i").css({
					"color": "#9e9e9e",
					"cursor": "not-allowed"
				});
				$(".change-user-num .icon-jian").css({
					"color": "#128bed",
					"cursor": "pointer"
				});
				if(userNum > maxUserCounts) {
					return;
				}
			} else {
				$(".change-user-num .icon-jia").attr("title", "");
				$(".change-user-num .icon-jian").attr("title", "");
				$(".change-user-num .icon-jian").css({
					"color": "#128bed",
					"cursor": "pointer"
				});
			}
		}

		productPrice = parseFloat(productPrice) + parseFloat(((userNum - oldUserNum) / preAddNum) * preAddNumPrice);

		productPrice = productPrice.toFixed(2).toString();
		if(productPrice.indexOf(".00") != -1) {
			productPrice = productPrice.replace(".00", "");
		}

		if(userNum == minUserCounts) {
			userNum = "标准";
		} else {
			userNum = userNum + "人";
		}

		$userNum.html(userNum);
		$money.html(productPrice);
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