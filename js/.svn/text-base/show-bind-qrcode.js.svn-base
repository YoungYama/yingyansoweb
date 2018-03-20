var myBindQrCodeTimer = null;
var needBind = true;

function showBindQrCode() {
	var ticket = yzzCookieToken.getBindQrCodeTicket();
	//票据未过期
	if(ticket != null && ticket.trim().length > 0) {

		$(".registerSuccess-layer #qrcode-img-div").hide();
		$(".registerSuccess-layer #qrcode-img").attr("src", "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket);
		$(".registerSuccess-layer #qrcode-img").show();
		$(".registerSuccess-layer").fadeIn();

	} else {
		$(".registerSuccess-layer #qrcode-img").hide();
		$(".registerSuccess-layer #qrcode-img-div").empty();

		$.ajax({
			type: "get",
			url: yysConfigs.yysCentreUrl + "/wxApi/createQrcode",
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			async: false,
			success: function(responseData) {
				if(responseData.success) {
					var qrUrl = responseData.data.url;

					$(".registerSuccess-layer #qrcode-img-div").qrcode({
						render: "canvas", //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
						width: 170, //宽度 
						height: 170, //高度 
						text: qrUrl //任意内容 
					});

					$(".registerSuccess-layer #qrcode-img-div").show();
					$(".registerSuccess-layer").fadeIn();

					yzzCookieToken.setBindQrCodeTicket(responseData.data.ticket);
				} else {
					console.log(responseData.msg);
					$("body").tipAlert({
						title: '二维码生成失败，请刷新页面重试。',
						noMsg: true
					});
				}
			}
		});

	}

	if(myBindQrCodeTimer != null) {
		clearTimeout(myBindQrCodeTimer);
	}

	myBindQrCodeTimer = setInterval(function() {
		$.ajax({
			type: 'POST',
			url: yysConfigs.yysCentreUrl + '/yys/isBind',
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			data: {
				type: 1
			},
			dataType: 'json',
			success: function(data) {
				if(data == 1) { // 已绑定
					yzzCookieToken.deleteBindQrCodeTicket();

					var userInfo = yzzCookieToken.getUserInfo();
					if(userInfo != null) {
						userInfo = JSON.parse(userInfo);
						userInfo.data.isHadOpenId = true;
						//保存cookie值
						yzzCookieToken.setUserInfo(JSON.stringify(userInfo));
					}

					if(myBindQrCodeTimer != null) {
						clearTimeout(myBindQrCodeTimer);
					}
					$(".registerSuccess-layer").fadeOut();

					var url = location.href;

					if(url.indexOf("authorize-bind") != -1) {
						location.href = "../index.html";
					}
				}
			}
		});
	}, 2000);

}