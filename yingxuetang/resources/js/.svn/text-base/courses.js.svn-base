var sortType = 0;
var isOpen = -1;// -1：全部、0：VIP课程、1：公开课程
var searchWord = null;
var columnId = -1;
var currentPage = 1;// 当前页
var pageSize = 6;// 每页量
var columns = null;

$(function() {
	if (value != null && value.startsWith("open-")) {

		var type = value.replace("open-", "");

		if (type.trim().length > 0 && !isNaN(type)) {

			$("#courses-left-type1 span").removeClass("active");

			if (type == 1) {
				isOpen = type;
				$("#courses-left-type1 span").eq(1).addClass("active");
			} else if (type == 0) {
				isOpen = type;
				$("#courses-left-type1 span").eq(2).addClass("active");
			} else if (type == 2) {
				isOpen = -1;
				$("#courses-left-type1 span").eq(0).addClass("active");

				sortType = 2;
				$("#courses-left-sort span").css("text-decoration", "none");
				$("#courses-left-sort span").eq(1).css("text-decoration",
						"underline");

				$("#courses-left-sort span").eq(0).attr("sort", "ASC");
				$("#courses-left-sort span").eq(0).attr("title", "按课程更新时间降序排序");
			} else {
				isOpen = -1;
				$("#courses-left-type1 span").eq(0).addClass("active");
			}
		}
	}

	initEvent();

	getColumns();

	getCourses();

	getHots();
});

function initEvent() {
	$("#courses-left-type1 span").click(function() {
		$("#courses-left-type1 span").removeClass("active");
		$(this).addClass("active");
		isOpen = $(this).attr("type");
		currentPage = 1;// 当前页
		
		getCourses();
	});

	$("#courses-left-sort span").click(function() {
		var sort = $(this).attr("sort");// 目前升降序
		var title = "";

		$("#courses-left-sort span").css("text-decoration", "none");
		$(this).css("text-decoration", "underline");

		if ($(this).attr("type") == "time") {
			if (sort == "DESC") {
				sort = "ASC";
				sortType = 1;
				title = "按课程更新时间降序排序";
			} else {
				sort = "DESC";
				sortType = 0;
				title = "按课程更新时间升序排序";
			}

			$(this).attr("sort", sort);
			$(this).attr("title", title);
			$("#courses-left-sort span").eq(1).attr("sort", "ASC");
			$("#courses-left-sort span").eq(1).attr("title", "按课程热门程度降序排序");
		} else {
			if (sort == "DESC") {
				sort = "ASC";
				sortType = 3;
				title = "按课程热门程度降序排序";
			} else {
				sort = "DESC";
				sortType = 2;
				title = "按课程热门程度升序排序";
			}

			$(this).attr("sort", sort);
			$(this).attr("title", title);
			$("#courses-left-sort span").eq(0).attr("sort", "DESC");
			$("#courses-left-sort span").eq(0).attr("title", "按课程更新时间升序排序");
		}
		
		currentPage = 1;// 当前页

		getCourses();
	});

}

function getColumns() {
	$.ajax({
		type : "post",
		url : yysConfigs.yxtServiceUrl + "/column/columns",
		data : {
			type : 0
		},
		async : false,
		headers : {
			"LoginUserToken" : yzzCookieToken.getLoginUserToken()
		},
		success : function(responseData) {
			if (responseData.code === 200) {
				var list = responseData.data;
				columns = list;
				if (list != null && list.length > 0) {
					var html = '<span type="-1" class="active">全部</span>';

					var count = 0;
					var length = 0;
					var max = 695;

					for ( var i in list) {

						// 字体的宽度+span标签的宽度
						length += (list[i].name.length * 14.5) + 10;

						if (count == 0) {// 第一行
							max = max - 39;
						}

						if (length > max) {
							count++;
							length = (list[i].name.length * 14.5) + 10;

							html += '<br /><span type="' + list[i].id + '">'
									+ list[i].name + '</span>';
						} else {
							html += '<span type="' + list[i].id + '">'
									+ list[i].name + '</span>';
						}

					}

					$("#courses-left-type2").html(html);

					$("#courses-left-type2 span").click(function() {
						$("#courses-left-type2 span").removeClass("active");
						$(this).addClass("active");

						columnId = $(this).attr("type");

						getCourses();
					});
				} else {
					$("#courses-left-type2").html('');
				}

			} else {
				$("body").tipAlert({
					title : "课程栏目加载失败，请重试。",
					noMsg : true
				});
				console.log(responseData.msg);
			}
		}
	});
}

function getCourses() {

	if (value != null && value.startsWith("search-")) {

		searchWord = value.replace("search-", "");
	}

	var data = {};
	if (searchWord == null || searchWord.trim().length == 0) {
		data = {
			sortType : sortType,
			isOpen : isOpen,
			columnId : columnId,
			currentPage : currentPage,// 当前页
			pageSize : pageSize,// 每页量
		};
	} else {
		$("#search-input").val(searchWord);

		data = {
			sortType : sortType,
			isOpen : isOpen,
			columnId : columnId,
			currentPage : currentPage,// 当前页
			pageSize : pageSize,// 每页量
			searchWord : searchWord
		};
	}

	$.ajax({
		type : "post",
		url : yysConfigs.yxtServiceUrl + "/course/select/list",
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

				var html = "全部课程";

				if (isOpen != -1) {
					if (isOpen == 1) {
						html = "公开课程";
					} else {
						html = "VIP课程";
					}
				}

				if (columnId != -1) {
					if (columns != null) {
						for ( var i in columns) {
							if (columnId == columns[i].id) {
								html += " + " + columns[i].name;
								break;
							}
						}
					}
				}

				if (searchWord != null && searchWord.length > 0) {
					html += " + 搜索：" + searchWord;
				}

				if (sortType == 0) {
					html += " + 按更新时间降序";
				} else if (sortType == 1) {
					html += " + 按更新时间升序";
				} else if (sortType == 2) {
					html += " + 按热门程度降序";
				} else if (sortType == 3) {
					html += " + 按热门程度升序";
				}

				$("#show-type").html(html);

				setListTable(responseData.data);
			} else {
				$("body").tipAlert({
					title : "课程列表加载失败，请重试。",
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

		$("#courses-left-list").html(html);
		
		$("#courses-left-page .page-box").hide();
		return;
	}

	var page = data.page;
	var list = data.list;

	var html = '';

	if (list != null && list.length > 0) {
		for ( var i in list) {

			var url = getRootPath() + '/yxt-index.html?action=course&value='
					+ list[i].id;

			html += '<div class="one-course-div"> <a title="'
					+ list[i].courseName
					+ '" href="'
					+ url
					+ '"> <div class="one-course-img"> <img src="'
					+ yysConfigs.yxtServiceUrl
					+ list[i].homePic
					+ '"/> </div> </a>  <div class="one-course-detail"> <div class="one-course-title-div" title="'
					+ list[i].courseName
					+ '"> <a href="'
					+ url
					+ '">'
					+ list[i].courseName
					+ '</a> </div> <div class="one-course-publisher-div">讲师：<span title="'
					+ list[i].publisherName
					+ '">'
					+ list[i].publisherName
					+ '</span></div> <div class="one-course-desc-div" title="'
					+ list[i].desc
					+ '"> '
					+ list[i].desc
					+ ' </div> <div class="one-course-view-div"> <i class="icon iconfont icon-yiyuedu" title="浏览数'
					+ list[i].pageView + '"></i><span>' + list[i].pageView
					+ '</span></div> </div> </div>';

		}

		$("#courses-left-list").html(html);

		if (page.totalPage > 1) {

			$("#courses-left-page .page-box").jqPaginator({
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

						getCourses();
					}
				}
			});
			
			$("#courses-left-page .page-box").show();
		} else {
			$("#courses-left-page .page-box").hide();
		}
	} else {
		var html = '<p style="position: relative;top: 40px;left: 120px;">没有数据</p><img src="https://www.yingyanso.cn/img/no-msg.gif" width="300px">';

		$("#courses-left-list").html(html);
		
		$("#courses-left-page .page-box").hide();
	}

}

// 获取热门推荐视频信息
function getHots() {
	$
			.ajax({
				type : "post",
				url : yysConfigs.yxtServiceUrl + "/course/select/list",
				data : {
					sortType : 2,
					currentPage : 1,
					pageSize : 10
				},
				async : true,
				headers : {
					"LoginUserToken" : yzzCookieToken.getLoginUserToken()
				},
				success : function(responseData) {
					var html = '';

					if (responseData.code != 200) {
						console.log(responseData.msg);

						$("#courses-right").html("");
					} else {

						if (responseData.data == null) {
							$("#courses-right").html("");
						} else {

							var list = responseData.data.list;

							var count = 0;
							html = '<div id="courses-right-title">热门课程</div>';

							for ( var i in list) {
								var url = getRootPath()
										+ '/yxt-index.html?action=course&value='
										+ list[i].id;

								if (count == 0) {
									html += '<div id="first-one-div"> <a href="'
											+ url
											+ '"><div id="first-left"><img src="'
											+ yysConfigs.yxtServiceUrl
											+ list[i].homePic
											+ '" title="'
											+ list[i].courseName
											+ '" /></div> </a> <div id="first-right"> <div id="first-right-title" title="'
											+ list[i].courseName
											+ '"> <a href="'
											+ url
											+ '">'
											+ list[i].courseName
											+ '</a> </div> <div>浏览数'
											+ list[i].pageView
											+ '</div> </div> </div>';
								} else {
									html += '<div class="hot-course" title="'
											+ list[i].courseName + '">'
											+ (count + 1) + '. <a href="' + url
											+ '">' + list[i].courseName
											+ '</a> </div>';
								}
								count++;
							}

						}
					}

					$("#courses-right").html(html);
				}
			});
}