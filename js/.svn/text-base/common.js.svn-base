/**
 * Created by Administrator on 2017/10/18.
 */

var url = yysConfigs.yysCentreUrl; //鹰眼搜搜索系统请求入口
var searchWordMaxLength = yysConfigs.searchWordMaxLength; //鹰眼搜搜索系统搜索内容最长长度
var countrys = yysConfigs.countrys; //所有国家缩写
var autoSearchTimer = yysConfigs.autoSearchTimer; //鹰眼搜自动搜索下一页时间间隔，即下次请求时间，单位秒
var ajaxTimeout = yysConfigs.ajaxTimeout; //ajax请求超时设置
var serviceType; //验证码方式(注册、登录、找回密码)
var userId = 0;
var productId = 1;
var productSortId = 0;
var downloadSearchWord = null;
var downloadDomain = null;
var downloadCountry = null;
var saveData = null;
var pageHolder = null;
var xhr_Link = null;
var myTime = null;
var recommender = "no";
var recommendCode = "no";

var isGetUnreadMsgs = false;
var unreadMsgs = null;

var emailPattern = /^([a-z0-9]{1})([a-z0-9_.-]*)([a-z0-9]{1})@((?!gif|jpg|png|pdf|html|htm)[a-z0-9-]+[.]){1,3}((?!gif|jpg|png|pdf|html|htm)[a-z0-9]{1,3}([a-z]{1}))$/;
var domainPattern = /^((?!gif|jpg|png|pdf|html|htm)[a-z0-9-]+[.]){1,3}((?!gif|jpg|png|pdf|html|htm)[a-z0-9]{1,3}([a-z]{1}))$/;
var phonePattern = /^1[34578]\d{9}$/;

var needBind = false;

$(function() {
	if(!window.navigator.onLine) {
		$("body").tipAlert({
			title: '网络连接不可用，请检查您的网络状态。',
			noMsg: true
		});

		return;
	}

	//路劲带有token则自动登录
	var isHadToken = autoLoginByToken();

	if(isHadToken) {
		return;
	}

	//加载公共HTML
	$.ajax({
		type: "get",
		url: "common.html",
		async: false,
		success: function(data) {
			$("body").append(data);
		}
	});

	var currentUrl = location.href;

	if(currentUrl.indexOf("?recommender=") != -1) {
		recommender = currentUrl.split("?recommender=")[1];

		if(recommender.indexOf("&") != -1) {
			recommender = recommender.split("&")[0];
		}
	}

	$.ajax({
		type: "post",
		url: url + "/yys/authorizeUrl/get",
		data: {
			"display": "pc",
			"recommender": recommender
		},
		async: false,
		success: function(responseData) {
			if(responseData.success) {
				var data = responseData.data;
				var weixin = data.weixin;
				var qq = data.qq;
				var weibo = data.weibo;
				$(".weixin-logo").unbind("click");
				$(".weixin-logo").bind("click", function() {
					location.href = weixin;
				});

				$(".qq-logo").unbind("click");
				$(".qq-logo").bind("click", function() {
					location.href = qq;
				});

				$(".weibo-logo").unbind("click");
				$(".weibo-logo").bind("click", function() {
					location.href = weibo;
				});
			} else {
				console.log(responseData.msg);
			}
		}
	});

	//去授权
	$("#beVIP").click(function() {
		window.open("buy.html");
	});

	//点击用户名称
	$('#userName').mouseover(function() {
		showShareYysQR(5, recommendCode);
	});

	//是否接受鹰眼搜用户协议
	$("#accept-agreement").click(function() {
		if($(this).prop("checked")) { //接受
			$(".sign-in-btn").addClass("sign-in-btn-click");
		} else {
			$(".sign-in-btn").removeClass("sign-in-btn-click");
		}
	});

	$("#search-text").attr("maxlength", searchWordMaxLength);
	$("#searchInput").attr("maxlength", searchWordMaxLength);

	// 信息悬浮事件
	$("#info-span,#header-info").mouseover(
		function() {
			if($(this).attr("id") == "header-info") {
				$("#header-info").show();
			} else {
				if(!isGetUnreadMsgs) {

					getUnreadMsgs();
				} else {
					setUnreadMsgs(unreadMsgs);
				}
			}
		});
	$("#info-span").mouseout(function() {
		$("#header-info").hide();
	});

	jQuery.support.cors = true; //ie9以下加配置浏览器安全可以进行跨域
	$.ajaxSetup({
		crossDomain: true,
		timeout: ajaxTimeout * 1000, //超时时间设置，单位毫秒
		xhrFields: {
			withCredentials: true
		},
		error: function(XMLHttpRequest, textStatus) {

			$('.yys-loading #loading-msg').html("正在全球查询数据中，请稍候...");
			$('.yys-loading').hide();

			if(xhr_Link != null) {
				xhr_Link.abort(); //终止提取信息的http请求
			}

			closeLoad();

			if(textStatus != "abort" && $(".ieWarn").is(":hidden")) {
				$("body").tipAlert({
					title: '亲，当前网络不畅通，请刷新后重试，如仍有问题，可致电：0755-88843705，谢谢！',
					noMsg: true,
					imgHeight: 103
				});
			}

		}
	});

	$(".registerSuccess-layer").hide();

	var userInfo = yzzCookieToken.getUserInfo();
	if(userInfo != null) {
		userInfo = JSON.parse(userInfo);
		if(needBind) {
			$.ajax({
				type: 'POST',
				url: yysConfigs.yysCentreUrl + '/yys/isBind',
				headers: {
					"LoginUserToken": yzzCookieToken.getLoginUserToken()
				},
				data: {
					type: 1
				},
				async: false,
				dataType: 'json',
				success: function(data) {
					if(data == 1) { // 未绑定
						userInfo.data.isHadOpenId = true;
						//保存cookie值
						yzzCookieToken.setUserInfo(JSON.stringify(userInfo));
					} else {
						userInfo.data.isHadOpenId = false;
						//保存cookie值
						yzzCookieToken.setUserInfo(JSON.stringify(userInfo));

						showBindQrCode();
					}
				}
			});
		}

		setUserInfo(userInfo);

		$("header #user-login").hide();
		$("header #user-infos").show();

	} else {

		$.ajax({
			type: "get",
			url: url + "/yys/autoLogin",
			async: false,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(data) {
				if(data.code === 200) {
					setUserInfo(data);

					$("header #user-login").hide();
					$("header #user-infos").show();

					yzzCookieToken.setUserInfo(JSON.stringify(data));

				} else {
					productSortId = 0;
					$('.user-info').hide();
					$('.sign-btn').show();
				}
			}
		});

	}

	(function() {
		function tabChange(name, clas) {
			for(var i = 0, max = name.length; i < max; i++) {
				(function(i) {
					name[i].addEventListener('click', function() {
						name.removeClass(clas);
						$(this).addClass(clas);
						$('.placeholder').show();
						initLog();
						if(i === 0) {
							$('.log-in-box').show();
							$('.sign-in-box').hide();
						} else {
							serviceType = 1;
							$('.log-in-box').hide();
							$('.sign-in-box').show();
						}
					})
				})(i)
			}
		}

		//关闭登录注册弹框
		function close() {
			$('#close-sign').on('click', function() {
				$('.register').fadeOut();
				$('.password-warn').hide();
				$('.user-warn').hide();
				$('#user-tel').val("");
				$('#user-key').val("");
			})
		}

		$(document).on('click', '.fClose', function() {
			CloseForg();
		})

		function CloseForg() {
			$('.register,.reg-forg').fadeOut();
			$('.sign-in input').val('');
			$('.reg-forg-box .red').stop(true, false).hide();
			$('.reg-input').removeClass('correct');
			$('.reg-input').removeClass('error');
			$('.reg-input').removeClass('focus');
		}

		function initLog(sign, log) {
			$('.user-warn').hide();
			$('.password-warn').hide();
			$('.code-warn').hide();
			$('#user-tel,#sign-user-tel').val("");
			$('#user-key,#sign-user-key').val("");
			$('#codeVal').val("");
			$('.user-name,.password,.mycode').removeClass('error');
			$('.user-name,.password,.mycode').removeClass('correct');
			$(sign).addClass('selected');
			$(log).removeClass('selected');
		}
		//点击右上角登录注册
		function MyRegist(myId, myTitle1, myTitle2, myHide, myShow) {
			$(document).on('click', myId, function() {
				serviceType = 1;
				initLog(myTitle1, myTitle2);
				$('.register,.register-tab').fadeIn();
				$(myHide).hide();
				$(myShow).show();
				$('.placeholder').show();

				$(".register .sign-in .import-table").css("margin-top", "40px");
				$("#log-in-msg").hide();
			})
		}

		function telWarn(myId) {
			if($(myId).val().length != 11 || !(phonePattern.test($(myId).val()))) {
				$(myId).siblings('.red').show(200);
				$(myId).parent().removeClass('correct');
				$(myId).parent().addClass('error');
			} else {
				$(myId).siblings('.red').hide(200);
				$(myId).parent().removeClass('error');
				$(myId).parent().addClass('correct');
			}
		}

		function keyWarn(myId) {
			if($(myId).val().length < 6 || $(myId).val().length > 20) {
				$(myId).siblings('.red').show(200);
				$(myId).parent().removeClass('correct');
				$(myId).parent().addClass('error');
			} else {
				$(myId).siblings('.red').hide(200);
				$(myId).parent().removeClass('error');
				$(myId).parent().addClass('correct');
			}
		}

		function RepKeyWarn(myId, myId2) {
			if($(myId).val() !== $(myId2).val() || $(myId).val().length < 6) {
				$(myId).siblings('.red').show(200);
				$(myId).parent().removeClass('correct');
				$(myId).parent().addClass('error');

			} else {
				$(myId).siblings('.red').hide(200);
				$(myId).parent().removeClass('error');
				$(myId).parent().addClass('correct');
			}
		}

		function codeWarn(myId) {
			if($(myId).val() === "") {
				$(myId).siblings('.red').show(200);
				$(myId).siblings('.red').show(200);
				$(myId).parent().removeClass('correct');
				$(myId).parent().addClass('error');
			} else {
				$(myId).siblings('.red').hide(200);
				$(myId).parent().removeClass('error');
				$(myId).parent().addClass('correct');
			}
		}

		function blurEvent(myId) {
			$(document).on('blur', myId, function() {
				telWarn(myId);
				$(this).parent().removeClass('focs');
			});
		}

		function KeyBlurEvent(myId) {
			$(document).on('blur', myId, function() {
				keyWarn(myId);
				$(this).parent().removeClass('focs');
			});
		}

		function KeyConfirm(myId, myId2) {
			$(document).on('blur', myId, function() {
				RepKeyWarn(myId, myId2);
			})
		}

		function codeBlur(myId) {
			$(document).on('blur', myId, function() {
				codeWarn(myId);
				$(this).parent().removeClass('focs');
			});
		};

		function focusEvent(myId) {
			$(document).on('focus', myId, function() {
				$(myId).parent().addClass('focs');
				$(myId).parent().addClass('focs');
				$(myId).parent().removeClass('error');
				$(myId).parent().removeClass('correct');
				$(myId).siblings('.red').hide(200);
			});
		}
		$(document).on('click', '#to-log', function() {
			$('.reg-forg').hide();
			$('#log-in').click()
		})
		$(document).on('click', '#free-reg', function() {
			$('.reg-forg').hide();
			$('#sign-in').click();
		})
		MyRegist('#log-in', '.log-in-title', '.sign-in-title', '.sign-in-box', '.log-in-box'); //点击右上角登录
		MyRegist('#sign-in', '.sign-in-title', '.log-in-title', '.log-in-box', '.sign-in-box'); //点击右上角注册

		Fpassword('.p_forget', '.reg0'); //点击忘记密码
		Fpassword('#reg-btn3', '.register-tab'); //点击立即登录
		/**失去焦点验证**/
		blurEvent('#user-tel');
		blurEvent('#sign-user-tel');
		blurEvent('#f-userTel');
		KeyBlurEvent('#user-key');
		KeyBlurEvent('#sign-user-key');
		KeyBlurEvent('#f-sign-user-key');
		/*****/
		KeyConfirm('#f-sign-user-key2', '#f-sign-user-key'); //重置密码验证
		codeBlur('#codeVal'); //注册验证码失焦
		codeBlur('#f-codeVal'); //找回密码验证码失焦

		/*************聚焦边框高亮*****************/
		focusEvent('#user-tel');
		focusEvent('#user-key');
		focusEvent('#sign-user-tel');
		focusEvent('#sign-user-key');
		focusEvent('#codeVal');
		focusEvent('#f-userTel');
		focusEvent('#f-codeVal'); //找回密码验证码聚焦
		focusEvent('#f-sign-user-key');
		focusEvent('#f-sign-user-key2');
		/**********************************/

		//enterShow('.log-in-btn');

		//按钮回车事件
		function enterShow(box, btn) {
			$(document).keydown(function(e) {
				if($(box).is(':hidden')) {} else {
					if(e.keyCode === 13) {
						$(btn).click()
					}
				}
			})
		}
		enterShow('.log-in-box', '.log-in-btn');
		enterShow('.sign-in-box', '.sign-in-btn-click');
		enterShow('.reg0', '#reg-btn1');
		enterShow('.reg1', '#reg-btn2');
		enterShow('.reg2', '#reg-btn3');
		//忘记密码操作
		function Fpassword(myId, myReg) {
			$(document).on('click', myId, function() {
				serviceType = 3;
				$('.sign-in input').val('');
				$('.reg-forg-box .red').stop(true, false).hide();
				$('.reg-input').removeClass('correct');
				$('.reg-input').removeClass('error');
				$('.reg-input').removeClass('focus');
				$('.register-tab,.reg-forg').hide();
				$(myReg).show();
			})
		}

		//找回密码之点击下一步，验证码是否正确
		$(document).on('click', '#reg-btn1', function() {
			telWarn('#f-userTel');
			codeWarn('#f-codeVal');
			var val = $('#f-userTel').val();
			var codeVal = $('#f-codeVal').val();
			if(val.length == 11 && (phonePattern.test(val)) && codeVal != "") {
				$.ajax({
					type: "get",
					//xhrFields: { withCredentials: true },
					url: url + "/yys/code/check",
					headers: {
						"LoginUserToken": yzzCookieToken.getLoginUserToken()
					},
					data: {
						"mobile": val,
						"serviceType": serviceType,
						"code": codeVal
					},
					success: function(data) {
						if(data.code === 200) {
							$('.register-tab,.reg-forg').hide();
							$('.reg1').show();
						} else {
							$("body").tipAlert({
								title: data.msg,
								noMsg: true
							});
						}
					}
				})
			}
		})

		//修改密码
		$(document).on('click', '#reg-btn2', function() {
			keyWarn('#f-sign-user-key');
			RepKeyWarn('#f-sign-user-key2', '#f-sign-user-key');
			var val = $('#f-sign-user-key').val();
			var val2 = $('#f-sign-user-key2').val();
			var tel = $('#f-userTel').val();
			var codeVal = $('#f-codeVal').val();
			if(val.length > 5 && val2 === val) {
				$.ajax({
					type: "post",
					//xhrFields: { withCredentials: true },
					url: url + "/yys/modifyPassword",
					headers: {
						"LoginUserToken": yzzCookieToken.getLoginUserToken()
					},
					data: {
						"mobile": tel,
						"newPassword": val2,
						"code": codeVal
					},
					success: function(data) {
						if(data.code === 200) {
							$('.register-tab,.reg-forg').hide();
							$('.reg2').show();
						} else {
							$("body").tipAlert({
								title: data.msg,
								noMsg: true
							});
						}
					}
				})
			} else {

			}
		})
		//点击登录按钮
		$(document).on('click', '.log-in-btn', function() {
			var account = $('#user-tel').val();
			var password = $('#user-key').val();
			telWarn('#user-tel');
			keyWarn('#user-key');
			if($('#user-tel').val().length === 11 && (phonePattern.test($('#user-tel').val())) && $('#user-key').val().length >= 6 && $('#user-key').val().length <= 20) {
				$('.loading').show(); //出现加载界面
				$.ajax({
					type: 'post',
					url: url + '/yys/login',
					headers: {
						"LoginUserToken": yzzCookieToken.getLoginUserToken()
					},
					async: false,
					data: {
						"loginType": 1,
						"account": account,
						"password": password
					},
					success: function(data) {
						$('.loading').hide();
						if(data.code === 200) {
							//清空缓存
							yzzCookieToken.removePageHolder();

							//设置已登录用户的标识id
							yzzCookieToken.setLoginUserToken(data.data.token);

							location.reload(true);
						} else {
							$("body").tipAlert({
								title: data.msg,
								noMsg: true
							});
						}
					}
				})
			};
		});
		//点击注册按钮
		$(document).on('click', '.sign-in-btn-click', function() {
			var account = $('#sign-user-tel').val();
			var registerValue = $('#sign-user-key').val();
			var code = $('#codeVal').val();
			telWarn('#sign-user-tel');
			keyWarn('#sign-user-key');
			codeWarn('#codeVal');
			if(account.length === 11 && (phonePattern.test(account)) && account.length >= 6 & account.length <= 20 && code != "") {
				$('.loading').show(); //出现加载界面

				$.ajax({
					type: 'post',
					url: url + '/yys/register',
					headers: {
						"LoginUserToken": yzzCookieToken.getLoginUserToken()
					},
					data: {
						"account": account,
						"registerValue": registerValue + '###' + recommender,
						"code": code
					},
					success: function(data) {
						$('.loading').hide();
						if(data.code === 200) {
							//清空缓存
							yzzCookieToken.removePageHolder();

							//设置已登录用户的标识id
							yzzCookieToken.setLoginUserToken(data.data);

						} else {
							$("body").tipAlert({
								title: data.msg,
								noMsg: true
							});
						}
					}
				})
			}
		});
		//验证码定时器
		function sendCode(myCode, myTel, myId) {
			$(myCode).on('click', function() {
				var mobile = $(this).parent().siblings(myTel).children(myId);
				if(mobile.val().length != 11 || !(phonePattern.test(mobile.val()))) {
					mobile.siblings('.red').show();
					mobile.parent().removeClass('correct');
					mobile.parent().addClass('error');
				} else {
					$.ajax({
						type: 'get',
						headers: {
							"LoginUserToken": yzzCookieToken.getLoginUserToken()
						},
						url: url + '/yys/code/get',
						data: {
							"mobile": mobile.val(),
							"serviceType": serviceType
						},
						success: function(data) {
							if(data.code === 200) {
								restCode();
							} else {
								$("body").tipAlert({
									title: data.msg,
									noMsg: true
								});
							}
						}
					})
				}
			})

			function restCode() {
				$(myCode).hide();
				$(myCode).siblings('.disable-btn').show();

				var second = 60;
				$(myCode).siblings('.code-date').html(second);
				var timer = null;
				timer = setInterval(function() {
					second -= 1;
					if(second > -1) {
						$(myCode).siblings('.disable-btn').children('.code-date').html(second);
					} else {
						clearInterval(timer);
						$(myCode).show();
						$(myCode).siblings('.disable-btn').hide();
					}
				}, 1000)
			}
		}
		tabChange($('.tab-title span'), 'selected');
		close();
		sendCode('#code', '.user-name', '#sign-user-tel'); //注册手机验证
		sendCode('#get_code', '.r0', '#f-userTel'); //找回密码手机验证
	})();

	//退出登录
	function quit() {

		$("body").tipAlert({
			iconClass: "icon-wenhao",
			title: "您确定要退出吗？",
			noMsg: true,
			sure: function(e) {
				//清空缓存
				yzzCookieToken.removePageHolder();
				//删除已登录用户的标识id
				yzzCookieToken.deleteLoginUserToken();

				yzzCookieToken.deleteUserInfo();

				userId = 0;
				productId = 1;
				productSortId = 0;

				$('.user-info').hide();
				$('.sign-btn').show();

				location.reload(true);
			}
		});
	}
	$(document).on('click', '.quit', function() {
		quit();
	})
	//quit();

	//鹰眼搜信息弹框tab切换
	function InfoTab() {
		var li = $('#left-nav>li');
		var content = $('.info-cnt');
		for(var i = 0, max = li.length; i < max; i++) {
			(function(i) {
				li[i].addEventListener('click', function() {
					if($(this).attr("isValid") == "true") { //该功能模块有效
						li.removeClass('info-active');
						$(this).addClass('info-active');
						content.hide().eq(li.index(this)).show();
					} else {
						$("body").tipAlert({
							title: $(this).attr("msg"),
							noMsg: true
						});
					}

				});
			})(i);
		}
		$(document).on('click', '.close-btn', function() {
			$('.client-info').fadeOut();
		});
	};
	InfoTab();
});

//获取初始标识cookie值
function sightseer() {
	$.ajax({
		type: "get",
		url: url + "/yys/sightseer",
		headers: {
			"ClientBrowserId": yzzCookieToken.getClientBrowserId()
		},
		async: false,
		success: function(data) {

			if(data.code == 200) {
				var clientBrowserId = data.data[yzzCookieToken.keys.CLIENT_BROWSER_ID];
				var prevSearchTime = data.data[yzzCookieToken.keys.PREV_SEARCH_TIME];
				var prevExtractTime = data.data[yzzCookieToken.keys.PREV_EXTRACT_TIME];

				yzzCookieToken.setClientBrowserId(clientBrowserId);
				yzzCookieToken.setPrevSearchTime(prevSearchTime);
				yzzCookieToken.setPrevExtractTime(prevExtractTime);
			} else {
				$("body").tipAlert({
					title: data.msg,
					noMsg: true
				});
			}
		}
	});
}

function InfoLayer(data) {

	if(data == null) {
		$("body").tipAlert({
			title: "没有数据。",
			noMsg: true
		});
		return;
	}

	saveData = data.data;

	$('.emailBody').html('');
	var companyId = data.data._id;

	if(downloadSearchWord != null && downloadSearchWord.trim().length > 0) {
		downloadSearchWord = companyId + "@espeed@" + downloadSearchWord;
	} else {
		downloadSearchWord = companyId;
	}

	var homePage = data.data.home_page;
	var subject = data.data.subject;
	var desc = data.data.desc;
	var weburl = data.data.weburl;
	var subject = data.data.subject;
	var myEmail = data.data.emails; //所有邮箱
	var location_country = data.data.location_country;
	var companyName = data.data.company_name === null || data.data.company_name.trim().length === 0 ? "暂无信息" : data.data.company_name.trim();
	var contact_phone = data.data.contact_phone === null || data.data.contact_phone.trim().length === 0 ? "暂无信息" : data.data.contact_phone.trim();
	var Facebook = data.data.facebook === null || data.data.facebook.trim().length === 0 || data.data.facebook.indexOf(".") == -1 ? "暂无信息" : data.data.facebook.trim();
	var Linkedin = data.data.linkedin === null || data.data.linkedin.trim().length === 0 || data.data.linkedin.indexOf(".") == -1 ? "暂无信息" : data.data.linkedin.trim();
	var Twitter = data.data.twitter === null || data.data.twitter.trim().length === 0 || data.data.twitter.indexOf(".") == -1 ? "暂无信息" : data.data.twitter.trim();
	var Google = data.data.google === null || data.data.google.trim().length === 0 || data.data.google.indexOf(".") == -1 ? "暂无信息" : data.data.google.trim();
	var Youtobe = data.data.youtube === null || data.data.youtube.trim().length === 0 || data.data.youtube.indexOf(".") == -1 ? "暂无信息" : data.data.youtube.trim();
	var Pintertst = data.data.pintertst === null || data.data.pintertst.trim().length === 0 || data.data.pintertst.indexOf(".") == -1 ? "暂无信息" : data.data.pintertst.trim();

	var GearBest = data.data.gearbest === null || data.data.gearbest.trim().length === 0 || data.data.gearbest.indexOf(".") == -1 ? "暂无信息" : data.data.gearbest.trim();
	var Instagram = data.data.instagram === null || data.data.instagram.trim().length === 0 || data.data.instagram.indexOf(".") == -1 ? "暂无信息" : data.data.instagram.trim();
	var VK = data.data.vk === null || data.data.vk.trim().length === 0 || data.data.vk.indexOf(".") == -1 ? "暂无信息" : data.data.vk.trim();
	var Badoo = data.data.badoo === null || data.data.badoo.trim().length === 0 || data.data.badoo.indexOf(".") == -1 ? "暂无信息" : data.data.badoo.trim();
	var Tumblr = data.data.tumblr === null || data.data.tumblr.trim().length === 0 || data.data.tumblr.indexOf(".") == -1 ? "暂无信息" : data.data.tumblr.trim();
	var Flickr = data.data.flickr === null || data.data.flickr.trim().length === 0 || data.data.flickr.indexOf(".") == -1 ? "暂无信息" : data.data.flickr.trim();
	var ASKfm = data.data.askfm === null || data.data.askfm.trim().length === 0 || data.data.askfm.indexOf(".") == -1 ? "暂无信息" : data.data.askfm.trim();

	var doTime = data.data.doTime;
	var searchDate = new Date(doTime[doTime.length - 1]).format("yyyy-MM-dd hh:mm:ss");
	var emailT = "";

	//更新鹰豆
	updateUserEagleCoin();

	//是否保存
	if(data.data.isSave) {
		$("#infos-bottom #infos-save").hide();
	} else {
		$("#infos-bottom #infos-save").show();
	}

	//邮箱
	for(var i = 0, max = myEmail.length; i < max; i++) {
		var emailUrl = myEmail[i].email.trim();
		if(max > 0) {
			var emailTr = '<tr><td><input class="clipboard-copy-text" id="copy-text' + i + '" value="' + emailUrl + '"><span title="双击可复制：' + emailUrl + '" class="info-email">' + emailUrl + '</span><span class="copy-ok"></span></td><td><a href="javascript:void(0);" class="info-vertify">验证</a></td><td><a href="javascript:void(0);" default="default" class="info-contact">立刻联系</a></td></tr>'
			emailT += emailTr;
			$('.noData-table').hide();
		} else {
			$('.noData-table').show();
		}
	}
	$('.emailBody').html(emailT);

	$(".info-email").unbind("dblclick");
	$(".info-email").bind("dblclick", function() {
		$(".copy-ok").html('');
		var $parent = $(this).parent();
		var id = $parent.find(".clipboard-copy-text").attr("id");

		var obj = document.getElementById(id);
		obj.select(); // 选择对象
		try {
			if(document.execCommand('copy', false, null)) {
				document.execCommand("Copy");
				$parent.find(".copy-ok").html('<i title="复制成功" class="icon iconfont icon-baocun1"></i>');

				setTimeout(function() {
					$parent.find(".copy-ok").html('');
				}, 3000);
			} else {
				$("body").tipAlert({
					title: "复制失败，请手动复制。",
					noMsg: true
				});
			}
		} catch(err) {
			console.log("复制失败，异常信息：" + err);
			$("body").tipAlert({
				title: "复制失败，请手动复制。",
				noMsg: true
			});
		}

	});

	//基本信息
	var myDomain = "暂无信息";

	if(homePage != null && homePage.trim().length > 0) {
		var homePages = homePage.split("/");
		if(homePages.length >= 2) {
			myDomain = homePages[2];

			downloadDomain = myDomain;

			$("#client-web-domain #domain").attr("title", myDomain);
			$("#client-web-domain #domain").attr("href", homePage);

			$("#client-web-domain #domain-more").attr("href", 'http://whois.chinaz.com/' + myDomain);
		}
	} else {
		$('#client-web-domain #domain').removeAttr("title");
		$('#client-web-domain #domain').removeAttr("href");
	}
	$("#client-web-domain #domain").html(myDomain);
	if(myDomain.length > 32) {
		$("#client-web-domain #domain").html(myDomain.substring(0, 32) + "...");
	}

	var mySubject = "暂无信息";
	if(subject != null && subject.trim().length > 0) {
		mySubject = subject;
		$('#my-subject').attr("title", mySubject);
	} else {
		$('#my-subject').removeAttr("title");
	}
	var myDesc = "暂无信息";
	if(desc != null && desc.trim().length > 0) {
		myDesc = desc;
		$('#my-desc-info').attr("title", myDesc);
	} else {
		$('#my-desc-info').removeAttr("title");
	}
	var myEmailInfo = "暂无信息";
	if(myEmail != null && myEmail.length > 0) {
		myEmailInfo = myEmail[0].email.trim();
		$('#my-email-info').attr("href", "mailto:" + myEmailInfo);
		if(myEmail.length > 1) {
			$("#more-email-info").unbind("click");
			$("#more-email-info").bind("click", function() {
				//打开第二栏
				$(".client-info .yys-infomation .info-content-box .left-nav li").eq(1).click();
			});
			$("#more-email-info").show();
		} else {
			$("#more-email-info").hide();
		}
	} else {
		$('#my-email-info').removeAttr("href");
		$("#more-email-info").hide();
	}

	var myPhoneInfo = "暂无信息";
	if(contact_phone != null && contact_phone.trim().length > 0 && contact_phone != "暂无信息") {
		if(contact_phone.endsWith(",")) {
			contact_phone = contact_phone.substring(0, contact_phone.length - 1).replace(/,/g, "；");
		}
		myPhoneInfo = contact_phone;
	}

	var myCountryInfo = "未定义";
	if(location_country !== null && location_country.trim().length > 0) {
		var countryVal = $('[cid=' + location_country + ']').html()
		if(countryVal != undefined && countryVal.trim().length > 0 && countryVal != "null") {
			myCountryInfo = countryVal;
		}
	}

	downloadCountry = myCountryInfo;

	$('#my-subject').html(mySubject);
	$('#my-desc-info').html(myDesc);
	$('#my-email-info').html(myEmailInfo);
	$('#doTime').html(searchDate);
	$("#my-phone-info").html(myPhoneInfo);
	$("#my-country-info").html(myCountryInfo);

	var myWeburl = "暂无信息";
	if(weburl != null && weburl.trim().length > 0) {
		myWeburl = weburl;
	} else {
		if(homePage != null && homePage.trim().length > 0) {
			myWeburl = homePage;
		}
	}

	$("#contact-info-subjuct").html(mySubject);
	if(mySubject != "暂无信息") {
		$("#contact-info-subjuct").attr("title", mySubject);
	} else {
		$('#contact-info-subjuct').removeAttr("title");
	}

	$("#contact-info-weburl a").html(myWeburl);
	if(myWeburl != "暂无信息") {
		$('#contact-info-weburl a').attr("href", myWeburl);
		$('#contact-info-weburl a').attr("title", myWeburl);
	} else {
		$('#contact-info-weburl a').removeAttr("href");
		$('#contact-info-weburl a').removeAttr("title");
	}

	//社交
	$('#Facebook').html(Facebook);
	if(Facebook != "暂无信息") {
		$('#Facebook').attr("href", Facebook);
		$('#Facebook').attr("title", Facebook);
	} else {
		$('#Facebook').removeAttr("href");
		$('#Facebook').removeAttr("title");
	}
	$('#Linkedin').html(Linkedin);
	if(Linkedin != "暂无信息") {
		$('#Linkedin').attr("href", Linkedin);
		$('#Linkedin').attr("title", Linkedin);
	} else {
		$('#Linkedin').removeAttr("href");
		$('#Linkedin').removeAttr("title");
	}
	$('#Twitter').html(Twitter);
	if(Twitter != "暂无信息") {
		$('#Twitter').attr("href", Twitter);
		$('#Twitter').attr("title", Twitter);
	} else {
		$('#Twitter').removeAttr("href");
		$('#Twitter').removeAttr("title");
	}
	$('#Google').html(Google);
	if(Google != "暂无信息") {
		$('#Google').attr("href", Google);
		$('#Google').attr("title", Google);
	} else {
		$('#Google').removeAttr("href");
		$('#Google').removeAttr("title");
	}
	$('#Youtobe').html(Youtobe);
	if(Youtobe != "暂无信息") {
		$('#Youtobe').attr("href", Youtobe);
		$('#Youtobe').attr("title", Youtobe);
	} else {
		$('#Youtobe').removeAttr("href");
		$('#Youtobe').removeAttr("title");
	}
	$('#Pintertst').html(Pintertst);
	if(Pintertst != "暂无信息") {
		$('#Pintertst').attr("href", Pintertst);
		$('#Pintertst').attr("title", Pintertst);
	} else {
		$('#Pintertst').removeAttr("href");
		$('#Pintertst').removeAttr("title");
	}

	$('#GearBest').html(GearBest);
	if(GearBest != "暂无信息") {
		$('#GearBest').attr("href", GearBest);
		$('#GearBest').attr("title", GearBest);
		$('.GearBest-tr').show();
	} else {
		$('#GearBest').removeAttr("href");
		$('#GearBest').removeAttr("title");
		$('.GearBest-tr').hide();
	}
	$('#Instagram').html(Instagram);
	if(Instagram != "暂无信息") {
		$('#Instagram').attr("href", Instagram);
		$('#Instagram').attr("title", Instagram);
		$('.Instagram-tr').show();
	} else {
		$('#Instagram').removeAttr("href");
		$('#Instagram').removeAttr("title");
		$('.Instagram-tr').hide();
	}
	$('#VK').html(VK);
	if(VK != "暂无信息") {
		$('#VK').attr("href", VK);
		$('#VK').attr("title", VK);
		$('.VK-tr').show();
	} else {
		$('#VK').removeAttr("href");
		$('#VK').removeAttr("title");
		$('.VK-tr').hide();
	}
	$('#Badoo').html(Badoo);
	if(Badoo != "暂无信息") {
		$('#Badoo').attr("href", Badoo);
		$('#Badoo').attr("title", Badoo);
		$('.Badoo-tr').show();
	} else {
		$('#Badoo').removeAttr("href");
		$('#Badoo').removeAttr("title");
		$('.Badoo-tr').hide();
	}
	$('#Tumblr').html(Tumblr);
	if(Tumblr != "暂无信息") {
		$('#Tumblr').attr("href", Tumblr);
		$('#Tumblr').attr("title", Tumblr);
		$('.Tumblr-tr').show();
	} else {
		$('#Tumblr').removeAttr("href");
		$('#Tumblr').removeAttr("title");
		$('.Tumblr-tr').hide();
	}
	$('#Flickr').html(Flickr);
	if(GearBest != "暂无信息") {
		$('#Flickr').attr("href", Flickr);
		$('#Flickr').attr("title", Flickr);
		$('.Flickr-tr').show();
	} else {
		$('#Flickr').removeAttr("href");
		$('#Flickr').removeAttr("title");
		$('.Flickr-tr').hide();
	}
	$('#ASKfm').html(ASKfm);
	if(GearBest != "暂无信息") {
		$('#ASKfm').attr("href", ASKfm);
		$('#ASKfm').attr("title", ASKfm);
		$('.ASKfm-tr').show();
	} else {
		$('#ASKfm').removeAttr("href");
		$('#ASKfm').removeAttr("title");
		$('.ASKfm-tr').hide();
	}

	$('.client-info').fadeIn();

	//更新上一次提取信息时间
	var prevExtractTime = data.data[yzzCookieToken.keys.PREV_EXTRACT_TIME];
	yzzCookieToken.setPrevExtractTime(prevExtractTime);

	//打开第一栏
	$(".client-info .yys-infomation .info-content-box .left-nav li").eq(0).click();
}
//时间戳转换成日期
function getLocalTime(nS) {
	return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
//等待页面时间
var second = "00";
var minute = "00";

function timeAdd() {
	second++;

	if(second < 10) {
		second = "0" + second;
	} else if(second > 59) {
		minute++;
		second = "00";
		if(minute < 10) {
			minute = "0" + minute;
		}
	}

	if(minute == 0 && second == 10) {
		$('.second-10').fadeIn();
	} else if(minute == 1 && second <= 1) {
		$('.minute-1').fadeIn();
	} else if(minute == 3 && second <= 1) {
		$('.minute-3').fadeIn();
	}

	/*switch(true) {
		case second < 10:
			second = "0" + second;
			break;
		case(minute == 0 && second == 10):
			$('.second-10').fadeIn();
			break;
		case second > 59:
			minute++;
			second = "00";
			if(minute < 10) {
				minute = "0" + minute;
			}
			break;
		default:
			break;
	}*/
	$('.time-second').text(second);
	$('.time-minute').text(minute);
}

//关闭等待页面
function closeLoad() {
	$('.yys-warn').hide();
	$('.loading-layer').hide();
	if(myTime != null) {
		window.clearInterval(myTime); //停止等待时间定时器
	}
	second = "00";
	minute = "00";
	$('.time-second').text(second); //初始化定时器时间
	$('.time-minute').text(minute);
}

//点击关闭提取信息等待
$(document).on("click", ".close-load", function() {
	if(xhr_Link != null) {
		xhr_Link.abort(); //终止提取信息的http请求
	}

	closeLoad();
})

function placeholderSupport() {
	return 'placeholder' in document.createElement('input');
}
$(function() {
	if(!placeholderSupport()) { // 判断浏览器是否支持 placeholder
		$(document).ready(function() {
			function addPlaceholder(id) {
				//默认遍历循环添加placeholder
				$(id).each(function() {
					$(this).parent().append("<span class='placeholder'>" + $(this).attr('placeholder') + "</span>");
				})
				$(id).keyup(function() {
					if($(this).val() != "") { //如果当前值不为空，隐藏placeholder
						$(this).parent().find('span.placeholder').hide();
					} else {
						$(this).parent().find('span.placeholder').show();
					}
				})
			}
			addPlaceholder('#search-text');
			addPlaceholder('#user-tel');
			addPlaceholder('#user-key');
			addPlaceholder('#sign-user-tel');
			addPlaceholder('#sign-user-key');
			addPlaceholder('#codeVal');
			addPlaceholder('#f-userTel');
			addPlaceholder('#f-codeVal');
			addPlaceholder('#f-sign-user-key');
			addPlaceholder('#f-sign-user-key2');
		});
	}
});

//替换与HTML冲突的特殊符号
function escapeHtml(string) {
	var entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': '&quot;',
		"'": '&#39;',
		"/": '&#x2F;'
	};
	return String(string).replace(/[&<>"'\/]/g, function(s) {
		return entityMap[s];
	});
}

//site:语法判断
function siteGrammarFilter(searchWord) {
	var result = {
		"isUse": false,
		"msg": null,
		"country": null,
		"searchWord": null
	};

	//使用    site:语法
	if(searchWord.startsWith("site:")) {
		result.isUse = true;
		var searchWords = searchWord.split(" ");

		var sites = searchWords[0].split(":");

		if(sites.length != 2) {

			result.msg = "请输入正确site:语法，如site:cn";

			return result;
		}

		var coun = sites[1];

		var firstChar = coun.charAt(0);

		if(firstChar != undefined) {
			if(firstChar.trim().length == 0) {

				result.msg = "site:语法后面不能留空格";

				return result;
			}
		}

		if(coun.trim().length == 0) {

			result.msg = "请输入正确的国家字母缩写";

			return result;
		}

		if(countrys.indexOf(coun.trim()) == -1) {

			result.msg = coun.trim() + " 不是正确的国家字母缩写";

			return result;
		}

		var count = 0;
		for(var i = 0; i < searchWords.length; i++) {
			if(searchWords[i].trim().length > 0) {
				count++;
			}
		}

		if(count < 2) {

			result.msg = "site:语法错误，请加上搜索内容";

			return result;
		}

		result.country = coun.trim();
		result.searchWord = searchWord.substring(searchWords[0].length);

		//国家高亮
		$('#countryName').val(result.country);

		var selectLi = $('[cid=' + result.country + ']');

		var text = selectLi.html();
		$('#sel1').html('亚洲区域');
		$('#sel2').html('欧洲区域');
		$('#sel3').html('美洲区域');
		$('#sel4').html('大洋洲区域');
		$('#sel5').html('非洲区域');
		$('.tip-li').removeClass('active');
		selectLi.parent().parent().addClass('active');
		selectLi.parent().siblings('.drop-title').children('.mySelect').html(text);
	}

	return result;
}

//true为PC端，false为手机端
function IsPC() {
	var userAgentInfo = navigator.userAgent.toLowerCase();
	var Agents = ["android", "iphone",
		"symbianos", "windows phone",
		"ipad", "ipod", "iphone os",
		"midp", "rv:1.2.3.4", "ucweb",
		"windows ce", "windows mobile"
	];
	var flag = true;
	for(var i = 0, length = Agents.length; i < length; i++) {
		if(userAgentInfo.indexOf(Agents[i]) != -1) {
			flag = false;
			break;
		}
	}
	return flag;
}

//保存用户信息
function saveInfos() {

	var loginUserToken = yzzCookieToken.getLoginUserToken();

	if(downloadSearchWord == null || loginUserToken == null) {
		$("body").tipAlert({
			title: "参数缺失，请联系客服。",
			noMsg: true
		});

		return;
	}

	$('.yys-loading #loading-msg').html("正在保存中，请稍候...");
	$('.yys-loading').show();

	$.ajax({
		type: "post",
		url: url + "/yys/save",
		data: {
			"LoginUserToken": yzzCookieToken.getLoginUserToken(),
			"searchWord": downloadSearchWord
		},
		success: function(data) {
			$('.yys-loading #loading-msg').html("正在全球查询数据中，请稍候...");
			$('.yys-loading').hide();
			if(data.code == 200) {
				if(pageHolder != undefined && pageHolder != null) {

					saveData.isSave = true;

					updatePageHolderValue(0, saveData);
				}

				$("#infos-bottom #infos-save").hide();

				$("body").tipAlert({
					title: "客户保存成功。",
					noMsg: true
				});
			} else {
				$("body").tipAlert({
					title: data.msg,
					noMsg: true
				});
			}
		}
	});
}

//下载用户信息
function downloadInfos() {

	var loginUserToken = yzzCookieToken.getLoginUserToken();

	if(downloadSearchWord == null || downloadDomain == null || downloadCountry == null || loginUserToken == null) {
		$("body").tipAlert({
			title: "参数缺失，请联系客服。",
			noMsg: true
		});

		return;
	}

	$('.yys-loading #loading-msg').html("正在下载中，请稍候...");
	$('.yys-loading').show();

	var form = $("<form>"); //定义一个form表单
	form.attr("style", "display:none");
	form.attr("target", "");
	form.attr("method", "post");
	form.attr("action", url + "/yys/download");

	var input1 = $("<input>");
	input1.attr("type", "hidden");
	input1.attr("name", "searchWord");
	input1.attr("value", downloadSearchWord);

	var input2 = $("<input>");
	input2.attr("type", "hidden");
	input2.attr("name", "domain");
	input2.attr("value", downloadDomain);

	var input3 = $("<input>");
	input3.attr("type", "hidden");
	input3.attr("name", "country");
	input3.attr("value", downloadCountry);

	var input4 = $("<input>");
	input4.attr("type", "hidden");
	input4.attr("name", "LoginUserToken");
	input4.attr("value", loginUserToken);

	$("body").append(form); //将表单放置在web中

	form.append(input1);
	form.append(input2);
	form.append(input3);
	form.append(input4);
	form.submit(); //表单提交

	$('.yys-loading #loading-msg').html("正在全球查询数据中，请稍候...");
	$('.yys-loading').hide();
}

//更新用户积分
function updateUserEagleCoin() {
	$.ajax({
		type: "post",
		url: url + "/yys/eagleCoin/get",
		data: {
			userId: userId
		},
		async: true,
		success: function(responseData) {
			if(responseData.success) {
				//鹰豆
				var eagleCoin = responseData.data;
				$("#jifen-num").html(eagleCoin);
				var userInfo = yzzCookieToken.getUserInfo();
				if(userInfo != null) {
					userInfo = JSON.parse(userInfo);
					userInfo.data.eagleCoin = eagleCoin;
					//保存cookie值
					yzzCookieToken.setUserInfo(JSON.stringify(userInfo));
				}
			} else {
				console.log(responseData.msg);
			}
		}
	});
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

//路劲带有token则自动登录
function autoLoginByToken() {
	var result = false;

	var nowUrl = location.href;

	if(nowUrl.indexOf("token=") != -1) {
		result = true;

		var urls = null;

		if(nowUrl.indexOf("&token=") != -1) {
			urls = nowUrl.split("&token=");
		} else if(nowUrl.indexOf("?token=") != -1) {
			urls = nowUrl.split("?token=");
		} else {
			urls = nowUrl.split("token=");
		}

		var token = urls[1];

		$.ajax({
			type: "get",
			url: url + "/yys/autoLogin",
			async: false,
			headers: {
				"LoginUserToken": token
			},
			success: function(data) {
				if(data.code === 200) {
					//清空缓存
					yzzCookieToken.removePageHolder();

					//设置已登录用户的标识id
					yzzCookieToken.setLoginUserToken(data.data.token);
				}

				location.href = urls[0];
			}
		});
	}

	return result;
}

function contactOnline() {

	var height = 688;
	var width = 788;

	var top = window.screen.availHeight;
	var left = window.screen.availWidth;

	top = (top - height) / 2;
	left = (left - width) / 2;

	window.open("http://p.qiao.baidu.com/cps/chat?siteId=10382500&userId=401147&qq-pf-to=pcqq.c2c", "", "top=" + top + ",left=" + left + ",width=" + width + ",height=" + height);
}

function showShareYysQR(productId, recommendCode) {
	var url = yysConfigs.yysServiceUrl + "/product/mobile/regIndex/" + productId + "?recommender=" + recommendCode;
	$("#shareYys-qr-img").empty();

	$("#shareYys-qr-img").qrcode({
		render: "canvas", //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
		text: url, //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
		width: 280, //二维码的宽度
		height: 280, //二维码的高度
		background: "#ffffff", //二维码的后景色
		foreground: "#000000", //二维码的前景色
		src: 'img/qr-logo.png' //二维码中间的图片
	});

	$(".shareYys-payLayer").fadeIn();
	$(".shareYys-payLayer .shareYys-dialog-mask").unbind("click");
	$(".shareYys-payLayer .shareYys-dialog-mask").bind("click", function() {
		$(".shareYys-payLayer").fadeOut();
	});
}

function chooseMmFont(country) {
	if(country == "mm") {
		$("#search-text, #searchInput, title, .main .yys-content .info-content .info-list .info-intro, .main .yys-content .info-content .info-list .info-title .myTitle, .client-info .yys-infomation .info-content-box .more-info .selected #my-subject, .client-info .yys-infomation .info-content-box .more-info .selected #my-desc-info").css("font-family", 'Noto Sans Myanmar');
	} else {
		$("#search-text, #searchInput, title, .main .yys-content .info-content .info-list .info-intro, .main .yys-content .info-content .info-list .info-title .myTitle, .client-info .yys-infomation .info-content-box .more-info .selected #my-subject, .client-info .yys-infomation .info-content-box .more-info .selected #my-desc-info").css("font-family", 'PingFangSC-Light, "Microsoft YaHei", "Hiragino Sans GB", "WenQuanYi Micro Hei"');
	}
}

//渲染用户信息
function setUserInfo(data) {
	userId = data.data.userId;
	productId = data.data.productId;
	productSortId = data.data.productSortId;
	recommendCode = data.data.recommendCode;

	$('.sign-btn').hide();
	$('#userName').html(data.data.userName);
	$('#userName').attr("title", "扫一扫，将鹰眼搜分享给朋友");
	if(data.data.headImg === null || data.data.headImg.trim().length === 0) {
		$('#userImg').attr("src", "img/user-logo.jpg")
	} else {
		var headImg = data.data.headImg;
		if(!headImg.toLowerCase().startsWith("http://") && !headImg.toLowerCase().startsWith("https://")) {
			headImg = yysConfigs.ywxServiceUrl + "/" + headImg;
		}

		$('#userImg').attr("src", headImg)
	}
	$('.user-info').css({
		display: "inline-block"
	});
	var isVIP = data.data.isVIP;
	if(isVIP) {
		switch(productId) {
			case 5:
			case 9:
				$("#isVIP .icon-vip").addClass("yys-vip1");
				break;
			case 6:
				$("#isVIP .icon-vip").addClass("yys-vip2");
				break;
			case 7:
				$("#isVIP .icon-vip").addClass("yys-vip3");
				break;
		}

		$("#isVIP").show();

		var productName = data.data.productName;

		if(productName != null && productName.trim().length > 0) {
			$("#isVIP").attr("title", productName);
		}

		$("#isVIP").show();
		$("#beVIP").hide();
	} else {
		$("#beVIP").show();
		$("#isVIP").hide();
	}

	//设置已登录用户的标识id
	yzzCookieToken.setLoginUserToken(data.data.token);

	//鹰豆
	$("#jifen-num").html(data.data.eagleCoin);

	var isHadOpenId = data.data.isHadOpenId;
	//不管是否绑定公众号，只要重新登录就把QrCodeTicket票据删掉
	yzzCookieToken.deleteBindQrCodeTicket();

	if(isHadOpenId) {
		$(".registerSuccess-layer").hide();
	} else {
		if(needBind) {
			showBindQrCode();
		}
	}

	//更新鹰豆
	updateUserEagleCoin();
}

//获取未读信息数
function getUnreadMsgCount() {

	if(yzzCookieToken.getLoginUserToken() != null) {

		$.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/count/infos",
			data: {
				status: 0
			},
			async: true,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(count) {
				if(count > 0) {
					$("#header #info-count").html(count);

					$("#header #info-span").show();
				} else {
					$("#header #info-span").hide();
				}
			}
		});
	} else {
		$("#header #info-span").hide();
	}
}

//获取未读信息
function getUnreadMsgs() {

	if(yzzCookieToken.getLoginUserToken() != null) {

		$.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/get/infos",
			data: {
				status: 0,
				currentPage: 1,
				pageSize: 10000,
				sort: "DESC",
				orderField: "create_time"
			},
			async: true,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {
				if(responseData.code == 200) {
					isGetUnreadMsgs = true;

					var data = responseData.data;

					if(data != null) {
						unreadMsgs = data.list;

						setUnreadMsgs(unreadMsgs);
					} else {
						$("#header-info").hide();
					}

				} else {
					$("body").tipAlert({
						title: "获取消息失败，请重试。",
						noMsg: true
					});
					console.log();
				}
			}
		});
	} else {
		$("#header-info").hide();
	}
}

//选择未读信息列表
function setUnreadMsgs(list) {
	if(list != null) {
		var html = '';

		for(var i in list) {

			if(list[i].type == 0) { // 课程提问
				html += '<p> <a href="javascript: markMsg(' + list[i].id +
					',\'yxt-index.html?action=course&value=' +
					list[i].srcId + '&comment=' + list[i].commentId +
					'\')" title="' + list[i].fromUserName + '向你提问了关于《' +
					list[i].srcName + '》的问题">' + list[i].fromUserName +
					'向你提问了关于《' + list[i].srcName + '》的问题</a> </p>';
			} else if(list[i].type == 1) { // 课程回复
				html += '<p> <a href="javascript: markMsg(' + list[i].id +
					',\'yxt-index.html?action=course&value=' +
					list[i].srcId + '&comment=' + list[i].commentId +
					'&commentReply=' + list[i].commentReplyId +
					'\')" title="' + list[i].fromUserName + '向你回复了关于《' +
					list[i].srcName + '》的问题">' + list[i].fromUserName +
					'向你回复了关于《' + list[i].srcName + '》的问题</a> </p>';
			} else {
				html += '<p> 不支持的消息类型 </p>';
			}

		}

		$("#header-info").html(html);
		$("#header-info").show();
	}
}

//标记未读消息为已读
function markMsg(id, url) {
	$.ajax({
		type: "post",
		url: yysConfigs.yxtServiceUrl + "/course/update/info",
		data: {
			id: id,
			status: 1
		},
		async: false,
		headers: {
			"LoginUserToken": yzzCookieToken.getLoginUserToken()
		},
		success: function(data) {

		}
	});
	
	location.href = url;
}