var util = function() {
	this.yyyy_MM_dd = function(t) {
		var date = t == undefined ? new Date() : t;
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (day >= 0 && day <= 9) {
			day = "0" + day;
		}
		return year + "-" + month + "-" + day;
	};

	this.yyyyMMdd = function(t) {
		var date = t == undefined ? new Date() : t;
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (day >= 0 && day <= 9) {
			day = "0" + day;
		}
		return year + month + day;
	};

	this.HH = function() {
		var date = new Date();
		return date.getHours();
	};

	this.mm = function() {
		var date = new Date();
		return date.getMinutes();
	};

	this.toFixed = function(num, cent, isThousand) {
		// return d.toFixed(n);
		num = num.toString().replace(/\$|\,/g, '');

		// 检查传入数值为数值类型
		if (isNaN(num))
			num = "0";

		// 获取符号(正/负数)
		sign = (num == (num = Math.abs(num)));

		num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
		cents = num % Math.pow(10, cent); // 求出小数位数值
		num = Math.floor(num / Math.pow(10, cent)).toString(); // 求出整数位数值
		cents = cents.toString(); // 把小数位转换成字符串,以便求小数位长度

		// 补足小数位到指定的位数
		while (cents.length < cent)
			cents = "0" + cents;

		if (isThousand == undefined || isThousand) {
			// 对整数部分进行千分位格式化.
			for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
				num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		}

		if (cent > 0)
			return (((sign) ? '' : '-') + num + '.' + cents);
		else
			return (((sign) ? '' : '-') + num);
	};

	this.toFixed2 = function(num) {
		return this.toFixed(num, 2, true);
	};

	this.toFixed0 = function(num) {
		return this.toFixed(num, 0, true);
	};

	this.replaceAll = function(data, old_regexp, new_str) {
		return data.replace(new RegExp(old_regexp, "gm"), new_str);
	};
	this.object2QeuryString = function(obj) {
		var str = "";
		for ( var i in obj) {
			if (str != "") {
				str += "&";
			}
			str += i + "=" + obj[i];
		}
		return str;
	};
	this.getQueryString = function(queryString, name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = queryString.match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	};
	this.uuid = function() {
		var len=32;//32长度
		var radix=16;//16进制
		var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
		return uuid.join('');
	};

	this.modal = function(title, url, data, onClose) {
		var div_id = $util.uuid();
		var div = '';
		div += '<div id="' + div_id + '" class="modal fade">';
		div += '	<div class="modal-dialog" role="document">';
		div += '		<div class="modal-content">';
		div += '			<div class="modal-header">';
		div += '				<button type="button" class="close modal-close" data-dismiss="modal" aria-label="Close">';
		div += '					<span aria-hidden="true">&times;</span>';
		div += '				</button>';
		div += '				<h4 class="modal-title">' + title + '</h4>';
		div += '			</div>';
		div += '		<div class="modal-body">';
		div += '			One fine body&hellip;';
		div += '		</div>';
		div += '		<div class="modal-footer">';
		div += '			<button type="button" class="btn btn-secondary modal-close" data-dismiss="modal">关闭</button>';
		div += '			<button type="button" class="btn btn-primary modal-save">保存</button>';
		div += '		</div>';
		div += '	</div>';
		div += '</div>';
		div = $(div).modal();
		div.find(".modal-close").click(function() {
			if (onClose != undefined) {
				try {
					onClose();
				} catch (e) {
				}
			}
		});
		url = url == undefined ? "404.html" : url;
		htmlobj = $.ajax({
			url : url,
			async : false
		});
		var rst = htmlobj.responseText;
		rst = $util.replaceAll(rst, "[$][{]queryString[}]", $util.object2QeuryString(data));
		rst = $util.replaceAll(rst, "[$][{]windowId[}]", div_id);
		div.find(".modal-body").html(rst);
	};

	this.modalOnSave = function(windowId, func) {
		$("#" + windowId).find(".modal-save").click(function() {
			if (func != undefined) {
				try {
					func();
				} catch (e) {
				}
			}
		});
	};
};

var $util = new util();
