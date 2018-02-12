var useObj;
var Pages = {};
var nameGroup = {
    wrap: $('.g-container'), // 外层
    header: $('.g-header'), // 顶部
    main: $('.g-content'), // 主体内容
    particular: 'particular', // 单行数据独立显示模块
    nav: 'u-navList', // 导航条
    navSwitch: 'toggle'            // 导航开关
};
$("#fuser").html($.cookie("fuser"));

// 创建 tab 父辈框架节点
Pages.tabModule = function (count) {
    var html = '<article class="flexTab-u-flex" id="flexTab-u-flex' + count + '">'
            + '<div class="relative">'
            + '<p class="flexTab-u-nav">'
            + '<a href="javascript:;" class="pre-copy" id="pre-copy' + count + '"onclick="javascript:method1(ta)">导出</a>'
            + '</p>'
            + '<a href="javascript:;" class="flexTab-unfold"><i class="Auto unfold">展开</i></a>'
            + '<section class="flexTab-u-tab u-tab"><div>'
            + '<div class="head-tab">'
            + '<table><tbody></tbody></table>'
            + '</div>'
            + '<div class="body-tab">'
            + '<table border="0" cellspacing="0" cellpadding="0" id="ta"><tbody></tbody></table>'
            + '</div></div>'
            + '</section>'
            + '</div>'
            + '</article>';
    return html
};

Pages.resize = function () {
    // content 高度
    var hg = nameGroup.wrap.height() - nameGroup.header.height();
    nameGroup.main.css('height', hg);
}
Pages.contentAjax = function (L) {
    $('#data-item').hide();
    var UR = String(document.location).split('#')[0];
    $.ajax({
        type: "get",
        url: "pages/" + L,
        async: false,
        success: function (text) {
            nameGroup.main.empty();
            nameGroup.main.html(text);
            document.location = UR + '#' + L;
        }
    });
}
Pages.ready = function () {
    var url = String(document.location).split('#')[1];
    if (!url || url.length < 0 || url == undefined) {
        $('.u-navList').children().eq(0).addClass('bg');
        $('#formName').html($('.u-navList').children().eq(0).html());
        Pages.contentAjax('flexTab');
    } else {
        Pages.contentAjax(url);
        $('.u-navList').children().removeClass('bg');
        var thisNav = $('.u-navList').children('[data-page="'+url+'"]');
        thisNav.addClass('bg');
        $('#formName').html(thisNav.html());
    }

}
// alone itme show
Pages.aloneItmeShow = function () {
    $(document).dblclick(function (event) {
        if ($(event.target).parents('#flex2').length < 1) {
            var th = $(event.target).parents('.body-tab').prev().find('tr').clone();
            $('.' + nameGroup.particular).find('table').append(th);
            if (event.target.nodeName.toLowerCase() != 'td')
                return;
            var size = $(event.target).parents('.body-tab').prev().find('th').length;
            // 解决合并之后 td 列错位
            if ($(event.target).parent().children('td:last').prev().attr('rowspan') == undefined && $(event.target).parent().children().length < size) {
                var $this = undefined;
                var td = $(event.target).parent().children();
                var $thisSize = $(event.target).parent().prev('.rows').children('td').length;
                var tr = $('<tr></tr>');
                var index = $(event.target).parent().index();
                for (var n = index; n >= 0; n--) {
                    if ($(event.target).parents('table').find('tr').eq(n).children().length == size && $this == undefined) {
                        $this = $(event.target).parents('table').find('tr').eq(n);
                    }
                }
                for (var i = 0; i < td.length + 1; i++) {
                    if (i == 0) {
                        var t = $this.children('td:first').clone();
                        tr.append(t);
                        var t2 = $this.children('td:first').next().clone()
                        tr.append(t2);
                        var t3 = $this.children('td:first').next().next().clone()
                        tr.append(t3);
                    } else if (i == td.length - 2) {
                        var t = $this.children('td:last').prev().prev().prev().clone();
                        tr.append(t);
                        tr.append($(td).eq(i).clone());
                    } else if (i == td.length - 1) {
                        var t = $this.children('td:last').prev().clone();
                        tr.append(t);
                        if ($(td).eq(i).clone().html() == "") {
                            tr.append($this.children('td:last').clone())
                        }
                    } else {
                        tr.append($(td).eq(i).clone());
                    }
                }
                $('.' + nameGroup.particular).find('table').append(tr);
            } else {
                var td = $(event.target).parent().clone();
                $('.' + nameGroup.particular).find('table').append(td);
            }
        } else {
            var th = $(event.target).parents('#flex2').find('.body-tab').prev().find('tr').clone();
            $('.' + nameGroup.particular).find('table').append(th);
            if (event.target.nodeName.toLowerCase() != 'td')
                return;
            var size = $(event.target).parents('#flex2').find('.body-tab').prev().find('th').length;
            // 解决合并之后 td 列错位
            if ($(event.target).parent().children('td:last').prev().attr('rowspan') == undefined && $(event.target).parent().children().length < size) {
                var $this = undefined;
                var td = $(event.target).parent().children();
                var $thisSize = $(event.target).parent().prev('.rows').children('td').length;
                var tr = $('<tr></tr>');
                var index = $(event.target).parent().index();
                for (var n = index; n >= 0; n--) {
                    if ($(event.target).parent().parent('table').find('tr').eq(n).children().length == size && $this == undefined) {
                        $this = $(event.target).parent().parent('table').find('tr').eq(n);
                    }
                }
                for (var i = 0; i < td.length + 1; i++) {
                    if (i == 0) {
                        var t = $this.children('td:first').clone();
                        tr.append(t);
                        var t2 = $this.children('td:first').next().clone()
                        tr.append(t2);
                        var t3 = $this.children('td:first').next().next().clone()
                        tr.append(t3);
                    } else if (i == td.length - 2) {
                        var t = $this.children('td:last').prev().prev().prev().clone();
                        tr.append(t);
                        tr.append($(td).eq(i).clone());
                    } else if (i == td.length - 1) {
                        var t = $this.children('td:last').prev().clone();
                        tr.append(t);
                        if ($(td).eq(i).clone().html() == "") {
                            tr.append($this.children('td:last').clone())
                        }
                    } else {
                        tr.append($(td).eq(i).clone());
                    }
                }
                $('.' + nameGroup.particular).find('table').append(tr);
            } else {
                var td = $(event.target).parent().clone();
                $('.' + nameGroup.particular).find('table').append(td);
            }
        }
        var leftTr = $('.' + nameGroup.particular).find('th');
        var rightTr = $('.' + nameGroup.particular).find('td');
        $('.' + nameGroup.particular).show();
        // 左右两边高度对等
        for (var i = 0; i < rightTr.length; i++) {
            if ($(leftTr).eq(i).height() < $(rightTr).eq(i).height()) {
                $(leftTr).eq(i).css('height', $(rightTr).eq(i).height());
            } else {
                $(rightTr).eq(i).css('height', $(leftTr).eq(i).height());
            }
        }
    })
}
// 其他页面数据请求
// 创建 th , 目的是针对多个不同 th。 这里实际 arr 是从后台获取的 。
// colgroup 的创建是为了保证 headTab & bodyTab 里面后代 td 宽度的一致性;
Pages.getFullFetchData = function (details) {
	var $load = '<article id="loading">'
	    		+'<div class="loader">'
				  	+'<section>'
				  		+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
				  	+'</section>'
				+'</div>'
			+'</article>';
	details.main.append($load);
	setTimeout(function(){
		$.when(getData(details)).done(function(data){
	        alert(data);
	    });
	},500)
}
function getData(obj){
	var $this = obj.main;
	    Array = obj.Array,
	    sta   = obj.status
	    $thead = $this.find('.head-tab').children(),
	    $tbody = $this.find('.body-tab').children();
    var defer = $.Deferred();
    $.ajax({
        type: "post",
        url: obj.Url,
        async: true,
        dataType: 'text',
        timeout: 1000 * 60*10,
        success: function (data) {
            // formatting data
            data = data.replace(/null/g, '""').replace(/N\/A/g, " ").replace(/NA/g, " ");
            data = JSON.parse(data);
            // Object.getOwnPropertyNames( 返回对象自己的属性的名称。)
            var details = data,
                    colgroupHtml = "",
                    $theadTr = $('<tr></tr>'),
                    amount = 0,
                    profit = 0,
                    count = 1;
            useObj = "";
            if (details == "" || !details)
                return alert('暂时没有数据！');
            // each data
            $('#data-item').children(':first').html(details.length);
            useObj = details;
            for (var i = 0; i < details.length; i++) {
                var $tbodyTr = $('<tr></tr>');
                // each thead,The tbody content and thead consistent sequence
                // 活期产品字段调整
                if (details[i].term.indexOf('元') > -1){
                	details[i].webName = details[i].webName + '<br/><i style="color:#ff9800;">（活期产品）</i>';
                	details[i].expectedRate = '<i style="color:#ff9800;">（七日年化）</i>'+ details[i].expectedRate;
                	details[i].term = '<i style="color:#ff9800;">（万分收益）</i>'+ details[i].term;
                	details[i].schedule = '不限';
                }
                for (var n = 0; n < Array.length; n++) {
                    var field = Array[n].field
                        Text = details[i][field],
                            col = '<col style="width:' + (100 / (Array.length)).toFixed(2) + '%;"></col>',
                            th = '<th>' + Array[n].title + '</th>';

                    // <col> ready once
                    if (i == 0) {
                        colgroupHtml += col;
                        $theadTr.append(th);

                    }
                	var td = '<td>' + Text + '</td>';
                    
                    $tbodyTr.append(td);
                }
                count++
                $tbody.children('tbody').append($tbodyTr);
            }
	            var colgroup = $('<colgroup>' + colgroupHtml + '</colgroup>');
	            // 因为对象只有一个，只能加载到一个对象里;
	            var colgroup1 = colgroup.clone();
	            var th = $theadTr.clone();
	            $thead.children('tbody').append($theadTr).before(colgroup);
	            $tbody.find('tbody').before(th);
	            $tbody.children('tbody').before(colgroup1);
	            if ($this.parent().attr('id') == 'makeLoans-m-flex') {
	                // 投资金额合计
	                makeLoans.total.amount = (amount/2);
	                // 投资收益合计
	                makeLoans.total.profit = (profit/2);
	                makeLoans.wrap.append(makeLoans.footer(makeLoans.total));
	                makeLoans.merge($tbody);
	            }
	            $('#data-item').show();
	            $this.parent().attr('id') == 'laterPeriodCosts-m-flex' ? $('#data-item').children(':last').html('最近七天数据').prev().show():$('#data-item').children(':last').html('全量数据').prev().show();
	            // tab style
	            Pages.scrollSize($this);
        },
        complete: function () {
        	$('#loading').remove();
        }
    });
    return defer.promise();
}

Pages.scrollSize = function (dom) {
    var $this = dom.find('.body-tab').children('table');
    var tabW = $this.outerWidth();
    $this.parent('.body-tab').css('width', tabW + 18)
            .prev('.head-tab').css('width', tabW)
            .parent().css({'width': tabW + 6, 'overflow': 'hidden'})
            .parent().css({'overflow-x': 'scroll'});
    $this.find('tr').eq(1).children('td').each(function () {
        var index = $(this).index(),
            minW  = $(this).outerWidth();
        $this.parent().prev().find('th').eq(index).css('min-width',minW);
        $this.find('th').eq(index).css('min-width',minW);
    })
}
$(window).resize(Pages.resize)
$(window).ready(function () {
    Pages.ready()
});
Pages.resize();
Pages.aloneItmeShow();

//   Date 插件   start
function createDate(event) {
    $("<div id='da'></div>").calendar({
        trigger: $(event),
        zIndex: 999,
        format: 'yyyy-mm-dd'
    }).appendTo($("body"));
}
// nav
function navAnimate(e) {
    $pet = e.parent();
    $pet.parent().toggleClass('expanded');
    $pet.next().toggleClass('hidden');
    $(e, $pet).toggleClass('index-close');
    if (!$pet.parent().hasClass('expanded')) {
        $pet.parent().animate({left: '0'});
        $('.h2').animate({left: '0'});
    } else {
        $pet.parent().animate({left: '1.8rem'});
        $('.h2').animate({left: '-1rem'});
    }
}
;

// 回车键
$(document).keypress(function (event) {
    // 回车键事件 
    if (event.which == 13) {
        $('.submit').trigger('click')
    }
}); 

function exit() {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = 'pp' + "=" + null + "; expires=" + date.toGMTString();
    document.cookie = 'user' + "=" + null + "; expires=" + date.toGMTString();
    document.cookie = 'userName' + "=a; expires=" + date.toGMTString();
    location.href='/login';
}
$(function(){
	$.getScript("js/calendar.js");
	$('.queryDate').on('focus',function(){
		createDate($(this));
	})
})
