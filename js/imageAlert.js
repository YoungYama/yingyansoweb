$.fn.imageAlert = function(options) {
	var defaults = {
		thisClick: false,
		imgSize: 480,
		closeSize: 34,
		backgroundImageUrl: "img/unlock.png",
		openUrl: "buy.html",
		show: function() {

		},
		hide: function(e) {

		}
	};
	//将一个空对象做为第一个参数  
	var settings = $.extend({}, defaults, options);

	// 在每个调用该插件的元素中执行以下代码  
	return $(this).each(function() {
		if($("#image-alert-body").html() == undefined) {
			$("body").append('<div id="image-alert-body"></div>');
		}

		$("#image-alert-body").html('<div class="my-image-mask" id="my-image-mask" style="display: none;"></div> <i class = "icon iconfont icon-cuowu" > </i> <img id = "my-image-body" > ');

		if(settings.thisClick) {
			$(this).click(function() {
				$("#my-image-mask").show();
				$("#my-image-body").show();
				$("#image-alert-body .icon-cuowu").show();
				settings.show();
			});
		}

		var width = settings.imgSize;
		var height = settings.imgSize;

		var maskWidth = $("#my-image-mask").width();
		var maskHeight = $("#my-image-mask").height();

		var left = 0;
		var top = 0;

		if(settings.imgSize < maskWidth) {
			left = (maskWidth - settings.imgSize) / 2 - 40;
		}

		if(settings.imgSize < maskHeight) {
			top = (maskHeight - settings.imgSize) / 2;
		}

		$("#my-image-body").css({
			"left": left + "px",
			"top": top + "px",
			"width": settings.imgSize + "px",
			"height": settings.imgSize + "px"
		});

		$("#image-alert-body .icon-cuowu").css({
			"left": left + width - 10 + "px",
			"top": top + "px"
		});

		if(settings.backgroundImageUrl != null && settings.backgroundImageUrl.trim().length > 0) {
			$("#my-image-body").attr("src", settings.backgroundImageUrl);
		}

		$("#image-alert-body .icon-cuowu").unbind("click");
		$("#image-alert-body .icon-cuowu").bind("click", function(e) {
			e.stopPropagation(); //终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播
			$("#my-image-mask").hide();
			$("#my-image-body").hide();
			$("#image-alert-body .icon-cuowu").hide();
			settings.hide(e);
		});

		if(settings.openUrl != null && settings.openUrl.trim().length > 0) {
			$("#my-image-body").unbind("click");
			$("#my-image-body").bind("click",
				function() {
					window.open(settings.openUrl.trim());
				});
		}

		$("#my-image-mask").show();
		$("#my-image-body").show();
		$("#image-alert-body .icon-cuowu").show();
	});
}