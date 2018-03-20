$(function() {
	//立即购买点击事件
	$(".quick-buy").click(function() {
		$("body").surePay({
			type: 2,
			userId: userId,
			productId: 5,
			buyCount: 1,
			addUserNum: 0,
		});
	});
});

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