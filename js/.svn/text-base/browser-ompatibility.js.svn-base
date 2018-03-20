//浏览器JavaScript接口兼容

/**
 * 扩展startsWith方法 
 */
String.prototype.startsWith = function(str) {
	if(str == null || str == "" || this.length == 0 || str.length > this.length) {
		return false;
	}

	if(this.substr(0, str.length) == str) {
		return true;
	}

	return false;
};
/** 
 * 扩展trim方法 
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

/** 
 *  
 */
//扩展Date的format方法     
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	}
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
/**    
 *转换日期对象为日期字符串    
 * @param date 日期对象    
 * @param isFull 是否为完整的日期数据,    
 *               为true时, 格式如"2000-03-05 01:05:04"    
 *               为false时, 格式如 "2000-03-05"    
 * @return 符合要求的日期字符串    
 */
function getSmpFormatDate(date, isFull) {
	var pattern = "";
	if(isFull == true || isFull == undefined) {
		pattern = "yyyy-MM-dd hh:mm:ss";
	} else {
		pattern = "yyyy-MM-dd";
	}
	return getFormatDate(date, pattern);
}
/**    
 *转换当前日期对象为日期字符串    
 * @param date 日期对象    
 * @param isFull 是否为完整的日期数据,    
 *               为true时, 格式如"2000-03-05 01:05:04"    
 *               为false时, 格式如 "2000-03-05"    
 * @return 符合要求的日期字符串    
 */

function getSmpFormatNowDate(isFull) {
	return getSmpFormatDate(new Date(), isFull);
}
/**    
 *转换long值为日期字符串    
 * @param l long值    
 * @param isFull 是否为完整的日期数据,    
 *               为true时, 格式如"2000-03-05 01:05:04"    
 *               为false时, 格式如 "2000-03-05"    
 * @return 符合要求的日期字符串    
 */

function getSmpFormatDateByLong(l, isFull) {
	return getSmpFormatDate(new Date(l), isFull);
}
/**    
 *转换long值为日期字符串    
 * @param l long值    
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss    
 * @return 符合要求的日期字符串    
 */

function getFormatDateByLong(l, pattern) {
	return getFormatDate(new Date(l), pattern);
}
/**    
 *转换日期对象为日期字符串    
 * @param l long值    
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss    
 * @return 符合要求的日期字符串    
 */
function getFormatDate(date, pattern) {
	if(date == undefined) {
		date = new Date();
	}
	if(pattern == undefined) {
		pattern = "yyyy-MM-dd hh:mm:ss";
	}
	return date.format(pattern);
}

//浏览器版本
if(isLowerBrowsers()) {
	if(location.href.indexOf("browser.html") == -1) {
		location.href = "browser.html";
	}
} else {
	if(location.href.indexOf("browser.html") != -1) {
		location.href = "index.html";
	}
}

function isLowerBrowsers(){
	var result = false;
	var appName = navigator.appName;
	var appVersion = navigator.appVersion;
	
	if (appName == "Microsoft Internet Explorer" && parseInt(appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {
		result = true;
	}
	
	return result;
}
