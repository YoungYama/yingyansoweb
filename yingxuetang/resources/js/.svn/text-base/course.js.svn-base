var courseEditor = null;
var id = 0;
var commentId = 0;
var commentReplyId = 0;

var catalogCurrentPage = 1; // 目录当前页

var commentCurrentPage = 1; // 讨论区当前页
var commentPageSize = 6;

var currentCourse = null;
var player = null;
var playTime = null;
var isSubmitPlayTime = false;
var isEnd = false;
var seekPlayTime = 0;

$(function() {
	getOneCourse();

	initShare();

	initEvent();

	initEditor();

	getHots();

	if(commentId > 0) {
		getOneComment();
		$("#player-bottom #course-ask-list").show();
	} else {
		$("#player-bottom #course-ask-list").hide();
	}
});

// 查看某条评论
function getOneComment() {
	$.ajax({
		type: "post",
		url: yysConfigs.yxtServiceUrl + "/course/select/commentStart",
		data: {
			targetId: commentId,
			type: 0,
			pageSize: commentPageSize
		},
		async: false,
		headers: {
			"LoginUserToken": yzzCookieToken.getLoginUserToken()
		},
		success: function(data) {

			commentCurrentPage = data;

			$("#player-bottom #course-more-title span").eq(2).click();
			$("#course-ask-list .one-ask-" + commentId).eq(0).css(
				"background-color", "#eeeeee");
			$("#course-ask-list .one-ask-" + commentId + " .one-ask-tip").eq(0)
				.css("color", "red");

			// 滑动到评论位置

			if(commentReplyId > 0) {

				getCommentreplys(commentId);

				$("#course-ask-list .one-ask-tip-" + commentReplyId).eq(0)
					.css("color", "red");

				$("html,body").animate({
					scrollTop: $("#course-ask-list .one-ask-tip-" + commentReplyId).eq(0)
						.offset().top - 100
				}, 1000);
			} else {

				$("html,body").animate({
					scrollTop: $("#course-ask-list .one-ask-" + commentId).eq(0)
						.offset().top - 100
				}, 1000);
			}
		}
	});
}

// 初始化事件
function initEvent() {
	// 菜单切换
	$("#player-bottom #course-more-title span").click(function() {
		$("#player-bottom #course-more-title span").removeClass("active");
		$(this).addClass("active");
		switch($(this).index()) {
			case 0: // 介绍
				$("#player-bottom #course-more-pro").show();
				$("#player-bottom #course-more-list").hide();
				$("#player-bottom #course-ask-list").hide();
				break;
			case 1: // 目录

				getCatalogs();

				$("#player-bottom #course-more-pro").hide();
				$("#player-bottom #course-more-list").show();
				$("#player-bottom #course-ask-list").hide();
				break;
			case 2: // 讨论区
				getComments();

				$("#player-bottom #course-more-pro").hide();
				$("#player-bottom #course-more-list").hide();
				$("#player-bottom #course-ask-list").show();
				break;
		}
	});

	//跳转到购买页
	$(".to-yys-buy").click(function() {
		window.open('buy.html', '_blank');
	});

}

// 初始化分享事件
function initShare() {
	var title = $("#course-main #course-title").html();

	title = "鹰学堂-" + title;

	$("title").html(title);

	var url = location.href;
	var urls = url.split("?");
	url = urls[0] + "?share-course-" + id;

	var pic = $("#course-main #course-pic").val();

	var content = $("#course-main #desc").html();

	$("#socialShare").socialShare({
		title: title,
		titile: title,
		url: url,
		pic: pic,
		content: content
	});

	$(".msb_main").trigger('click');
}

// 获取当前课程信息
function getOneCourse() {
	if(value == null) {
		location.href = "yxt-index.html";
	}

	// 查看某条评论
	if(location.href.indexOf("comment=") != -1) {

		var cId = location.href.split("comment=")[1];
		if(cId.indexOf("&commentReply=") != -1) {
			var cIds = cId.split("&commentReply=");

			cId = cIds[0];

			if(cId.trim().length > 0 && !isNaN(cId)) {

				commentId = cId;
			}

			if(cIds[1].trim().length > 0 && !isNaN(cIds[1])) {

				commentReplyId = cIds[1];
			}

		} else {

			if(cId.trim().length > 0 && !isNaN(cId)) {

				commentId = cId;
			}
		}

	}

	if(value != null) {
		id = value;

		$.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/select/one",
			data: {
				id: id
			},
			async: false,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {
				if(responseData.code === 200) {
					currentCourse = responseData.data;

					$("#course-main #course-id").val(responseData.data.id);
					$("#course-main #course-pic").val(
						yysConfigs.yxtServiceUrl + responseData.data.homePic);
					$("#course-main #course-title").html(
						responseData.data.courseName);
					$("#course-main #author").html(
						responseData.data.publisherName);
					$("#course-main #time-detail").html(
						getFormatTime(responseData.data.duration));
					$("#course-main #desc").html(responseData.data.desc);
					$("#course-main #course-more-pro").html(
						htmlspecialcharsback(responseData.data.detail));

					$("#course-main #ali-player").show();
					$("#course-main #course-detail").show();
					$("#course-main #non-player").hide();

					initPlayer(responseData.data.videoId);
				} else if(responseData.code === 199 ||
					responseData.code === 201) {
					currentCourse = responseData.data;

					$("#course-main #course-id").val(responseData.data.id);
					$("#course-main #course-pic").val(
						yysConfigs.yxtServiceUrl + responseData.data.homePic);
					$("#course-main #course-title").html(
						responseData.data.courseName);
					$("#course-main #author").html(
						responseData.data.publisherName);
					$("#course-main #time-detail").html(
						getFormatTime(responseData.data.duration));
					$("#course-main #desc").html(responseData.data.desc);
					$("#course-main #course-more-pro").html(
						htmlspecialcharsback(responseData.data.detail));

					$("#course-main #ali-player").hide();
					$("#course-main #course-detail").show();
					
					
					var msg = '';
					if (responseData.code === 199) {
						msg = '<span id="yxt-to-login">请先登录</span>';
					} else if (responseData.code === 201){
						msg = '<span id="yxt-to-beVip">VIP会员才可以观看</span>';
					} else {
						msg = responseData.msg;
					}
					
					console.log(responseData.msg);
					$("#course-main #non-player p").html(msg);
					$("#course-main #non-player").show();
					
					$("#yxt-to-login").unbind("click");
					$("#yxt-to-login").bind("click",function(){
						$("#log-in").click();
					});
					
					$("#yxt-to-beVip").unbind("click");
					$("#yxt-to-beVip").bind("click",function(){
						window.open("buy.html", "_blank");
					});
				} else if(responseData.code === 300) {

					$("#course-main #ali-player").hide();
					$("#course-main #course-detail").hide();
					$("#course-main #course-more-left").html("");
					$("#course-main #non-player p").html(responseData.msg);
					$("#course-main #non-player").show();
				} else {
					$("#course-main #ali-player").hide();
					$("#course-main #course-detail").hide();
					$("#course-main #course-more-left").html("");
					$("#course-main #non-player p").html("课程信息获取失败");
					$("#course-main #non-player").show();
					console.log(responseData.msg);
				}
			}
		});
	}
}

// 添加问题
function addComment() {
	var content = courseEditor.html();

	if(content.trim().length == 0) {
		$("body").tipAlert({
			title: "内容不能为空。",
			noMsg: true
		});
		return;
	}

	content = htmlspecialchars(content);

	$.ajax({
		type: "post",
		url: yysConfigs.yxtServiceUrl + "/course/add/comment",
		data: {
			targetId: id,
			toUserId: currentCourse.publisher,
			type: 0,
			content: content
		},
		async: false,
		headers: {
			"LoginUserToken": yzzCookieToken.getLoginUserToken()
		},
		success: function(responseData) {
			if(responseData.code != 200) {
				console.log(responseData.msg);
				$("body").tipAlert({
					title: "发表问题失败，请重试。",
					noMsg: true
				});
			} else {

				commentCurrentPage = 1;

				getComments();

				courseEditor.html("");

				isGetUnreadMsgs = false;
				unreadMsgs = null;
				getUnreadMsgCount();

				$("body").tipAlert({
					title: "发表问题成功。",
					noMsg: true
				});
			}
		}
	});
}

// 添加回复
function addCommentreply($div) {

	var content = $div.find("textarea").val().trim();

	if(content.length == 0) {
		$("body").tipAlert({
			title: "内容不能为空。",
			noMsg: true
		});
		return;
	}
	if(content.length > 200) {
		$("body").tipAlert({
			title: "内容不能超过200个字符。",
			noMsg: true
		});
		return;
	}

	var commentId = $div.find("button").attr("commentId");
	var toUserId = $div.find("button").attr("toUserId");

	$.ajax({
		type: "post",
		url: yysConfigs.yxtServiceUrl + "/course/add/commentreply",
		data: {
			commentId: commentId,
			askUserId: toUserId,
			content: content
		},
		async: false,
		headers: {
			"LoginUserToken": yzzCookieToken.getLoginUserToken()
		},
		success: function(responseData) {
			if(responseData.code != 200) {
				console.log(responseData.msg);
				$("body").tipAlert({
					title: "回复失败，请重试。",
					noMsg: true
				});
			} else {

				$div.find("textarea").val("");

				$("body").tipAlert({
					title: "回复成功。",
					noMsg: true
				});
				getCommentreplys(commentId);

				isGetUnreadMsgs = false;
				unreadMsgs = null;
				getUnreadMsgCount();
			}
		}
	});
}

// 获取目录信息
function getCatalogs() {
	$
		.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/select/list",
			data: {
				sortType: 0,
				columnId: currentCourse.columnId,
				currentPage: catalogCurrentPage,
				pageSize: 15
			},
			async: true,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {
				var html = '';
				$("#course-more-list .page-box").hide();
				if(responseData.code != 200) {
					console.log(responseData.msg);
					html = '<div style="text-align: center;">获取目录失败，请重试</div>';
				} else {

					if(responseData.data == null) {
						html = '<div style="text-align: center;">暂无信息</div>';
					} else {

						var list = responseData.data.list;

						var playIcon = '';

						for(var i in list) {

							if(list[i].id == id) { // 正在播放
								playIcon = '<i class="icon iconfont icon-weizhi play-status"></i>';
							} else if(list[i].playstatus != null &&
								list[i].playstatus.status != null) {

								if(list[i].playstatus.status == 1) { // 已看完
									playIcon = '<i class="icon iconfont icon-zhengque play-status"></i>';
								} else { // 未看完
									playIcon = '<i class="icon iconfont icon-zhengque play-status"></i>';
								}

							} else { // 未看
								playIcon = '<i class="icon iconfont icon-bofang play-status"></i>';
							}

							html += '<a href="' + getRootPath() + '/yxt-index.html?action=course&value=' +
								list[i].id +
								'"> <div class="course-one" title="查看《' +
								list[i].courseName +
								'》"> <div class="course-one-title">' +
								playIcon +
								list[i].courseName +
								'</div> <div class="course-one-time"> <i class="icon iconfont icon-shijian"></i> <span id="time-detail">' +
								getFormatTime(list[i].duration) +
								'</span> </div> </div> </a>';
						}

						var page = responseData.data.page;
						var totalPage = page.totalPage; // 总页数
						if(totalPage > 1) {

							$("#course-more-list .page-box").jqPaginator({
								totalPages: page.totalPage,
								visiblePages: 5,
								currentPage: page.currentPage,
								pagesize: page.pageSize,
								first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
								prev: '<li class="prev"><a href="javascript:void(0);"><</a></li>',
								next: '<li class="next"><a href="javascript:void(0);">></a></li>',
								last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
								page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
								onPageChange: function(num, type) {
									if(type == 'change') {
										catalogCurrentPage = num;
										this.currentPage = catalogCurrentPage;

										getCatalogs();
									}
								}
							});

							$("#course-more-list .page-box").show();
						}
					}
				}

				$("#course-more-list #data-list").html(html);
			}
		});
}

// 获取评论信息
function getComments() {
	$
		.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/select/comments",
			data: {
				id: id,
				currentPage: commentCurrentPage,
				pageSize: commentPageSize
			},
			async: false,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {
				var html = '';
				$("#course-ask-list .page-box").hide();
				if(responseData.code != 200) {
					console.log(responseData.msg);
					html = '<div style="text-align: center;">获取评论失败，请重试</div>';
				} else {

					if(responseData.data == null) {
						html = '<div style="text-align: center;margin: 20px auto;">暂无评论</div>';
					} else {

						var list = responseData.data.list;

						for(var i in list) {
							var askUserName = list[i].askUserName;
							if(askUserName == null) {
								askUserName = "未知";
							}

							var askUserHead = null;
							var headImg = list[i].askUserHead;

							if(headImg == null ||
								headImg.trim().length == 0) {
								askUserHead = "https://www.yingyanso.cn/img/user-logo.jpg";
							} else {
								if(!headImg.toLowerCase().startsWith(
										"http://") &&
									!headImg.toLowerCase()
									.startsWith("https://")) {
									askUserHead = yysConfigs.ywxServiceUrl + "/" +
										headImg;
								} else {
									askUserHead = headImg;
								}
							}

							var more = '';

							html += '<div class="one-ask one-ask-' +
								list[i].id +
								'"><div class="one-ask-left"> <div class="one-ask-head"> <img class="head-img" src="' +
								askUserHead +
								'" /> <div title="' +
								askUserName +
								'">' +
								askUserName +
								'</div> </div> </div><div class="one-ask-right"><div class="one-ask-top"> <div class="one-ask-tip">学员提问：</div> <div class="one-ask-content">' +
								htmlspecialcharsback(list[i].content) +
								'</div>' +
								'<div class="one-ask-content-other"><span>' +
								list[i].createTime +
								'</span><span class="reply" onclick="replyComment(' +
								list[i].id +
								',' +
								list[i].askUserId +
								',\'' +
								askUserName +
								'\')">回复</span></div> <div class="one-ask-content-reply"> <textarea maxlength="200" rows="5" placeholder="回复TA的提问"></textarea> <button class="reply-button">回复</button> </div></div><div class="one-ask-bottom">';

							if(list[i].replyCount > 0) {

								var answerUserName = list[i].commentreplys[0].answerUserName;

								if(answerUserName == null) {
									answerUserName = "未知";
								}

								var askUserName2 = list[i].commentreplys[0].askUserName;

								if(askUserName2 == null) {
									askUserName2 = "未知";
								}

								more = '<div class="one-ask-tip one-ask-tip-' +
									list[i].commentreplys[0].id +
									'"> <span>' +
									answerUserName +
									'</span>回复@' +
									askUserName2 +
									'： </div> <div class="one-ask-content">' +
									list[i].commentreplys[0].content +
									'</div>';

								more += '<div class="one-ask-content-other"><span>' +
									list[i].commentreplys[0].createTime +
									'</span><span class="reply" onclick="replyComment(' +
									list[i].commentreplys[0].commentId +
									',' +
									list[i].commentreplys[0].answerUserId +
									',\'' +
									answerUserName +
									'\')">回复</span></div>';

								if(list[i].replyCount > 1) {

									more += '<div class="one-ask-more"> <div> 还有<span>' +
										(list[i].replyCount - 1) +
										'</span>条回复，点击查看完整 </div> <div> <i class="icon iconfont icon-xiala" onclick="getCommentreplys(' +
										list[i].id +
										')"></i> </div></div>';
								}
							}

							html += more + '</div></div></div>';
						}

						var page = responseData.data.page;
						var totalPage = page.totalPage; // 总页数
						if(totalPage > 1) {

							$("#course-ask-list .page-box").jqPaginator({
								totalPages: page.totalPage,
								visiblePages: 5,
								currentPage: page.currentPage,
								pagesize: page.pageSize,
								first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
								prev: '<li class="prev"><a href="javascript:void(0);"><</a></li>',
								next: '<li class="next"><a href="javascript:void(0);">></a></li>',
								last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
								page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
								onPageChange: function(num, type) {
									if(type == 'change') {
										commentCurrentPage = num;
										this.currentPage = commentCurrentPage;

										getComments();
									}
								}
							});

							$("#course-ask-list .page-box").show();
						}
					}
				}

				$("#course-ask-list #data-list").html(html);

				// 回复
				$(".reply-button").unbind("click");
				$(".reply-button").bind("click", function() {

					addCommentreply($(this).parent());

				});
			}
		});
}

// 获取评论回复信息
function getCommentreplys(commentId) {
	$
		.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/select/commentreplys",
			data: {
				id: commentId
			},
			async: false,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {
				var html = '';

				if(responseData.code != 200) {
					console.log(responseData.msg);
					$("body").tipAlert({
						title: "获取回复列表信息失败，请重试。",
						noMsg: true
					});
				} else {

					if(responseData.data != null) {
						var list = responseData.data.list;

						for(var i in list) {
							var answerUserName = list[i].answerUserName;

							if(answerUserName == null) {
								answerUserName = "未知";
							}
							var askUserName = list[i].askUserName;

							if(askUserName == null) {
								askUserName = "未知";
							}

							html += '<div class="one-ask-tip one-ask-tip-' +
								list[i].id +
								'"> <span>' +
								answerUserName +
								'</span>回复@' +
								askUserName +
								'： </div> <div class="one-ask-content">' +
								list[i].content + '</div>';

							html += '<div class="one-ask-content-other"><span>' +
								list[i].createTime +
								'</span><span class="reply" onclick="replyComment(' +
								commentId +
								',' +
								list[i].answerUserId +
								',\'' +
								answerUserName +
								'\')">回复</span></div>';
						}
					}

					$(".one-ask-" + commentId + " .one-ask-bottom").html(
						html);
				}
			}
		});
}

// 显示回复框
function replyComment(commentId, toUserId, toUserName) {

	if(yzzCookieToken.getUserInfo() == null) {
		$("body").tipAlert({
			title: "未登录，请先登录。",
			noMsg: true
		});
		return;
	}

	$(".one-ask-content-reply").hide();

	var $div = $(".one-ask-" + commentId + " .one-ask-content-reply");

	$div.find("textarea").val("");
	$div.find("textarea").attr("placeholder", "回复" + toUserName);

	$div.find("button").attr("commentId", commentId);
	$div.find("button").attr("toUserId", toUserId);

	$div.show();

}

// 获取热门推荐视频信息
function getHots() {
	$
		.ajax({
			type: "post",
			url: yysConfigs.yxtServiceUrl + "/course/select/list",
			data: {
				sortType: 2,
				currentPage: 1,
				pageSize: 3
			},
			async: true,
			headers: {
				"LoginUserToken": yzzCookieToken.getLoginUserToken()
			},
			success: function(responseData) {
				var html = '';
				if(responseData.code != 200) {
					console.log(responseData.msg);

					$("#course-more-hot-tip").html("暂无推荐");
				} else {

					if(responseData.data == null) {
						$("#course-more-hot-tip").html("暂无推荐");
					} else {

						var list = responseData.data.list;

						for(var i in list) {

							html += '<div class="course-hot"> <a href="' + getRootPath() + '/yxt-index.html?action=course&value=' +
								list[i].id +
								'"> <div class="img-div"><img src="' +
								yysConfigs.yxtServiceUrl +
								list[i].homePic +
								'" title="查看《' +
								list[i].courseName +
								'》" /></div> </a> <div class="title">' +
								list[i].courseName + '</div> </div>';
						}

					}
				}

				$("#course-more-right .course-hot-list").html(html);
			}
		});
}

// 初始化播放器
function initPlayer(videoId) {

	$.ajax({
		url: yysConfigs.yxtServiceUrl + "/aliyun/playAuth",
		type: "POST",
		headers: {
			"LoginUserToken": yzzCookieToken.getLoginUserToken()
		},
		data: {
			"videoId": videoId
		},
		async: false,
		success: function(responseData) {

			if(typeof responseData == "string") {
				responseData = JSON.parse(responseData);
			}

			if(responseData.success) {
				var playauth = responseData.data.playAuth;
				var vid = responseData.data.videoMeta.videoId;
				var coverURL = yysConfigs.yxtServiceUrl + currentCourse.homePic;

				player = new Aliplayer({
					id: "ali-player",
					width: "532.5px",
					autoplay: false,
					// preload: true,
					vid: vid,
					playauth: playauth,
					cover: coverURL
				}, function(player) {
					console.log('播放器创建好了。');
				});

				setPlayCss();

				var playstatus = currentCourse.playstatus;

				if(playstatus != null && playstatus.status != null) {
					seekPlayTime = playstatus.playTime;
					if(seekPlayTime > 0 &&
						seekPlayTime < currentCourse.duration) {
						$("#seek-player #seek-time").html(
							getFormatTime(seekPlayTime));
						// 跳转播放
						$("#seek-player #to-seek-time").click(function() {
							player.play();
							seekPlay();
							$("#seek-player").hide();
						});
						// 关闭
						$("#seek-player .icon-close").click(function() {
							$("#seek-player").hide();
						});

						$("#seek-player").show();
					} else {
						$("#seek-player").hide();
					}
				} else {
					$("#seek-player").hide();
				}

				// 监听全屏事件
				player.on("requestFullScreen", setPlayCss);
				// 监听全屏取消事件
				player.on("cancelFullScreen", setPlayCss);
				// 监听视频播放完毕事件
				player.on("ended", endedPlayer);
				// 播放位置发生改变时触发，仅H5播放器
				player.on("timeupdate", savePlayTime);
				// 播放监听
				player.on("play", function() {
					$("#seek-player").hide();
				});

			} else {
				$("#course-main #ali-player").hide();
				$("#course-main #course-detail").hide();
				$("#course-main #course-more-left").html("");
				$("#course-main #non-player p").html("播放器创建失败");
				$("#course-main #non-player").show();
				console.log(responseData.msg);
			}

		}
	});
}

// 从历史播放时间开始播放
function seekPlay() {
	if(seekPlayTime > 0) {
		player.seek(seekPlayTime);
	}
}

// 设置播放器播放图标位置
function setPlayCss() {
	var $player = $("#main-player video");

	$(".prism-player .prism-big-play-btn").css({
		"left": (($player.width() - 63) / 2) + "px",
		"top": (($player.height() - 63) / 2) + "px"
	});

};

// 保存播放时间
function savePlayTime() {

	playTime = player.getCurrentTime().toFixed(2);

	if(!isSubmitPlayTime && !isEnd) {
		// 每1秒才执行一次
		setTimeout(function() {

			isSubmitPlayTime = true;

			updatePlayStatus(id, playTime, -1, true);

		}, 1000);
	}
}

// 更新播放状态
function updatePlayStatus(courseId, playTime, status, change) {
	$.ajax({
		type: "post",
		url: yysConfigs.yxtServiceUrl + "/course/update/playStatus",
		data: {
			courseId: id,
			playTime: playTime,
			status: status
		},
		async: true,
		complete: function() {
			if(change) {

				isSubmitPlayTime = false;
			}
		},
		headers: {
			"LoginUserToken": yzzCookieToken.getLoginUserToken()
		},
		success: function(data) {
			if(data == -1) {
				console.log("更新视频播放状态失败");
			}
		}
	});
}

// 播放结束
function endedPlayer() {
	isEnd = true;

	updatePlayStatus(id, currentCourse.duration, 1, true);
}

// 初始化富文本编辑器
function initEditor() {

	var user = yzzCookieToken.getUserInfo();
	var userId = 0;

	if(user != null) {
		user = JSON.parse(user);
		userId = user.data.userId;
	}

	var params = {
		textareaName: "course-editor-content",
		requestUrl: yysConfigs.yxtServiceUrl,
		userId: userId,
		allowImageUpload: true, // 运行上传图片
		allowFileManager: true, // 可管理文件
		width: "92%",
		height: "200",
		callBackUrl: null,
		items: ['preview', 'source', '|', 'undo', 'redo', '|', 'formatblock',
			'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor',
			'bold', 'italic', 'underline', 'strikethrough', 'lineheight',
			'removeformat', '|', 'plainpaste', 'wordpaste', '|',
			'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
			'insertorderedlist', 'insertunorderedlist', 'indent',
			'outdent', 'clearhtml', 'quickformat', 'selectall', '|',
			'image', 'table', 'hr', 'emoticons', 'link', 'unlink',
			'fullscreen'
		]
	};

	courseEditor = initKindEditor(params);

	if(userId == 0) {
		$("#ask-editor").hide();
		// courseEditor.readonly(true);
	}

}

// 累计分享次数
function addShareCount() {
	$.ajax({
		type: "post",
		url: yysConfigs.yxtServiceUrl + "/course/count/share",
		data: {
			id: id
		},
		async: false,
		headers: {
			"LoginUserToken": yzzCookieToken.getLoginUserToken()
		},
		success: function(responseData) {
			if(responseData.code != 200) {
				console.log(responseData.msg);
			}
		}
	});
}