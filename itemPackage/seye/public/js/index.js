/*(function(){ // rem 计算公式
    var winW = $(window).width();
    if(winW>768){winW = 768;}
    $('html').css('font-size', winW / 7.5/100);
    $(window).resize(function() {
        winW = $(window).width();
        if(winW>768){winW = 768;}
        $('html').css('font-size', winW / 7.5);
    })
})();*/
$(document).ready(function(){// 矫正移动端滚动条宽度不一致问题
	$('.table-body').children('table').css('width',$('.table-head').width());
})
$(window).resize(function(){// 矫正移动端滚动条宽度不一致问题
	$('.table-body').children('table').css('width',$('.table-head').width());
})
var thName = ['webName','expectedRate','term','minimum','schedule'];
// 对应table要显示的数据
var navTableName = {dom:'.table-body tbody',state:'定期'};
var dataList = [];
var crawler = {};
	// 排序函数
	crawler.SortFn = function(a,b){
		var first=a.expectedRate;
	    	first=first.replace(/[\u4e00-\u9fa5]/g,"");// 去除中文
	    	first = first.replace(/[\%]/g,'');		   // 去除%
	    	if(first.indexOf('~') > -1)first = first.substring(0,first.indexOf('~')); // 截取~前面的值
	    	if(first == "")first = 0;				   // 值为空
    	var last=b.expectedRate;
	    	last=last.replace(/[\u4e00-\u9fa5]/g,"");
	    	last = last.replace(/[\%]/g,'');
	    	if(last.indexOf('~') > -1)last = last.substring(0,last.indexOf('~'));
	    	if(last == "")last = 0;
    	
		return eval(last) - eval(first);
	}
	crawler.nav = function(items){
		var nav = {
				str1:'chevron-copy-copy-copy-copy-copy-copy',
				str2:'chevron-copy-copy-copy',
				svglast :'svg:last',
				ul  :'.secondLevelNav'
			}
		items.click(function(event){
			event.stopPropagation();//阻止冒泡
			$('.nav-itmes').find('a').removeClass('navState');
			$(this).children('a').addClass('navState');
			if($(this).children('a').attr('data-state') != undefined){
				// 获取当前table name 并重新加载页面
				navTableName.state = $(this).children('a').attr('data-state');
				// empty tbody html
				$(navTableName.dom).empty();
				// add tbody html
				crawler.getDte(navTableName);
				// tab title
				$('.Position-title').children('i').html($(this).children('a').attr('data-title'));
			}
			if($(this).children(nav.ul).length > 0 ){
				var _style = new navClickStyle($(this)); // 切换样式
				$(nav.ul).is(':hidden') ? $(nav.ul).stop().show():$(nav.ul).stop().hide(); // 二级导航显示隐藏
			}
		})
		function navClickStyle(event){
			var svg = event.children(nav.svglast);
			if(svg.html().indexOf(nav.str1) < 0 && svg.html().indexOf(nav.str2) < 0)return;// 当前点击导航为二级导航
			if(svg.html().indexOf(nav.str1) > -1){
				svg.html(svg.html().replace(nav.str1,nav.str2));
			}else{
				svg.html(svg.html().replace(nav.str2,nav.str1));
			}
		}
	}
	// get date 
	crawler.getDte = function(obj){
		var dom   = obj.dom,
			state = obj.state;
	    $.ajax({
	        type: "post",
	        url:'/query/jbh',
	        async: true,
	        dataType: 'text',
	        timeout: 1000 * 60*10,
	        success: function (data) {
	        	dataList = [];
	            // formatting data
	            var datas = JSON.parse(data.replace(/null/g, '""').replace(/N\/A/g, " ").replace(/NA/g, " "));
	            $('#crawlerTime').html(datas[0].crawlerDate);
	         	datas.sort(crawler.SortFn);
	         	$('.table-head').find('th:nth-child(3)').html('投资期限');
	         	// 不同tab判断
	         	if(state == '定期'){
	         		for(var i = 0; i < datas.length; i ++){
	         			var tr = $('<tr></tr>');
	         			//排除活期
	         			if(datas[i].term.indexOf('元') < 0 ){
	         				dataList.push(datas[i]); 
	         				for(x in thName){
			           			tr.append('<td>'+ datas[i][thName[x]]+'</td>');
			           		}
	         			}
		           		$(dom).append(tr);
		           	}
	         	}
	         	else if(state == '活期'){
	         		$('.table-head').find('th:nth-child(3)').html('万分收益');
	         		for(var i = 0; i < datas.length; i ++){
	         			var tr = $('<tr></tr>');
	         			//排除活期
	         			if(datas[i].term.indexOf('元') > -1 ){
	         				dataList.push(datas[i]); 
	         				for(x in thName){
			           			tr.append('<td>'+ datas[i][thName[x]]+'</td>');
			           		}
	         			}
		           		$(dom).append(tr);
		           	}
	         	}
	         	else if(state == '海航'){
	         		for(var i = 0; i < datas.length; i ++){
	         			var tr = $('<tr></tr>');
	         			//排除活期
	         			if(datas[i].crawlerPage == '海航' ){
	         				dataList.push(datas[i]); 
	         				for(x in thName){
			           			tr.append('<td>'+ datas[i][thName[x]]+'</td>');
			           		}
	         			}
		           		$(dom).append(tr);
		           	}
	         	}
	         	else if(state == '绿地'){
	         		for(var i = 0; i < datas.length; i ++){
	         			var tr = $('<tr></tr>');
	         			//排除活期
	         			if(datas[i].crawlerPage == '绿地' ){
	         				dataList.push(datas[i]); 
	         				for(x in thName){
			           			tr.append('<td>'+ datas[i][thName[x]]+'</td>');
			           		}
	         			}
		           		$(dom).append(tr);
		           	}
	         	}
	         	else if(state == '陆金所'){
	         		for(var i = 0; i < datas.length; i ++){
	         			var tr = $('<tr></tr>');
	         			//排除活期
	         			if(datas[i].crawlerPage == '陆金所' ){
	         				dataList.push(datas[i]); 
	         				for(x in thName){
			           			tr.append('<td>'+ datas[i][thName[x]]+'</td>');
			           		}
	         			}
		           		$(dom).append(tr);
		           	}
	         	}
	         	else if(state == '历史最高收益'){
	         		dataList.push(datas[0]); 
         			var tr = $('<tr></tr>');
     				for(x in thName){
	           			tr.append('<td>'+ datas[0][thName[x]]+'</td>');
	           		}
	           		$(dom).append(tr);
	         	}
	        },
	        complete: function () {
	        	$('#loading').remove();
	        }
	    });
	}
	// sort click
	crawler.clickSort = function(){
		var sorts = {
			dom:'.sort',
			invertedOrder:'invertedOrder',
		}
		$(sorts.dom).children().click(function(){
			$(navTableName.dom).empty();
			if($(this).hasClass(sorts.invertedOrder)){
				dataList.sort(function(a,b){
					var first=a.expectedRate;
				    	first=first.replace(/[\u4e00-\u9fa5]/g,"");
				    	first = first.replace(/[\%]/g,'');
				    	if(first.indexOf('~') > -1)first = first.substring(0,first.indexOf('~'));
				    	if(first == "")first = 0;
			    	var last=b.expectedRate;
				    	last=last.replace(/[\u4e00-\u9fa5]/g,"");
				    	last = last.replace(/[\%]/g,'');
				    	if(last.indexOf('~') > -1)last = last.substring(0,last.indexOf('~'));
				    	if(last == "")last = 0;
					return eval(first) - eval(last);
				});
			}else{
				dataList.sort(crawler.SortFn);
			}
			for(var i = 0; i < dataList.length; i ++){
           		var tr = $('<tr></tr>');
           		for(x in thName){
           			tr.append('<td>'+ dataList[i][thName[x]]+'</td>');
           		}
       			$(navTableName.dom).append(tr);
           	}
		})
	}
crawler.table
crawler.nav($('.nav-itmes li'));
crawler.getDte(navTableName);
crawler.clickSort();
