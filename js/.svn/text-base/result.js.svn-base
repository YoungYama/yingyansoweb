var country = "null";
var searchType = 1;
var searchWord = "";
var searchTime = "";
var currentPage = 1;
var oldCurrentPage = 1;
var weburl;
var prevCountry = "";
var mainKeywordIds = null;
var totalPage = 0;
var pageHolder = {
	"keyword": searchWord,
	"country": country,
	"searchCondition": null,
	"page": null,
	"prevSearchTime": null
};

$(function() {
	/*jQuery.support.cors = true;
	$.ajaxSetup({
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		}
	});*/

	$(window).scroll(function() {

		if($(document).scrollTop() >= $(document).height() - $(window).height()) {
			$(".main .yys-content .yys-banner #index-img").css("bottom", "105px");
		} else {
			$(".main .yys-content .yys-banner #index-img").css("bottom", "5px");
		}


	});

	//分页操作
	$('#myPage').jqPaginator({
		totalPages: 100 + totalPage,
		visiblePages: 10,
		currentPage: 1,
		pagesize: 10,
		first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
		prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
		next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
		last: '<li class="last"><a href="javascript:void(0);">最后一页</a></li>',
		page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
		onPageChange: function(num, type) {
			if(type == 'change') {
				searchType = 2;
				currentPage = num;
				this.currentPage = currentPage;
				noData();
			}
		}
	});

	function loadSearch() {

		var searchConditions = yzzCookieToken.getSearchConditions();

		if(searchConditions != null) {
			searchConditions = JSON.parse(searchConditions);

			searchWord = searchConditions.searchWord;

			if(searchWord != undefined && searchWord.trim().length > 0) {
				searchType = searchConditions.searchType;
				country = searchConditions.country;
				currentPage = searchConditions.currentPage;

				pageHolder = yzzCookieToken.getPageHolder();
				if(pageHolder != null) {
					pageHolder = JSON.parse(pageHolder);
					if(!(pageHolder.keyword == searchWord && pageHolder.country == country)) {
						pageHolder = {
							"keyword": searchWord,
							"country": country,
							"searchCondition": null,
							"page": null,
							"prevSearchTime": null
						};
					}
				} else {
					pageHolder = {
						"keyword": searchWord,
						"country": country,
						"searchCondition": null,
						"page": null,
						"prevSearchTime": null
					};
				}

				$('#searchInput').val(searchWord);
				var selectLi = $('[cid=' + country + ']');

				//带国家的主页搜索跳转到结果页时相应展示
				if(country == 'null') {
					$('#sel1').html('亚洲区域');
					$('#sel2').html('欧洲区域');
					$('#sel3').html('美洲区域');
					$('#sel4').html('大洋洲区域');
					$('#sel5').html('非洲区域');
					$('.tip-li').removeClass('active');
					$('#normalCountry').addClass('active');
				} else {
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
				
				search();
			}
		}

	}

	function countryCheck(myCountry, id) {
		var myCountry = yysConfigs.countryMap[myCountry];
		var list = "";
		for(var i = 0, max = myCountry.length; i < max; i++) {
			var optionCountry = myCountry[i].country;
			var optionShorthand = myCountry[i].shorthand;

			var yzList = ' <li class="typeslect" cid="' + optionShorthand + '">' + optionCountry + '</li>';
			list += yzList;
		}
		$(id).html(list);
	};
	countryCheck('yz', '#drop-menu-yz');
	countryCheck('oz', '#drop-menu-oz');
	countryCheck('mz', '#drop-menu-mz');
	countryCheck('dyz', '#drop-menu-dyz');
	countryCheck('fz', '#drop-menu-fz');
	loadSearch(); //从(window.name)var searchConditions = yzzCookieToken.getSearchConditions();拿主页传来的数据或者刷新的时候实时更新数据
	(function() {
		//鹰学堂tab下拉效果
		function childShow(menu, child, allChild) {
			var f;
			$(menu).on('click', function() {
				f = !f;
				if(f) {
					$(child).show(200);
				} else {
					$(child).hide(200);
				}
			})
			document.addEventListener('click', function(e) {
				var target = $(e.target);
				if(!target.is(allChild)) {
					$(child).hide(200);
					f = false;
				}
			})
		}
		childShow('#eagle-class', '.more-li', '#eagle-class *')
	})();

	(function() {
		//点击展开条件下拉框
		function showList() {
			var li = $('.tip-li');
			for(var i = 0, max = li.length; i < max; i++) {
				(function(i) {
					li[i].addEventListener('click', function(e) {
						var child = $(this).children('.dropdown-menu')
						if(child.is(':hidden')) {
							child.stop(true, false).show(200);
							$(this).siblings('.tip-li').children('.dropdown-menu').stop(true, false).hide(200);
						} else {
							child.stop(true, false).hide(200);
						}
						$(document).one('click', function() {
							$('.dropdown-menu').stop(true, false).hide(200);
						})
						//阻止事件冒泡触发事件导致隐藏
						e.stopPropagation();
					});
					//阻止点击内容时隐藏
					$('.dropdown-menu').on('click', function(e) {
						e.stopPropagation()
					})
				})(i)
			}
			//$('.dropdown-menu li').on('click',function(){
			//    checkList();
			//});//点击国家下拉栏筛选
			$('#normalCountry').on('click', function() {
				$('#sel1').html('亚洲区域');
				$('#sel2').html('欧洲区域');
				$('#sel3').html('美洲区域');
				$('#sel4').html('大洋洲区域');
				$('#sel5').html('非洲区域');
				$('.tip-li').removeClass('active');
				$(this).addClass('active');
				$('.dropdown-menu').stop(true, false).hide(200);
				searchType = 1;
				currentPage = 1;
				country = 'null';
				searchWord = $("#searchInput").val().trim().toLowerCase();
				noData();
			}); //点击通用引擎
		};
		//点击切换选中以及选择条件
		function checkList() {
			var li = $('.typeslect');
			for(var i = 0, max = li.length; i < max; i++) {
				(function(i) {
					li[i].addEventListener('click', function() {

						searchWord = $("#searchInput").val().trim().toLowerCase();

						if(searchWord.startsWith("site:")) {
							$("body").tipAlert({
								title: '已使用了site:语法，请重新输入搜索内容。',
								noMsg: true
							});
							return;
						}

						currentPage = 1;
						searchType = 1;
						country = $(this).attr("cid");
						var text = $(this).html();
						$('#sel1').html('亚洲区域');
						$('#sel2').html('欧洲区域');
						$('#sel3').html('美洲区域');
						$('#sel4').html('大洋洲区域');
						$('#sel5').html('非洲区域');
						$('.tip-li').removeClass('active');
						$(this).parent().parent().addClass('active');
						$(this).parent().siblings('.drop-title').children('.mySelect').html(text);
						$('.dropdown-menu').stop(true, false).hide(200);
						
						chooseMmFont(country);
						
						noData();
					})
				})(i)
			}
		}
		showList();
		checkList();
	})();

	//提取联系信息
	$(document).on('click', '.getInfo-box', function() {
		if(!window.navigator.onLine) {
			$("body").tipAlert({
				title: '网络连接不可用，请检查您的网络状态。',
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

		if(myTime != null) {
			window.clearInterval(myTime); //停止等待时间定时器
		}
		searchType = 4;
		var companyId = $(this).attr('data-id');
		var home_page = $(this).attr('data-url');
		second = "00";
		minute = "00";
		myTime = setInterval("timeAdd()", 1000);
		$('.yys-warn').hide();
		$('.loading-layer').fadeIn();
		$('#clientUrl').html(home_page);
		$('#clientUrl').attr("title", home_page);
		$('#clientUrl').attr("href", home_page);

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
				"searchWord": companyId + "@espeed@" + mainKeywordIds
			},
			success: function(data) {
				closeLoad();
				switch(data.code) {
					case 200:
					case 103:
						downloadSearchWord = mainKeywordIds;
						updatePageHolderValue(0, data.data)
						InfoLayer(data);
						break;
					case 101:
						$('#log-in').click();
						$("#log-in-msg").html("此操作需要登录");
						$(".register .sign-in .import-table").css("margin-top", "37px");
						$("#log-in-msg").show();
						break;
					case 105:
						$("body").imageAlert();
						break;
					case 107:
						$("body").tipAlert({
							title: '亲，操作太快了哦。',
							noMsg: true
						});
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
	});

	//提取信息中的邮箱验证
	$(document).on('click', '.info-vertify', function() {
		var _this = this
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

	function WarnLoading() {
		var reloadTime = null;
		var dT = 6;
		var dtInterval = setInterval(function() {
			dT--;
			if(dT < 0) {
				$('.backResult-layer').hide();
				$('.yys-loading').show();
				reloadTime = setTimeout(function() {
					$('.yys-loading').hide();
					search();
					clearTimeout(reloadTime);
				}, 1000)
				clearInterval(dtInterval);
				dT = 6;
			}
			$('#yyedtime').text(dT);
		}, 1000);
		$('.backResult-layer').fadeIn();
		$(document).on('click', '.backResult a', function() {
			if(reloadTime != null) {
				clearTimeout(reloadTime);
			}
			window.clearInterval(dtInterval);

			$('.page').removeClass('active');
			//$('[jp-role="page"][jp-data=' + oldCurrentPage + ']').addClass('active'); //当点击过快出现提示时返回页码不跳转

			//翻页器显示当前页数
			$('#myPage').jqPaginator('option', {
				currentPage: oldCurrentPage
			});
			$('.backResult-layer').hide();

			$('#yyedtime').text('6'); //初始化返回页面的倒数总时间
			var selectLi = $('[cid=' + prevCountry + ']');
			//带国家的主页搜索跳转到结果页时相应展示
			if(prevCountry == 'null') {
				$('#sel1').html('亚洲区域');
				$('#sel2').html('欧洲区域');
				$('#sel3').html('美洲区域');
				$('#sel4').html('大洋洲区域');
				$('#sel5').html('非洲区域');
				$('.tip-li').removeClass('active');
				$('#normalCountry').addClass('active');
			} else {
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

			var searchConditions = {
				"searchType": searchType,
				"searchWord": $('#searchInput').val().trim(),
				"country": prevCountry,
				"currentPage": oldCurrentPage
			};
			//保存搜索条件到cookie
			yzzCookieToken.setSearchConditions(JSON.stringify(searchConditions));
		})
	}; //点击过快弹出框

	//搜索
	function search() {

		if(!window.navigator.onLine) {
			$("body").tipAlert({
				title: '网络连接不可用，请检查您的网络状态。',
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

		searchType = 1;
		searchWord = $('#searchInput').val();
		searchWord = searchWord.trim().toLowerCase(); //小写

		if(searchWord.length == 0) {
			$("body").tipAlert({
				title: '搜索内容不能为空。',
				noMsg: true
			});
		} else {
			noData();
		}

	};
	//展示搜索结果
	function noData() {
		var searchConditions = {
			"searchType": searchType,
			"searchWord": $('#searchInput').val().trim(),
			"country": country,
			"currentPage": currentPage
		};
		//保存搜索条件到cookie
		yzzCookieToken.setSearchConditions(JSON.stringify(searchConditions));

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

		$("title").html(searchWord + "-鹰眼搜-外贸人必须用的全球客户搜索引擎")

		searchTime = new Date();
		$('.yys-loading').show();

		if(!(pageHolder.keyword == searchWord && pageHolder.country == country)) {
			pageHolder = {
				"keyword": searchWord,
				"country": country,
				"searchCondition": null,
				"page": null,
				"prevSearchTime": null
			};
		} else {
			var currentData = pageHolder[currentPage.toString()];
			if(currentData != undefined && currentData != null) {
				pageHolder.page.currentPage = currentPage;
				sightseer();
				setListData();
				var content = $('#searchInput').val().trim(); //去除首尾空字符串
				content = escapeHtml(content);
				$('.yys-loading').hide();
				//搜索耗时
				var searchT = new Date() - searchTime;
				$('#searchTime').html(searchT / 1000);

				return;
			}
		}

		$.ajax({
			type: "post",
			url: url + "/yys/search",
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken(),
				"ClientBrowserId": yzzCookieToken.getClientBrowserId(),
				"PrevSearchTime": yzzCookieToken.getPrevSearchTime()
			},
			data: {
				"searchType": searchType,
				"searchWord": searchWord,
				"country": country,
				"currentPage": currentPage
			},
			success: function(data) {
				var content = $('#searchInput').val().trim(); //去除首尾空字符串
				content = escapeHtml(content);
				$('.yys-loading').hide();
				//搜索耗时
				var searchT = new Date() - searchTime;
				$('#searchTime').html(searchT / 1000);
				switch(data.code) {
					case 200:
						var isUseCrawler = data.data.isUseCrawler;
						if(isUseCrawler) { //调用爬虫系统实时抓取
							var page = pageHolder.page;
							//以前有了就要更新
							if(page != undefined && page != null) {
								page.currentPage = currentPage;
								page.start = page.start + 10;
								page.totalRecord = page.totalRecord + data.data.page.totalRecord;
								page.totalPage = page.totalPage + 1;

								data.data.page = page;
							}
						}

						setPageHolderValue(data)
						pageHolder.prevSearchTime = data.data[yzzCookieToken.keys.PREV_SEARCH_TIME];
						setListData();
						break;
					case 101: //需要登录
						$('#log-in').click();
						$("#log-in-msg").html("此操作需要登录");
						$(".register .sign-in .import-table").css("margin-top", "37px");
						$("#log-in-msg").show();
						break;
					case 105: //超出权限
						$("body").imageAlert();
						break;
					case 106: //没有设置未登录用户标识
						//获取初始标识cookie值
						sightseer();
						location.reload(true);
						break;
					case 107: //翻得过快
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
					case 301:
						var err = data.msg;
						console.log(err);

						$("body").tipAlert({
							title: '分析搜索词的语言来源异常，请重试。',
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
					case 503: //关键词错误
						$("body").tipAlert({
							title: '您的输入不规范，请重新输入。错误：<span style="color:red;">' + data.msg + '</span>'
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
		})
	};

	//鹰眼一下进行搜索
	$(document).on('click', '#searchBtn', function() {
		currentPage = 1;
		country = 'null';
		$('#sel1').html('亚洲区域');
		$('#sel2').html('欧洲区域');
		$('#sel3').html('美洲区域');
		$('#sel4').html('大洋洲区域');
		$('#sel5').html('非洲区域');
		$('.tip-li').removeClass('active');
		$('#normalCountry').addClass('active');
		search();
	});
	$('#searchInput').on("focus", function() {
		document.onkeydown = function(e) {
			var ev = document.all ? window.event : e;
			if(ev.keyCode == 13) {
				currentPage = 1;
				country = 'null';
				$('#sel1').html('亚洲区域');
				$('#sel2').html('欧洲区域');
				$('#sel3').html('美洲区域');
				$('#sel4').html('大洋洲区域');
				$('#sel5').html('非洲区域');
				$('.tip-li').removeClass('active');
				$('#normalCountry').addClass('active');
				search();
			}
		}
	})

});
//其他客户购买信息滚动效果
function autoScroll(obj) {
	$(obj).find("ul").stop(false, true).animate({
		marginTop: "-50px"
	}, 1000, function() {
		$(this).css({
			marginTop: "0px"
		}).find("li:first").appendTo(this);
	})
}
$(function() {
	var scroll = setInterval('autoScroll("#FontScroll")', 1500);
	$("#FontScroll").hover(function() {
		clearInterval(scroll);
	}, function() {
		scroll = setInterval('autoScroll("#FontScroll")', 1500);
	});
});

$(document).on('click', '#checkAll', function() {
	if($('#checkAll').is(':checked')) {
		$('.mycheckbox').prop('checked', true)
	} else {
		$('.mycheckbox').prop('checked', false)
	}
})

//设置列表缓存值
function setPageHolderValue(responseData) {
	if(!(pageHolder.keyword == searchWord && pageHolder.country == country)) {
		pageHolder = {
			"keyword": searchWord,
			"country": country,
			"searchCondition": null,
			"page": null,
			"prevSearchTime": null
		};
	} else {
		pageHolder.searchCondition = responseData.data.searchCondition;
		pageHolder.page = responseData.data.page;
		pageHolder[responseData.data.page.currentPage.toString()] = responseData.data.list;
	}
}
//修改列表缓存值
function updatePageHolderValue(type, data) {
	if(!(pageHolder.keyword == searchWord && pageHolder.country == country)) {
		pageHolder = {
			"keyword": searchWord,
			"country": country,
			"searchCondition": null,
			"page": null,
			"prevSearchTime": null
		};
	} else {
		if(type == 0) { //修改当前页列表中的某个客户的是否已阅和是否已存状态
			var currentData = pageHolder[currentPage.toString()];
			if((data != undefined && data != null) &&
				(currentData != undefined && currentData != null)) {
				for(var i in currentData) {
					if(data._id == currentData[i]._id) {
						var newData = currentData[i];
						newData.isSave = data.isSave;
						newData.isRead = data.isRead;

						currentData[i] = newData;
						break;
					}
				}

				var statusTitle = '';
				var status = '';
				if(data.isSave) {
					statusTitle = '已存';
					status = '<small class="isSave" title="' + statusTitle + '">' + statusTitle + '</small>';
				} else {
					if(data.isRead) {
						statusTitle = '已阅';
						status = '<small class="isRead" title="' + statusTitle + '">' + statusTitle + '</small>';
					}
				}

				$('div[info-id="' + data._id + '"]').find('.info-status').html(status);
				$('div[info-id="' + data._id + '"]').find('.getInfo-box').attr("title", statusTitle);
				//更新
				pageHolder[currentPage.toString()] = currentData;
				yzzCookieToken.setPageHolder(JSON.stringify(pageHolder));
			}
		}

	}
}

//渲染数据
function setListData() {
	var searchCondition = pageHolder.searchCondition;
	var list = pageHolder[currentPage.toString()];
	var page = pageHolder.page;

	var searchKeywords = searchCondition.searchKeywords;

	mainKeywordIds = searchCondition.mainKeywordIds;
	prevCountry = country;

	var recordNums = page.totalRecord.toString();
	oldCurrentPage = page.currentPage;

	recordNums = recordNums.split("");
	var recordCount = 0;
	var tempStr = "";

	recordNums = recordNums.reverse();

	for(var index in recordNums) {
		if(recordCount > 0 && recordCount % 3 == 0) {
			tempStr += "," + recordNums[index];
		} else {
			tempStr += recordNums[index];
		}
		recordCount++;
	}

	var tempStrs = tempStr.split("").reverse();
	tempStr = "";

	for(var index in tempStrs) {
		tempStr += tempStrs[index];
	}

	tempStr += ",000,000";

	$('#recordNum').html(tempStr);
	$('.info-list-box').html(''); //初始化dom中信息列表

	if(list != null && list.length > 0) {
		$('.noData').hide();
		for(var i = 0, max = list.length; i < max; i++) {
			var subject = list[i].subject;
			var desc = list[i].desc;
			subject = escapeHtml(subject);
			desc = escapeHtml(desc);
			//关键字变红

			var regExp = null;
			for(var j = 0, length = searchKeywords.length; j < length; j++) {
				regExp = new RegExp(searchKeywords[j], "igm");

				subject.replace(regExp, function(originalData) {

					subject = subject.replace(regExp, '<b>' + originalData + '</b>');
				});

				desc.replace(regExp, function(originalData) {

					desc = desc.replace(regExp, '<b>' + originalData + '</b>');
				});

			}

			var home_page = escapeHtml(list[i].home_page);
			weburl = escapeHtml(list[i].weburl);

			var status = '';
			var statusTitle = '';

			if(list[i].isSave) {
				statusTitle = '已存';
				status = '<small class="isSave" title="' + statusTitle + '">' + statusTitle + '</small>';
			} else {
				if(list[i].isRead) {
					statusTitle = '已阅';
					status = '<small class="isRead" title="' + statusTitle + '">' + statusTitle + '</small>';
				}
			}

			var id = escapeHtml(list[i]._id);
			var infoList = '<div class="info-list" info-id="' + id +
				'"><div class="info-title"><input type="checkbox" class="mycheckbox"/><a href="' +
				weburl + '" target="_blank" class="myTitle" title="' + weburl + '">' +
				subject + '</a><span class="translate-btn"><a href="http://www.microsofttranslator.com/bv.aspx?to=zh-CHS&a=' +
				weburl + '" target="_blank">翻译</a></span></div><div class="info-intro">' +
				desc + '</div><div class="info-url"><div class="info-home-page"><a href="' + home_page +
				'" target="_blank" title="' + home_page + '">' + home_page +
				'</a></div><span class="info-status">' + status +
				'</span></div><div class="getInfo-box" data-id="' + id +
				'" data-url="' + home_page + '" title="' + statusTitle + '">提取联系信息</div></div>';
			$('.info-list-box').append(infoList);
		}
	}
	if(list == null || list.length <= 1) {
		$(".noData #noData-searchWord").html(" “" + searchWord + "” ");

		$(".noData #noData-getMoreInfo").unbind("click");
		$(".noData #noData-getMoreInfo").bind("click", function() {
			//重新获取初始标识cookie值
			sightseer();
			var searchConditions = {
				"searchType": 1,
				"searchWord": searchWord,
				"country": "null",
				"currentPage": 1
			};
			//保存搜索条件到cookie
			yzzCookieToken.setSearchConditions(JSON.stringify(searchConditions));
			location.href = "result.html";
		});
		$('.noData').show();
	}

	//更新上一次搜索时间
	var prevSearchTime = pageHolder.prevSearchTime;

	yzzCookieToken.setPrevSearchTime(prevSearchTime);

	//翻页器显示当前页数
	$('#myPage').jqPaginator('option', {
		currentPage: currentPage
	});
	//滚动条回到顶部
	$('html,body').animate({
		scrollTop: '0px'
	}, 400);

	//搜索耗时
	searchT = new Date() - searchTime;
	$('#searchTime').html(searchT / 1000);
	
	chooseMmFont(country);

	yzzCookieToken.setPageHolder(JSON.stringify(pageHolder));

	var nextPage = currentPage + 1;
	var nextData = pageHolder[nextPage.toString()];

	totalPage = page.totalPage;

	//六秒后自动去获取下一页数据
	//小于等于总页数且没有缓存下一页的数据

	if(nextPage <= totalPage && (nextData == undefined || nextData == null)) {
		autoGetData();
	}

}

//自动获取下一页数据
function autoGetData() {
	var autoSecond = autoSearchTimer;
	var failureCount = 0; //失败次数
	var autoTimer = setInterval(function() {
		autoSecond--;
		if(autoSecond == 0) {
			var nextPage = currentPage + 1;
			$.ajax({
				type: "post",
				url: url + "/yys/search",
				headers: {
					"LoginUserToken": yzzCookieToken.getLoginUserToken(),
					"ClientBrowserId": yzzCookieToken.getClientBrowserId(),
					"PrevSearchTime": yzzCookieToken.getPrevSearchTime()
				},
				data: {
					"searchType": 6,
					"searchWord": searchWord,
					"country": country,
					"currentPage": nextPage
				},
				//async: false,
				success: function(data) {
					if(data.code == 200) {
						clearInterval(autoTimer);

						setPageHolderValue(data);

						pageHolder.prevSearchTime = data.data[yzzCookieToken.keys.PREV_SEARCH_TIME];

						yzzCookieToken.setPageHolder(JSON.stringify(pageHolder));
					} else {
						if(data.code == 107 || data.code == 108) {
							sightseer();

							pageHolder.prevSearchTime = yzzCookieToken.getPrevSearchTime();
						}

						failureCount++;
						//失败则重新请求
						autoSecond = failureCount * autoSearchTimer;
						if(autoSecond >= (5 * 60)) { //大于5分钟则关闭定时器
							clearInterval(autoTimer);
						}
					}

				}
			});
		}
	}, 1000);

}