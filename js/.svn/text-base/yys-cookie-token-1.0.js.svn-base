/**
 * token操作，cookie的path全部都是/
 */

var yzzCookieToken = {
	keys: {
		//不要随意修改这些key，是与后台代码对应的
		CLIENT_BROWSER_ID: "NEW_CLIENT_BROWSER_ID", //未登录用户标识
		LOGIN_USER_TOKEN: "LOGIN_USER_TOKEN", //已登录用户标识
		PREV_SEARCH_TIME: "PREV_SEARCH_TIME", //上一次搜索时间标识
		PREV_EXTRACT_TIME: "PREV_EXTRACT_TIME", //上一次提取信息标识
		SEARCH_CONDITIONS: "SEARCH_CONDITIONS", //搜索条件
		PAGE_HOLDER: "PAGE_HOLDER", //缓存数据
		BIND_QRCODE_TICKET: "BIND_QRCODE_TICKET", //获取绑定微信临时二维码
		USER_INFO: "USER_INFO" //登录用户信息
	},
	values: {
		oneYear: 365 * 24 * 60 * 60, // 一年，单位秒
		oneWeek: 7 * 24 * 60 * 60, // 一周，单位秒
		oneDay: 24 * 60 * 60, // 一天，单位秒
		thirtyMinute: 30 * 60 //三十分钟，单位秒
	},
	// 浏览器是否启用了Cookie
	cookieEnabled: function(name, value) {
		return navigator.cookieEnabled;
	},
	// 无过期时间：（若不设置过期时间，默认为会话级Cookie，浏览器关闭就会失效）
	setCookie: function(name, value) {
		document.cookie = name + '=' + escape(value) + ";path=/";
	},
	// 写cookies，过期时间单位秒
	setCookie: function(name, value, seconds) {
		var exp = new Date();
		exp.setTime(exp.getTime() + seconds * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" +
			exp.toGMTString() + ";path=/";
	},
	// 读取Cookie
	getCookie: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); // 正则匹配
		if(arr = document.cookie.match(reg)) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	},
	// 删除Cookie
	deleteCookie: function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if(cval != null) {
			document.cookie = name + "=" + cval + ";expires=" +
				exp.toGMTString() + ";path=/";
		}
	},
	//清空所有cookie
	clearCookies: function() {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if(keys) {
			for(var i = keys.length; i--;) {
				document.cookie = keys[i] + '=null;expires=' + new Date(0).toUTCString() + ";path=/";
			}
		}
	},
	//设置未登录用户的标识id
	setClientBrowserId: function(token) {
		if(this.getClientBrowserId() == null) {
			this.setCookie(this.keys.CLIENT_BROWSER_ID, token, this.values.oneYear);
		}
	},
	//获取未登录用户的标识id
	getClientBrowserId: function() {
		return this.getCookie(this.keys.CLIENT_BROWSER_ID);
	},
	//设置已登录用户的标识id
	setLoginUserToken: function(token) {
		this.setCookie(this.keys.LOGIN_USER_TOKEN, token, this.values.oneWeek);
	},
	//获取已登录用户的标识id
	getLoginUserToken: function() {
		return this.getCookie(this.keys.LOGIN_USER_TOKEN);
	},
	//删除已登录用户的标识id
	deleteLoginUserToken: function() {
		this.deleteCookie(this.keys.LOGIN_USER_TOKEN);
		//this.deleteCookie("LOGIN_USER_TOKEN");
	},
	//设置上一次搜索时间标识
	setPrevSearchTime: function(token) {
		this.setCookie(this.keys.PREV_SEARCH_TIME, token, this.values.oneDay);
	},
	//获取上一次搜索时间标识
	getPrevSearchTime: function() {
		return this.getCookie(this.keys.PREV_SEARCH_TIME);
	},
	//设置上一次提取信息标识
	setPrevExtractTime: function(token) {
		this.setCookie(this.keys.PREV_EXTRACT_TIME, token, this.values.oneDay);
	},
	//获取上一次提取信息标识
	getPrevExtractTime: function() {
		return this.getCookie(this.keys.PREV_EXTRACT_TIME);
	},
	//设置搜索条件
	setSearchConditions: function(value) {
		this.setCookie(this.keys.SEARCH_CONDITIONS, value, this.values.oneDay);
	},
	//获取搜索条件
	getSearchConditions: function() {
		return this.getCookie(this.keys.SEARCH_CONDITIONS);
	},
	//PAGE_HOLDER数据量太大
	//设置数据缓存对象
	setPageHolder: function(value) {

		if(window.sessionStorage != undefined) {
			try {
				window.sessionStorage.setItem(this.keys.PAGE_HOLDER, value);
			} catch(Exception) {
				if(Exception.name == 'QuotaExceededError') {
					//超出存储额度则清空
					window.sessionStorage.clear();
				}
			}
		}
	},
	//获取数据缓存对象
	getPageHolder: function() {

		if(window.sessionStorage != undefined) {

			return window.sessionStorage.getItem(this.keys.PAGE_HOLDER);
		} else {
			return null;
		}

	},
	//删除数据缓存对象
	removePageHolder: function() {

		if(window.sessionStorage != undefined) {
			window.sessionStorage.removeItem(this.keys.PAGE_HOLDER);
		}

	},
	clearSessionStorage: function() {
		if(window.sessionStorage != undefined) {

			window.sessionStorage.clear();
		}
	},
	//设置绑定微信临时二维码
	setBindQrCodeTicket: function(value) {
		this.setCookie(this.keys.BIND_QRCODE_TICKET, value, this.values.oneDay - 120);
	},
	//获取绑定微信临时二维码
	getBindQrCodeTicket: function() {
		return this.getCookie(this.keys.BIND_QRCODE_TICKET);
	},
	//删除绑定微信临时二维码
	deleteBindQrCodeTicket: function() {
		return this.deleteCookie(this.keys.BIND_QRCODE_TICKET);
	},
	//设置登录用户信息
	setUserInfo: function(value) {
		this.setCookie(this.keys.USER_INFO, value);
	},
	//获取登录用户信息
	getUserInfo: function() {
		return this.getCookie(this.keys.USER_INFO);
	},
	//删除登录用户信息
	deleteUserInfo: function() {
		return this.deleteCookie(this.keys.USER_INFO);
	}
};

if(!yzzCookieToken.cookieEnabled()) {
	alert("该浏览器不支持cookie操作，请更换浏览器，否则将不能正常使用鹰眼搜");
}