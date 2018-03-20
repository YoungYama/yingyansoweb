var yysConfigs = {
	"yysCentreUrl": "http://115.29.230.132:86", //鹰眼搜搜索系统请求入口
	"yysWebUrl": "https://www.yingyanso.cn", //鹰眼搜前端请求入口
	"yysServiceUrl": "http://115.29.230.132:872", //鹰眼搜会员系统请求入口
	"ywxServiceUrl": "http://webmail120117.21gmail.com:8182", //易外销系统请求入口
	"yxtServiceUrl": "http://115.29.230.132:873", //鹰学堂系统请求入口
	"searchWordMaxLength": "55", //鹰眼搜搜索系统搜索内容最长长度
	"autoSearchTimer": 2, //鹰眼搜自动搜索下一页时间间隔，即下次请求时间，单位秒
	"ajaxTimeout": 200, //ajax请求超时设置，单位秒，要大于后台设置的185秒
	//所有国家缩写
	"countrys": "",
	"countryList": [],
	"countryMap": {
		"yz": [],
		"oz": [],
		"mz": [],
		"dyz": [],
		"fz": []
	}
}

var url = location.href;
//管理后台不执行
if(url.indexOf("index.jsp") == -1) {

	$.ajax({
		type: "post",
		url: yysConfigs.yysCentreUrl + "/yys/country/all",
		async: false,
		success: function(responseData) {
			if(responseData.success) {
				yysConfigs.countryList = responseData.data;
				var continent = null; //所属洲
				for(var i in yysConfigs.countryList) {
					continent = yysConfigs.countryList[i].continent;
					switch(continent) {
						case "yz": //亚洲
							yysConfigs.countryMap.yz.push(yysConfigs.countryList[i]);
							break;
						case "oz": //亚洲
							yysConfigs.countryMap.oz.push(yysConfigs.countryList[i]);
							break;
						case "mz": //亚洲
							yysConfigs.countryMap.mz.push(yysConfigs.countryList[i]);
							break;
						case "dyz": //亚洲
							yysConfigs.countryMap.dyz.push(yysConfigs.countryList[i]);
							break;
						case "fz": //亚洲
							yysConfigs.countryMap.fz.push(yysConfigs.countryList[i]);
							break;
					}

					yysConfigs.countrys += yysConfigs.countryList[i].shorthand + ",";
				}

				yysConfigs.countrys = yysConfigs.countrys.substring(0, yysConfigs.countrys.length - 1);
			} else {
				console.log(responseData.msg);
			}
		}
	});
}