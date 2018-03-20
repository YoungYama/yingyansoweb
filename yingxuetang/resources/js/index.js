var currUrl = decodeURIComponent(location.href);
var toPage = "yxt-index.html";
var page = "index";

var value = null;
var token = null;


$(function() {
	jQuery.support.cors = true; //ie9以下加配置浏览器安全可以进行跨域
	$.ajaxSetup({
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		}
	});

	initEnvet();

	initParams();

	goToPage();
	
	getUnreadMsgCount();
});

function initEnvet() {

	// 绑定回车事件
	$(document).keypress(function(e) {

		if(e.which == 13) {

			search();
		}

	});

//	$("#user-login a").eq(0).attr("href", yysConfigs.yysWebUrl + "/#login");
//	$("#user-login a").eq(1).attr("href", yysConfigs.yysWebUrl + "/#register");

	// 学堂介绍悬浮事件
	$(".shool-profile,#header-profile").mouseover(function() {
		$("#header #header-profile").show();
	});
	$(".shool-profile,#header-profile").mouseout(function() {
		$("#header #header-profile").hide();
	});

	//点击网页任意位置
	$("html,body").click(function() {
		$("#header-info").hide();
	});
}

function initParams() {

	if(currUrl.indexOf("?") != -1) {
		page = currUrl.split("?")[1];

		if(page.indexOf("&") != -1) {
			var pages = page.split("&");
			for(var i in pages) {
				if(pages[i].indexOf("action=") != -1) {
					page = pages[i].split("=")[1];
				} else if(pages[i].indexOf("token=") != -1) {
					token = pages[i].split("=")[1];
				} else if(pages[i].indexOf("value=") != -1) {
					value = pages[i].split("=")[1];
				}
			}
		} else if(page.startsWith("share-")) {
			var values = page.split("-");
			if(values.length == 3) {
				page = values[1];
				value = values[2];
			}
		} else {
			page = page.split("=")[1];
		}

	}
}

function search() {
	var searchWord = $("#search-input").val().trim();

	if(searchWord == null || searchWord.length == 0) {
		$("body").tipAlert({
			title: "搜索内容不能为空。",
			noMsg: true
		});

		return;
	}

	var srcType = $("#search-input").attr("srcType");
	var currUrl = "yxt-index.html";
	if(srcType == 0) { // 搜索课程
		currUrl = "yxt-index.html?action=courses&value=search-" + searchWord;
	} else { // 搜索资讯
		currUrl = "yxt-index.html?action=articles&value=" + searchWord;
	}

	location.href = currUrl;
}

function goToPage() {
	var title = "鹰学堂-首页";

	switch(page) {
		case "articles":
			title = "鹰学堂-最新资讯";
			toPage = "articles.html";
			break;
		case "courses":
			title = "鹰学堂-课程";
			toPage = "courses.html";
			break;
		case "article":
			title = "鹰学堂-资讯详情";
			toPage = "article.html";
			break;
		case "course":
			title = "鹰学堂-课程详情";
			toPage = "course.html";
			break;
		case "school-index":
			title = "鹰学堂-学堂简介";
			toPage = "school/index.html";
			break;
		case "school-value":
			title = "鹰学堂-学堂价值";
			toPage = "school/value.html";
			break;
		case "school-learning":
			title = "鹰学堂-学习模式";
			toPage = "school/learning.html";
			break;
		case "school-scope":
			title = "鹰学堂-课程范围";
			toPage = "school/scope.html";
			break;
		case "school-notice":
			title = "鹰学堂-课程预告";
			toPage = "school/notice.html";
			break;
		case "school-vip":
			title = "鹰学堂-VIP专区";
			toPage = "school/VIP.html";
			break;
		default:
			title = "鹰学堂-首页";
			toPage = "main.html";
			break;
	}

	$("title").html(title);

	toPage = getRootPath() + "/yingxuetang/views/" + toPage;

	loadPage(toPage);
}

function loadPage(url) {
	$.ajax({
		type: "get",
		url: url,
		async: false,
		success: function(html) {
			$("#main-content").html(html);
		}
	});
}

function getFormatTime(time) {
	var h = parseInt(time / 3600),
		m = parseInt(time % 3600 / 60),
		s = parseInt(time % 60);
	h = h < 10 ? "0" + h : h;
	m = m < 10 ? "0" + m : m;
	s = s < 10 ? "0" + s : s;
	return h + ":" + m + ":" + s;
}

function undone() {
	$("body").tipAlert({
		title: "该功能正在研发中，敬请期待。",
		noMsg: true
	});
}