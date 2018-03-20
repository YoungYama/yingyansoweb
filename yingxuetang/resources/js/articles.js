var sortType = 12;// 11：时间升序、12：时间降序、9：最火升序、10：最火降序
var searchWord = null;
var currentPage = 1;// 当前页
var pageSize = 10;// 每页量

$(function() {
	$("#search-input").attr("placeholder", "搜索资讯");
	$("#search-input").attr("srcType", "1");

	initEvent();

	getOneArticles();

});

function initEvent() {
	$("#articles-sort span").click(function() {
		var sort = $(this).attr("sort");// 目前升降序
		var title = "";

		$("#articles-sort span").removeClass("active");
		$(this).addClass("active");

		if ($(this).attr("type") == "time") {
			if (sort == "DESC") {
				sort = "ASC";
				sortType = 11;
				title = "按资讯更新时间降序排序";
			} else {
				sort = "DESC";
				sortType = 12;
				title = "按资讯更新时间升序排序";
			}

			$(this).attr("sort", sort);
			$(this).attr("title", title);
			$("#articles-sort span").eq(1).attr("sort", "ASC");
			$("#articles-sort span").eq(1).attr("title", "按资讯热门程度降序排序");
		} else {
			if (sort == "DESC") {
				sort = "ASC";
				sortType = 9;
				title = "按资讯热门程度降序排序";
			} else {
				sort = "DESC";
				sortType = 10;
				title = "按资讯热门程度升序排序";
			}

			$(this).attr("sort", sort);
			$(this).attr("title", title);
			$("#articles-sort span").eq(0).attr("sort", "DESC");
			$("#articles-sort span").eq(0).attr("title", "按资讯更新时间升序排序");
		}
		
		currentPage = 1;// 当前页

		getOneArticles();
	});
}

function getOneArticles() {
	searchWord = value;

	var data = {};
	if (searchWord == null || searchWord.trim().length == 0) {
		data = {
			sortType : sortType,
			currentPage : currentPage,// 当前页
			pageSize : pageSize,// 每页量
		};
	} else {
		$("#search-input").val(searchWord);

		data = {
			sortType : sortType,
			currentPage : currentPage,// 当前页
			pageSize : pageSize,// 每页量
			searchWord : searchWord
		};
	}

	$.ajax({
		type : "post",
		url : yysConfigs.yxtServiceUrl + "/article/select/list",
		data : data,
		async : true,
		beforeSend : function() {
			$(".yys-loading").show();
		},
		complete : function() {
			$(".yys-loading").hide();
		},
		headers : {
			"LoginUserToken" : yzzCookieToken.getLoginUserToken()
		},
		success : function(responseData) {
			if (responseData.code === 200) {
				setListTable(responseData.data);
			} else {
				$("body").tipAlert({
					title : "文章列表加载失败，请重试。",
					noMsg : true
				});
				console.log(responseData.msg);
			}
		}
	});

}

function setListTable(data) {

	if (data == null) {
		var html = '<p style="position: relative;top: 40px;left: 120px;">没有数据</p><img src="https://www.yingyanso.cn/img/no-msg.gif" width="300px">';

		$("body").css("background-color", "#ffffff");
		$("#articles-list").html(html);
		
		$("#articles-page .page-box").hide();
		return;
	}

	var page = data.page;
	var list = data.list;

	var html = '';

	if (list != null && list.length > 0) {
		for ( var i in list) {

			var url = getRootPath() + '/yxt-index.html?action=article&value='
					+ list[i].id;

			html += '<div class="one-article"> <div class="one-article-left-img"><a href="'
					+ url
					+ '" title="'
					+ list[i].articleName
					+ '"><img src="'
					+ yysConfigs.yxtServiceUrl
					+ list[i].homePic
					+ '" /></a></div> <div class="one-article-right-detail"> <div class="one-article-title"><a href="'
					+ url
					+ '" title="'
					+ list[i].articleName
					+ '">'
					+ list[i].articleName
					+ '</a></div> <div class="one-article-desc" title="'
					+ list[i].desc
					+ '">'
					+ list[i].desc
					+ '</div> <div class="one-article-other"><span class="publisher">'
					+ list[i].publisherName
					+ '</span><span>发布于</span><span>'
					+ list[i].createTime + '</span></div> </div> </div>';
		}

		$("#articles-list").html(html);

		if (page.totalPage > 1) {
			
			$("#articles-page .page-box").jqPaginator({
				totalPages: page.totalPage,
				visiblePages: 5,
				currentPage: currentPage,
				pagesize: page.pageSize,
				first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
				prev: '<li class="prev"><a href="javascript:void(0);"><</a></li>',
				next: '<li class="next"><a href="javascript:void(0);">></a></li>',
				last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
				page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
				onPageChange: function(num, type) {
					if(type == 'change') {
						currentPage = num;
						this.currentPage = currentPage;

						getOneArticles();
					}
				}
			});
			$("#articles-page .page-box").show();
		} else {
			$("#articles-page .page-box").hide();
		}
	} else {
		var html = '<p style="position: relative;top: 40px;left: 120px;">没有数据</p><img src="https://www.yingyanso.cn/img/no-msg.gif" width="300px">';

		$("body").css("background-color", "#ffffff");
		$("#articles-list").html(html);
		
		$("#articles-page .page-box").hide();
	}

}