/** 获取页面URL中包括工程项目的前部分 */
function getRootPath() {
	var pathName = window.document.location.pathname;
	var projectName = "";

	if(pathName.indexOf("yingyansoweb") != -1 || pathName.indexOf("EspeedAuthCentre") != -1) {
		projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	}

	var rootPath = window.location.protocol + "//" + window.location.host +
		projectName;

	return rootPath;
}
/** 定义全部替换方法 */
String.prototype.replaceAll = function(oldString, newString) {
	return this.replace(new RegExp(oldString, "gm"), newString);
}
/** 替换HTML代码的特殊符号 */
function htmlspecialchars(str) {
	str = str.replaceAll("&", "&amp;");
	str = str.replaceAll("<", "&lt;");
	str = str.replaceAll(">", "&gt;");
	str = str.replaceAll("\"", "&quot;");
	return str;
}

function htmlspecialcharsback(str) {
	str = str.replaceAll("&amp;", "&");
	str = str.replaceAll("&lt;", "<");
	str = str.replaceAll("&gt;", ">");
	str = str.replaceAll("&quot;", "\"");
	return str;
}

//无过期时间：（若不设置过期时间，默认为会话级Cookie，浏览器关闭就会失效）
function setCookie(name, value) {
	document.cookie = name + '=' + escape(value) + ";path=/";
}
// 读取Cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); // 正则匹配
	if(arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}
// 删除Cookie
function deleteCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = this.getCookie(name);
	if(cval != null) {
		document.cookie = name + "=" + cval + ";expires=" +
			exp.toGMTString() + ";path=/";
	}
}