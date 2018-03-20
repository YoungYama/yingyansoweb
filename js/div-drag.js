// 模块拖拽
$(function() {
	var _move = false; //移动标记
	var _x, _y; //鼠标离控件左上角的相对位置
	var $parent;

	$(".can-drag").click(function(e) {
		e.stopPropagation();

	}).mousedown(function(e) {
		_move = true;

		var clazz = $(this).attr("class");

		if(clazz.indexOf("loading-info-drag") != -1) {
			$parent = $(".loading-layer");
		} else if(clazz.indexOf("view-info-drag") != -1) {
			$parent = $(".client-info");
		} else if(clazz.indexOf("sure-buy-drag") != -1) {
			$parent = $(".sure-product-pay-info-layer");
		}

		_x = e.pageX - parseInt($parent.find(".div-drag").css("left"));
		_y = e.pageY - parseInt($parent.find(".div-drag").css("top"));

		$parent.find(".div-drag").fadeTo(20, 0.5); //点击后开始拖动并透明显示

	});

	$(".can-drag").mousemove(function(e) {
		if(_move) {
			var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置
			var y = e.pageY - _y;

			$parent.find(".div-drag").css({
				top: y,
				left: x
			}); //控件新位置
		}
	}).mouseup(function() {
		_move = false;
		if($parent != undefined) {
			$parent.find(".div-drag").fadeTo("fast", 1); //松开鼠标后停止移动并恢复成不透明
		}
	});

});