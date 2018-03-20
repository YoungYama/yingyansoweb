$.fn.surePay = function(options) {
	var defaults = {
		type: 2,
		userId: 0,
		productId: 0,
		buyCount: 1,
		addUserNum: 0,
		show: function() {

		},
		hide: function(e) {

		}
	};
	//将一个空对象做为第一个参数  
	var settings = $.extend({}, defaults, options);

	// 在每个调用该插件的元素中执行以下代码  
	return $(this).each(function() {

		var productToken = null;

		var $payLayer = $(".sure-product-pay-info-layer");

		if(settings.userId === 0) {
			$('#log-in').click();
			$("#log-in-msg").html("此操作需要登录");
			$(".register .sign-in .import-table").css("margin-top", "37px");
			$("#log-in-msg").show();
		} else {
			if(settings.productId === 0) {
				$("body").tipAlert({
					title: '请选择产品。',
					noMsg: true
				});
			} else {
				if(IsPC()) { //电脑端
					var currentUrl = location.href;

					var recommender = "no";

					if(currentUrl.indexOf("?recommender=") != -1) {
						recommender = currentUrl.split("?recommender=")[1];

						if(recommender.indexOf("&") != -1) {
							recommender = recommender.split("&")[0];
						}
					}

					$('.yys-loading #loading-msg').html("正在唤醒支付界面中，请稍候...");
					$('.yys-loading').show();

					$.ajax({
						type: "post",
						url: yysConfigs.yysServiceUrl + "/product/pc/toPay",
						data: {
							userId: settings.userId,
							productId: settings.productId,
							type: settings.type,
							buyCount: settings.buyCount,
							addUserNum: settings.addUserNum,
							recommender: recommender
						},
						async: false,
						success: function(responseData) {
							$('.yys-loading #loading-msg').html("正在全球查询数据中，请稍候...");
							$('.yys-loading').hide();
							if(responseData.code == 200) {
								$payLayer.find(".your-account").html(responseData.data.mobile);
								$payLayer.find(".your-user-count").html(responseData.data.userCounts + "个");

								var buyCount = responseData.data.buyCount;

								if(responseData.data.buyTimeType == 0) {
									buyCount = buyCount + "年";
								} else {
									buyCount = buyCount + "月";
								}

								$payLayer.find(".your-date").html(buyCount);

								$payLayer.find(".your-valid-date").html(responseData.data.endDate);

								$payLayer.find(".your-price").html("￥" + responseData.data.price.toFixed(2));

								if((responseData.data.originalPrice - responseData.data.price) > 0) {
									$payLayer.find(".your-cut-price").show();
									$payLayer.find(".your-cut-price").html("￥" + responseData.data.originalPrice.toFixed(2));
								} else {
									$payLayer.find(".your-cut-price").hide();
								}

								$payLayer.fadeIn();

								productToken = responseData.data.productToken;

							} else if(responseData.code == 201) {
								$("body").tipAlert({
									title: "该账号没有购买的权限，请联系您的管理员进行购买。",
									noMsg: true
								});
							} else {
								$("body").tipAlert({
									title: responseData.msg,
									noMsg: true
								});
							}
						}
					});

					//关闭支付方式选择界面
					$payLayer.find(".icon-close").unbind("click");
					$payLayer.find(".icon-close").bind("click", function(e) {
						$payLayer.fadeOut();
						settings.hide(e);
					});

					//选择支付方式
					$payLayer.find(".pay-choose").unbind("click");
					$payLayer.find(".pay-choose").bind("click", function() {
						$payLayer.find(".pay-choose").removeClass("active");
						$(this).addClass("active");
					});

					var $surePayLayer = $(".sure-payLayer");
					var wxQRTimer = null;

					//立即支付
					$payLayer.find(".quick-pay-btn").unbind("click");
					$payLayer.find(".quick-pay-btn").bind("click", function() {
						var result = payStart(userId, productToken);
						if(!result.success) {
							$("body").tipAlert({
								title: result.msg,
								noMsg: true
							});
							return;
						}
						
						yzzCookieToken.deleteUserInfo();

						if($payLayer.find(".pay-methods-choose .active").attr("name") == "alipay") {
							//跳转到支付页面
							var toPayUrl = yysConfigs.yysServiceUrl + "/product/mobile/alipay";

							window.location.href = toPayUrl + "?productToken=" + productToken;
						} else {
							$surePayLayer.find("#wx-pay-qr-img").empty();

							$.ajax({
								type: 'POST',
								url: yysConfigs.yysServiceUrl + '/product/mobile/wxpay/qrcode',
								data: {
									productToken: productToken
								},
								dataType: 'json',
								success: function(responseData) {
									if(responseData.code == 200) {
										$payLayer.fadeOut();

										$surePayLayer.find("#wx-pay-qr-img").qrcode({
											render: "canvas", //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
											width: 330, //宽度 
											height: 330, //高度 
											text: responseData.data.code_url //任意内容 
										});

										var trade_no = responseData.data.out_trade_no;
										wxQRTimer = setInterval(function() {
											$.ajax({
												type: 'POST',
												url: yysConfigs.yysServiceUrl + '/product/mobile/order/payStatus',
												data: {
													tradeNo: trade_no,
													userId: settings.userId
												},
												dataType: 'json',
												success: function(data) {
													if(data == 1) { // 已购买成功
														window.location.href = yysConfigs.yysServiceUrl + "/product/mobile/toPerfect/info/" + settings.type + "?tradeNo=" + trade_no;
													}
												}
											});
										}, 2000);

										$surePayLayer.fadeIn();
									} else {
										$surePayLayer.fadeOut();
										$("body").tipAlert({
											title: responseData.msg,
											noMsg: true
										});
									}
								},
								error: function() {
									$surePayLayer.fadeOut();
									$("body").tipAlert({
										title: "支付异常，请重试。",
										noMsg: true
									});
								}
							});

						}
					});

					//电脑端微信扫码支付关闭
					$surePayLayer.find("#wx-pay-qr .close").unbind("click");
					$surePayLayer.find("#wx-pay-qr .close").bind("click", function() {
						$surePayLayer.fadeOut();
						if(wxQRTimer != null) {
							clearTimeout(wxQRTimer);
						}
					});
					settings.show();
				} else { //手机端
					//跳转到支付页面
					var toPayUrl = yysConfigs.yysServiceUrl + "/product/mobile/toPay";

					toPayUrl = toPayUrl + "?userId=" + settings.userId + "&productId=" + settings.productId + "&type=" + settings.type + "&buyCount=" + settings.buyCount + "&addUserNum=" + settings.addUserNum;
					window.location.href = toPayUrl;
				}
			}
		}
	});
}