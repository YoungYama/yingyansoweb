var id = 0;

$(function() {
	$("#search-input").attr("placeholder","搜索资讯");
	$("#search-input").attr("srcType","1");
	
	getOneArticle();

	initShare();
});

function initShare() {
	var title = $("#article-main #article-title span").html();

	title = "鹰学堂-" + title;

	$("title").html(title);

	var url = location.href;
	var urls = url.split("?");
	url = urls[0] + "?share-article-" + id;

	var pic = $("#article-main #article-pic").val();
	
	var content = $("#article-main #article-desc").val();
	
	$("#socialShare").socialShare({
		title : title,
		titile : title,
		url : url,
		pic : pic,
		content : content
	});

	$(".msb_main").trigger('click');
}

function addShareCount() {
	$.ajax({
		type : "post",
		url : yysConfigs.yxtServiceUrl + "/article/count/share",
		data : {
			id : id
		},
		async : false,
		headers : {
			"LoginUserToken" : yzzCookieToken.getLoginUserToken()
		},
		success : function(responseData) {
			if (responseData.code != 200) {
				console.log(responseData.msg);
			}
		}
	});
}

function getOneArticle() {

	if (value == null) {
		location.href = "yxt-index.html";
	}

	if (value != null) {
		id = value;
		$.ajax({
			type : "post",
			url : yysConfigs.yxtServiceUrl + "/article/select/one",
			data : {
				id : id
			},
			async : false,
			headers : {
				"LoginUserToken" : yzzCookieToken.getLoginUserToken()
			},
			success : function(responseData) {
				if (responseData.code === 200) {
					$("#article-main #article-id").val(responseData.data.id);
					$("#article-main #article-pic").val(
							yysConfigs.yxtServiceUrl + responseData.data.homePic);
					$("#article-main #article-title span").html(
							responseData.data.articleName);
					$("#article-main #article-content").html(
							htmlspecialcharsback(responseData.data.content));
				} else if (responseData.code === 300) {
					// alert(responseData.msg);
					$("#socialShare").hide();

					$("#article-main #article-title span").html("没有找到您要查看的文章");
					$("#article-main #article-content").html(responseData.msg);
				} else {
					$("#article-main #article-title span").html("没有找到您要查看的文章");
					$("#article-main #article-content").html(responseData.msg);
					console.log(responseData.msg);
				}
			}
		});

	} else {
		location.href = "yxt-index.html";
	}
}