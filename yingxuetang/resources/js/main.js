$(function() {
	getHots();

	getArticles();

	getAqs();

	getOpenCourses();

	geVIPCourses();
});

// 获取热门推荐视频信息
function getHots() {
	$
		.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/select/list",
			data: {
				sortType: 2,
				currentPage: 1,
				pageSize: 4
			},
			async: true,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {

				if(responseData.code != 200) {
					console.log(responseData.msg);

					$("#main-hot-course .main-course-div")
						.html(
							'<p style="position: relative;top: 40px;left: 120px;">数据加载异常</p><img src="https://www.yingyanso.cn/img/no-msg.gif" width="300px">');
				} else {

					if(responseData.data == null) {
						$("#main-hot-course .main-title-div div").eq(1)
							.hide();

						$("#main-hot-course .main-course-div")
							.html(
								'<p style="position: relative;top: 40px;left: 120px;">没有数据</p><img src="https://www.yingyanso.cn/img/no-msg.gif" width="300px">');
					} else {

						var list = responseData.data.list;

						var html = '';
						var tag = '';

						for(var i in list) {

							if((parseInt(i) + 1) % 4 == 0) {
								tag = ' class="last-child-a"';
							} else {
								tag = '';
							}

							var url = getRootPath() +
								'/yxt-index.html?action=course&value=' +
								list[i].id;

							html += '<a ' +
								tag +
								'href="' +
								url +
								'"> <div class="one-course-div"> <div style="background-image: url(' +
								yysConfigs.yxtServiceUrl +
								list[i].homePic +
								');" class="one-course-img" title="' +
								list[i].courseName +
								'"></div> <div class="one-course-detail"> <div class="one-course-title" title="' +
								list[i].courseName +
								'"> ' +
								list[i].courseName +
								' </div> <div class="one-course-other"> <div class="publisher" title="' +
								list[i].publisherName +
								'">' +
								list[i].publisherName +
								'</div> <div class="nums"><i class="icon iconfont icon-yiyuedu" title="浏览数' +
								list[i].pageView +
								'"></i> <span>' +
								list[i].pageView +
								'</span></div> </div> <div class="one-course-desc" title="' +
								list[i].desc + '"> ' + list[i].desc +
								'</div> </div> </div> </a>';

						}

						$("#main-hot-course .main-course-div").html(html);
					}

				}

			}
		});
}
// 获取学员问答
function getAqs() {
	$
		.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/select/commentList",
			data: {
				sortType: 0,
				type: 0,
				currentPage: 1,
				pageSize: 4
			},
			async: true,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {
				var html = '';

				if(responseData.code == 200) {
					if(responseData.data != null ||
						responseData.data.list.length == 0) {
						var list = responseData.data.list;

						for(var i in list) {
							var text = $(
								"<div>" +
								htmlspecialcharsback(list[i].content) +
								"</div>").text();

							var url = getRootPath() +
								'/yxt-index.html?action=course&value=' +
								list[i].targetId + "&comment=" +
								list[i].id;

							if(text.trim().length > 0) {

								html += '<div><i class="icon iconfont icon-tubiao-"></i> <a title="' +
									text +
									'" href="' +
									url +
									'">' +
									text +
									'</a> </div>';
							}
						}

						$("#main-share-action .aq-list").html(html);
					} else {
						$("#main-share-action .aq-list")
							.html(
								"<p style='position: relative; top: 20px;color: #fff;'>暂无数据</p>");
					}
				} else {
					$("#main-share-action .aq-list")
						.html(
							"<p style='position: relative; top: 20px;color: #fff;'>数据加载异常</p>");
					console.log(responseData.msg);
				}
			}
		});
}
// 获取最新资讯
function getArticles() {
	$
		.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/article/select/list",
			data: {
				sortType: 12,
				currentPage: 1, // 当前页
				pageSize: 4, // 每页量
			},
			async: true,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {
				var html = '';

				if(responseData.code == 200) {
					if(responseData.data != null) {
						var list = responseData.data.list;

						for(var i in list) {

							var url = getRootPath() +
								'/yxt-index.html?action=article&value=' +
								list[i].id;

							html += '<div><i class="icon iconfont icon-tubiao-"></i> <a title="' +
								list[i].articleName +
								'" href="' +
								url +
								'">' +
								list[i].articleName +
								'</a> </div>';
						}

						$("#main-share-action .news-list").html(html);
					} else {
						$("#main-share-action .news-list")
							.html(
								"<p style='position: relative; top: 20px;color: #fff;'>暂无数据</p>");
					}
				} else {
					$("#main-share-action .news-list")
						.html(
							"<p style='position: relative; top: 20px;color: #fff;'>数据加载异常</p>");
					console.log(responseData.msg);
				}
			}
		});
}

// 公开课程
function getOpenCourses() {
	$
		.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/select/list",
			data: {
				sortType: 0,
				isOpen: 1,
				currentPage: 1,
				pageSize: 4
			},
			async: true,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {

				if(responseData.code != 200) {
					console.log(responseData.msg);

					$("#main-open-course .main-course-div")
						.html(
							'<p style="position: relative;top: 40px;left: 120px;">数据加载异常</p><img src="https://www.yingyanso.cn/img/no-msg.gif" width="300px">');
				} else {

					if(responseData.data == null) {
						$("#main-open-course .main-title-div div").eq(1)
							.hide();

						$("#main-open-course .main-course-div")
							.html(
								'<p style="position: relative;top: 40px;left: 120px;">没有数据</p><img src="https://www.yingyanso.cn/img/no-msg.gif" width="300px">');
					} else {

						var list = responseData.data.list;

						var html = '';
						var tag = '';

						for(var i in list) {

							if((parseInt(i) + 1) % 4 == 0) {
								tag = ' class="last-child-a"';
							} else {
								tag = '';
							}

							var url = getRootPath() +
								'/yxt-index.html?action=course&value=' +
								list[i].id;

							html += '<a ' +
								tag +
								'href="' +
								url +
								'"> <div class="one-course-div"> <div style="background-image: url(' +
								yysConfigs.yxtServiceUrl +
								list[i].homePic +
								');" class="one-course-img" title="' +
								list[i].courseName +
								'"></div> <div class="one-course-detail"> <div class="one-course-title" title="' +
								list[i].courseName +
								'"> ' +
								list[i].courseName +
								' </div> <div class="one-course-other"> <div class="publisher" title="' +
								list[i].publisherName +
								'">' +
								list[i].publisherName +
								'</div> <div class="nums"><i class="icon iconfont icon-yiyuedu" title="浏览数' +
								list[i].pageView +
								'"></i> <span>' +
								list[i].pageView +
								'</span></div> </div> <div class="one-course-desc" title="' +
								list[i].desc + '"> ' + list[i].desc +
								'</div> </div> </div> </a>';

						}

						$("#main-open-course .main-course-div").html(html);
					}

				}

			}
		});
}

// VIP课程
function geVIPCourses() {
	$
		.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/select/list",
			data: {
				sortType: 0,
				isOpen: 0,
				currentPage: 1,
				pageSize: 8
			},
			async: true,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {

				if(responseData.code != 200) {
					console.log(responseData.msg);

					$("#main-vip-course .main-course-div")
						.html(
							'<p style="position: relative;top: 40px;left: 120px;">数据加载异常</p><img src="https://www.yingyanso.cn/img/no-msg.gif" width="300px">');
				} else {

					if(responseData.data == null) {
						$("#main-vip-course .main-title-div div").eq(1)
							.hide();

						$("#main-vip-course .main-course-div")
							.html(
								'<p style="position: relative;top: 40px;left: 120px;">没有数据</p><img src="https://www.yingyanso.cn/img/no-msg.gif" width="300px">');
					} else {

						var list = responseData.data.list;

						var html = '';
						var tag = '';

						for(var i in list) {

							if((parseInt(i) + 1) % 4 == 0) {
								tag = ' class="last-child-a"';
							} else {
								tag = '';
							}

							var url = getRootPath() +
								'/yxt-index.html?action=course&value=' +
								list[i].id;

							html += '<a ' +
								tag +
								'href="' +
								url +
								'"> <div class="one-course-div"> <div style="background-image: url(' +
								yysConfigs.yxtServiceUrl +
								list[i].homePic +
								');" class="one-course-img" title="' +
								list[i].courseName +
								'"></div> <div class="one-course-detail"> <div class="one-course-title" title="' +
								list[i].courseName +
								'"> ' +
								list[i].courseName +
								' </div> <div class="one-course-other"> <div class="publisher" title="' +
								list[i].publisherName +
								'">' +
								list[i].publisherName +
								'</div> <div class="nums"><i class="icon iconfont icon-yiyuedu" title="浏览数' +
								list[i].pageView +
								'"></i> <span>' +
								list[i].pageView +
								'</span></div> </div> <div class="one-course-desc" title="' +
								list[i].desc + '"> ' + list[i].desc +
								'</div> </div> </div> </a>';

						}

						$("#main-vip-course .main-course-div").html(html);
					}

				}

			}
		});
}