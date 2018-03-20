/**调用kindeditor的弹窗提示*/
function myAlert(msg) {
	var dialog = KindEditor.dialog({
		width: 300,
		title: '温馨提示',
		body: '<div style="margin:10px 3px;"><strong>' + msg + '</strong></div>',
		closeBtn: {
			name: '关闭',
			click: function(e) {
				dialog.remove();
			}
		},
		noBtn: {
			name: '确定',
			click: function(e) {
				dialog.remove();
			}
		}
	});
}

//
//items: [
//			'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
//			'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
//			'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
//			'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
//			'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
//			'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
//			'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
//			'anchor', 'link', 'unlink', '|', 'about'
//		]

/**初始化富文本编辑器对象*/
function initKindEditor(params) {

	var textareaName = params.textareaName;
	var requestUrl = params.requestUrl;
	var userId = params.userId;
	var allowImageUpload = params.allowImageUpload;
	var allowFileManager = params.allowFileManager;
	var width = params.width;
	var height = params.height;
	var items = params.items;
	var callBackUrl = params.callBackUrl != null ? params.callBackUrl : getRootPath() + "/yingxuetang/resources/kindeditor/redirect.html";
	
	var editor = KindEditor.create('textarea[name="' + textareaName +
		'"]', {
			cssPath: getRootPath() + '/yingxuetang/resources/kindeditor/plugins/code/prettify.css',
			uploadJson: requestUrl + '/kindeditor/file/upload?userId=' + userId + '&callBackUrl=' + callBackUrl,
			fileManagerJson: requestUrl + '/kindeditor/file/manager?userId=' + userId,
			allowImageUpload: allowImageUpload, //运行上传图片  
			allowFileManager: allowFileManager, //可管理文件
			filePostName: 'file', //跟服务端参数对应
			width: width,
			height: height,
			items: items,
			afterCreate: function() {
				this.sync(); //图片上传后，将上传内容同步到textarea中
			},
			afterBlur: function() {
				this.sync(); //失去焦点时，将上传内容同步到textarea中
			}
		});

	return editor;
}