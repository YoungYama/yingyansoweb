var searchType = 1;
var country = "null";
var oldDataInfos = null;

$(function() {
	//清空缓存
	yzzCookieToken.removePageHolder();

	var currentUrl = location.href;
	if(currentUrl.indexOf("#register") != -1) {
		
		$("#sign-in").click();
	} else if(currentUrl.indexOf("#login") != -1) {
		
		if (yzzCookieToken.getLoginUserToken() == null) {
			$("#log-in").click();
		}
	} else if(currentUrl.indexOf("#forgetpwd") != -1) {
		
		$("#log-in").click();
		$(".p_forget").click();
	}
	
	//点击鹰眼搜好处图片
	$(".yys-web-img .img").click(function(){
		$(".yys-view-img .img-box img").attr("src", $(this).attr("src"));
		$(".yys-view-img").fadeIn();
	});
	$(".yys-view-img .dialog-mask,.yys-view-img .img-box").click(function(){
		$(".yys-view-img").fadeOut();
	});
	
	//获取初始标识cookie值
	sightseer();
	$('#countryName').change(function(){
		var coun = $('#countryName option:selected').attr('cid');
		chooseMmFont(coun);
	});
	//点击切换搜索内容
	function appendCountry() {
		var allCountry = yysConfigs.countryList;
		var selectBox = "<option cid='null'>通用引擎</option>"
		for(var i = 0, max = allCountry.length; i < max; i++) {
			var optionCountry = allCountry[i].country;
			var optionShorthand = allCountry[i].shorthand;
			var countryLi = '<option value="' + optionShorthand + '" cid="' + optionShorthand + '">' + optionCountry + '</option>';
			selectBox += countryLi;
		}
		$('#countryName').html(selectBox);
	};
	appendCountry();
	(function() {
		var li = $('.search-tip li');
		for(var i = 0; i < li.length; i++) {
			(function(i) {
				$('.search-tip li')[i].addEventListener('click', function() {
					$(".sc-warn").hide(200);
					$('#search-text').removeClass('red-input');

					li.removeClass('active');
					$(this).addClass('active');
					var lang = $('#yys-language');
					var myText = $('#search-text');
					switch(i) {
						case 0:
							searchType = 1;
							$('.placeholder').text('小提示：当选择国家引擎时，输入本土语言关键词搜索效果更佳');
							myText.attr('placeholder', '小提示：当选择国家引擎时，输入本土语言关键词搜索效果更佳');
							lang.stop(true, false).fadeIn(400);
							break;
						case 1:
							searchType = 3;
							$('.placeholder').text('请输入网站域名，如abc.com');
							myText.attr('placeholder', '请输入网站域名，如abc.com');
							lang.stop(true, false).fadeOut(400);
							break;
						case 2:
							searchType = 5;
							$('.placeholder').text('请输入邮件地址,如user@abc.com');
							myText.attr('placeholder', '请输入邮件地址,如user@abc.com');
							lang.stop(true, false).fadeOut(400);
							break;
						case 3:
							searchType = 6;
							$('.placeholder').text('请输入要搜索的文档信息');
							myText.attr('placeholder', '请输入要搜索的文档信息');
							lang.stop(true, false).fadeOut(400);
							break;
						case 4:
							searchType = 6;
							$('.placeholder').text('请输入要搜索的图片信息');
							myText.attr('placeholder', '请输入要搜索的图片信息');
							lang.stop(true, false).fadeOut(400);
							break;
						default:
							break;
					}
				});
			})(i)
		}
	})();

	function WarnLoading() {
		var dT = 6;
		var dtInterval = setInterval(function() {
			dT--;
			if(dT < 0) {
				$('.backResult-layer').hide();
				$('.yys-loading').show();
				var reloadTime = setTimeout(function() {
					$('.yys-loading').hide();
					searchIndex();
					clearTimeout(reloadTime);
				}, 1000)
				clearInterval(dtInterval);
				dT = 6;
			}
			$('#yyedtime').text(dT);
		}, 1000);
		$('.backResult-layer').fadeIn();
		$(document).on('click', '.backResult a', function() {
			$('.backResult-layer').hide();
			window.clearInterval(dtInterval);
			$('#yyedtime').text('6'); //初始化返回页面的倒数总时间
			InfoLayer(oldDataInfos); //客户详细信息弹框
		});
	}; //点击过快弹出框
	//主页搜索
	//鹰眼一下
	//    $(function(){
	function searchIndex() {

		if(!window.navigator.onLine) {
			$("body").tipAlert({
				title: '网络连接不可用，请检查您的网络状态。',
				noMsg: true
			});

			return;
		}

		if(searchType === 6) {
			$("body").tipAlert({
				title: "功能正在研发中，稍候上线。",
				noMsg: true
			});
			return;
		}

		if(yzzCookieToken.getClientBrowserId() == null ||
			yzzCookieToken.getPrevSearchTime() == null ||
			yzzCookieToken.getPrevExtractTime() == null) { //cookie过期则重新获取
			//获取初始标识cookie值
			sightseer();
		}

		//还是没有值，则表示该浏览器不支持cookie
		if(yzzCookieToken.getClientBrowserId() == null ||
			yzzCookieToken.getPrevSearchTime() == null ||
			yzzCookieToken.getPrevExtractTime() == null) { //cookie过期则重新获取

			$("body").tipAlert({
				title: '亲，您的网络状态不好，请重试。',
				noMsg: true
			});

			return;
		}

		var searchWord = $('#search-text').val();
		searchWord = searchWord.trim().toLowerCase(); //小写

		country = $('#countryName option:selected').attr('cid');

		if(country == undefined){
			country = "null";
		}
		
		if(searchWord.length == 0) {
			//$(".sc-warn").show(200);
			$('#search-text').addClass('red-input');
			
			$("body").tipAlert({
				title: '搜索内容不能为空。',
				noMsg: true
			});
			
			return;
		}

		//搜索联系方式
		if(searchType === 3) {

			var searchDomain = null;
			var searchUrl = null;

			if(searchWord.indexOf("/") != -1) {
				if(searchWord.startsWith("http://") || searchWord.startsWith("https://")) {
					searchUrl = searchWord;
					searchDomain = searchWord.split("/")[2];
				} else {
					searchDomain = searchWord.split("/")[0];
				}
			} else {
				searchDomain = searchWord;
			}

			if(!domainPattern.test(searchDomain)) {

				$("body").tipAlert({
					title: '域名格式不正确。',
					noMsg: true
				});

				return;
			}

			if(searchUrl == null) {
				if(searchDomain.split(".").length == 2) {
					searchUrl = "http://www." + searchDomain;
				} else {
					searchUrl = "http://" + searchDomain;
				}
			}

			if(myTime != null) {
				window.clearInterval(myTime); //停止等待时间定时器
			}
			second = "00";
			minute = "00";
			$('.time-second').text(second); //初始化定时器时间
			$('.time-minute').text(minute);
			$('.yys-warn').hide();
			myTime = setInterval("timeAdd()", 1000);
			$('.loading-layer').stop(true, false).fadeIn();
			$('#clientUrl').html(searchUrl);
			$('#clientUrl').attr("title", searchUrl);
			$('#clientUrl').attr("href", searchUrl);
			xhr_Link = $.ajax({
				type: "post",
				url: url + "/yys/search",
				headers: {
					"LoginUserToken": yzzCookieToken.getLoginUserToken(),
					"ClientBrowserId": yzzCookieToken.getClientBrowserId(),
					"PrevExtractTime": yzzCookieToken.getPrevExtractTime()
				},
				data: {
					"searchType": searchType,
					"searchWord": searchDomain,
					"currentPage": 1
				},
				success: function(data) {
					closeLoad();
					switch(data.code) {
						case 200:
							oldDataInfos = data;
							InfoLayer(data); //客户详细信息弹框
							break;
						case 101: //未登录没权限
							$('#log-in').click();
							$("#log-in-msg").html("此操作需要登录");
							$(".register .sign-in .import-table").css("margin-top", "37px");
							$("#log-in-msg").show();
							break;
						case 103: //当未查询到准确数据时的其他相似信息推送
							InfoLayer(data);
							break;
						case 105: //用户无权限看到更多信息时
							$("body").imageAlert();
							break;
						case 107: //用户点击过快时提示信息
							WarnLoading();
							break;
						case 108: //超过三十分钟未操作
							$(".longTimeNoDo-layer").fadeIn();

							var autoSecond = 3;
							$(".longTimeNoDo-layer #yyedtime").html(autoSecond);
							var autoTimer = setInterval(function() {
								autoSecond--;
								$(".longTimeNoDo-layer #yyedtime").html(autoSecond);
								if(autoSecond == 0) {
									//获取初始标识cookie值
									sightseer();
									location.reload(true);
								}
							}, 1000);
							break;
						case 300:
							var err = data.msg;
							console.log(err);

							$("body").tipAlert({
								title: '数据抓取失败，请重试。',
								noMsg: true
							});
							break;
						case 500:
							var err = data.msg;
							console.log(err);

							$("body").tipAlert({
								title: '服务器开小差了，请重试。',
								noMsg: true
							});
							break;
						case 501: //请求超时
							//$("body").tipAlert({
							//		title: '搜索超时，请稍后重试。',
							//		noMsg: true
							//});
							console.log("搜索超时，请稍后重试。");
							break;
						case 502: //请求异常
							$("body").tipAlert({
								title: '请求异常，请重试。',
								noMsg: true
							});
							break;
						default:
							$("body").tipAlert({
								title: data.msg,
								noMsg: true
							});
							break;
					}
				}
			});
		}
		//}
		else if(searchType === 1) {
			//搜索客户

			// site:语法判断
			var result = siteGrammarFilter(searchWord);

			if(result.isUse) {
				if(result.country != null) { //用来语法且正确
					country = result.country;
					searchWord = result.searchWord;
				} else {
					$("body").tipAlert({
						title: '您的输入不规范，请重新输入。错误：<span style="color:red;">' + result.msg + '</span>'
					});
					return;
				}
			}

			var searchConditions = {
				"searchType": searchType,
				"searchWord": $('#search-text').val().trim(),
				"country": country,
				"start": 0,
				"currentPage": 1
			};
			//保存搜索条件到cookie
			yzzCookieToken.setSearchConditions(JSON.stringify(searchConditions));

			//window.name = "searchType=" + searchType + "&" + "searchWord=" + searchWord + "&" + "country=" + country;
			location.href = 'result.html';

		} else if(searchType === 5) { //验证邮箱
			var searchEmail = emailPattern.test(searchWord);
			if(searchEmail) {
				$('.yys-loading #loading-msg').html("实时验证中，请稍候...");
				$('.yys-loading').show();
				$.ajax({
					type: "get",
					url: url + "/yys/validEmail",
					headers: {
						"LoginUserToken": yzzCookieToken.getLoginUserToken(),
						"ClientBrowserId": yzzCookieToken.getClientBrowserId()
					},
					data: {
						"email": searchWord
					},
					success: function(data) {
						$('.yys-loading #loading-msg').html("正在全球查询数据中，请稍候...");
						$('.yys-loading').hide();
						if(data.code === 200) {
							switch(data.data) {
								case -1:
									$("body").tipAlert({
										iconClass: "icon-cuowu",
										title: "该邮箱不可用。",
										noMsg: true
									});
									break;
								case 0:
									$("body").tipAlert({
										iconClass: "icon-queding",
										title: "该邮箱可用。",
										noMsg: true
									});
									break;
								case 1:
									$("body").tipAlert({
										iconClass: "icon-queding",
										title: "该邮箱正确。",
										noMsg: true
									});
									break;
								default:
									break;
							}
						} else if(data.code === 105) {
							$("body").imageAlert();
						} else if(data.code == 300) {
							var err = data.msg;
							console.log(err);

							$("body").tipAlert({
								title: '数据抓取失败，请重试。',
								noMsg: true
							});
						} else {
							$("body").tipAlert({
								title: data.msg,
								noMsg: true
							});
						}
					}
				})
			} else {
				$("body").tipAlert({
					title: "请输入正确的邮箱格式。",
					noMsg: true
				});
			}
		} else if(searchType === 6) {
			$("body").tipAlert({
				title: "功能正在研发中，稍候上线。",
				noMsg: true
			});
		}
	}

	//搜索框内容不能为空
	function searchWarn() {
		$(document).on('focus', '#search-text', function() {
			//$(".sc-warn").hide(200);
			$('#search-text').removeClass('red-input');
		})
	}
	searchWarn();
	//提取信息中的邮箱验证
	$(document).on('click', '.info-vertify', function() {
		var _this = this;
		var myEmail = $(this).parent().siblings().children('.info-email').html();
		$('.yys-loading #loading-msg').html("实时验证中，请稍候...");
		$('.yys-loading').show();
		$.ajax({
			type: "post",
			url: url + "/yys/validEmail",
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken(),
				"ClientBrowserId": yzzCookieToken.getClientBrowserId()
			},
			data: {
				"email": myEmail
			},
			success: function(data) {
				$('.yys-loading #loading-msg').html("正在全球查询数据中，请稍候...");
				$('.yys-loading').hide();
				if(data.code === 200) {
					switch(data.data) {
						case -1:
							$(_this).html('<span class="not">不可用</span>');
							$(_this).removeClass('info-vertify');
							break;
						case 0:
							$(_this).html('<span class="can">可用</span>');
							$(_this).removeClass('info-vertify');
							break;
						case 1:
							$(_this).html('<span class="sure">正确</span>');
							$(_this).removeClass('info-vertify');
							break;
						default:
							break;
					}
				} else if(data.code === 105) {
					$("body").imageAlert();
				} else if(data.code == 300) {
					var err = data.msg;
					console.log(err);

					$("body").tipAlert({
						title: '数据抓取失败，请重试。',
						noMsg: true
					});
				} else {
					$("body").tipAlert({
						title: data.msg,
						noMsg: true
					});
				}
			}
		})
	})
	$(document).on('click', '#searchBtnIndex', function() {
		searchIndex();
	});

	function keyDownSearch() {
		document.onkeydown = function(e) {
			if($('#search-text').is(":focus")) {
				var ev = document.all ? window.event : e;
				if(ev.keyCode == 13) {
					searchIndex();
				}
			}
		}
	}
	keyDownSearch();
	//});

})