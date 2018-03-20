$.fn.tipAlert = function(options) {
	var defaults = {
		thisClick: false,
		iconClass: "icon-gantanhao",
		imgUrl: "img/no-msg.gif",
		imgHeight: 120,
		title: "服务器异常，请联系客服",
		noMsg: false,
		msg: "注意：关健词由英文（支持各国语种）字母（a-z，不区分大小写）、数字（0-9）、中文汉字等构成，词组之间只能以空格区别，不支持特殊字符（如！、$、&、?等）。支持 site: + - \"\"<span>（英文状态下）</span>四种基本搜索语法。",
		closeSize: 16,
		cancelTipUrl: "img/close.png",
		show: function() {

		},
		hide: function(e) {

		},
		sure: function(e) {

		}
	};
	//将一个空对象做为第一个参数  
	var settings = $.extend({}, defaults, options);

	// 在每个调用该插件的元素中执行以下代码  
	return $(this).each(function() {
		if($("#tip-alert-body").html() == undefined) {
			$("body").append('<div id="tip-alert-body"></div>');
		}

		$("#tip-alert-body").html('<div class="my-tip-mask" id="my-tip-mask"></div><div class="my-tip-content tip-div-drag" id="my-tip-content"><div id="tip-content-top" class="tip-can-drag tip-msg-drag"> <span id="tip-header">提示</span> <img id="tip-alert-body-close" src="' + settings.cancelTipUrl.trim() + '" width="' + settings.closeSize + 'px;"> </div> <div id="tip-content"> <div id="tip-content-left"><i class="icon iconfont ' + settings.iconClass + '"></i></div> <div id="tip-content-right"> <div id="tip-content-title">' + settings.title + '</div> <div id="tip-content-msg">' + settings.msg + '</div> </div> </div> <div id="tip-content-bottom"> <button id="tip-content-button">确定</button> </div></div>');

		if(settings.noMsg) {

			$("#tip-content-msg").html('<img src="' + settings.imgUrl.trim() + '" height="' + settings.imgHeight + 'px">');
		}

		var width = $("#my-tip-content").width();
		var height = $("#my-tip-content").height();

		var maskWidth = $("#my-tip-mask").width();
		var maskHeight = $("#my-tip-mask").height();

		var left = 0;
		var top = 0;

		if(width < maskWidth) {
			left = (maskWidth - width) / 2 - 23;
		}

		if(height < maskHeight) {
			top = (maskHeight - height) / 2 - 20;
		}

		$("#my-tip-content").css({
			"left": left + "px",
			"top": top + "px"
		});

		if(settings.thisClick) {
			$(this).click(function() {
				$("#my-tip-mask").show();
				$("#my-tip-content").show();
				settings.show();
			});
		}

		$("#tip-alert-body-close").click(function(e) {
			e.stopPropagation(); //终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播
			$("#my-tip-mask").hide();
			$("#my-tip-content").hide();
			settings.hide(e);
		});

		$("#tip-content-button").click(function(e) {
			e.stopPropagation(); //终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播
			$("#my-tip-mask").hide();
			$("#my-tip-content").hide();
			settings.sure(e);
		});

		var _move = false; //移动标记
		var _x, _y; //鼠标离控件左上角的相对位置
		var $parent;
		$("#tip-alert-body .tip-can-drag").unbind("click");
		$("#tip-alert-body .tip-can-drag").bind("click", function(e) {
			e.stopPropagation();

		}).mousedown(function(e) {
			_move = true;

			$parent = $("#tip-alert-body");

			_x = e.pageX - parseInt($parent.find(".tip-div-drag").css("left"));
			_y = e.pageY - parseInt($parent.find(".tip-div-drag").css("top"));

			$parent.find(".tip-div-drag").fadeTo(20, 0.5); //点击后开始拖动并透明显示

		});
		$("#tip-alert-body .tip-can-drag").mousemove(function(e) {
			if(_move) {
				var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置
				var y = e.pageY - _y;

				$parent.find(".tip-div-drag").css({
					top: y,
					left: x
				}); //控件新位置
			}
		}).mouseup(function() {
			_move = false;

			if($parent != undefined) {
				$parent.find(".tip-div-drag").fadeTo("fast", 1); //松开鼠标后停止移动并恢复成不透明
			}

		});

		$("#my-tip-mask").show();
		$("#my-tip-content").show();
		$("#tip-alert-body").fadeIn();
	});
}