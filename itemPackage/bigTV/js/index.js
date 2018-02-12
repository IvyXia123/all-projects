var mapObjct=[
		{'name':['安徽'],'bg':['anhui'],'width':90,'height':98,'top':334,'left':589,'topA':378,'leftA':618},
		{'name':['内蒙'],'bg':['neimeng'],'width':390,'height':342,'top':-62,'left':302,'topA':169,'leftA':507},
		{'name':['黑龙江'],'bg':['heilongjiang'],'width':202,'height':184,'top':-67,'left':618,'topA':31,'leftA':715},
		{'name':['新疆'],'bg':['xinjiang'],'width':364,'height':276,'top':20,'left':-73,'topA':169,'leftA':103},
		{'name':['西藏'],'bg':['xizang'],'width':352,'height':218,'top':273,'left':-35,'topA':396,'leftA':145},
		{'name':['青海'],'bg':['qinghai'],'width':224,'height':168,'top':229,'left':158,'topA':300,'leftA':254},
		{'name':['甘肃'],'bg':['gansu'],'width':254,'height':218,'top':163,'left':226,'topA':318,'leftA':392},
		{'name':['宁夏'],'bg':['ningxia'],'width':58,'height':93,'top':232,'left':400,'topA':264,'leftA':415},
		{'name':['上海'],'bg':['shanghai'],'width':27,'height':21,'top':378,'left':698,'topA':378,'leftA':697},
		{'name':['辽宁'],'bg':['liaoning'],'width':110,'height':101,'top':130,'left':627,'topA':166,'leftA':673},
		{'name':['广东'],'bg':['guangdong'],'width':140,'height':113,'top':517,'left':509,'topA':553,'leftA':554},
		{'name':['广西'],'bg':['guangxi'],'width':143,'height':112,'top':499,'left':409,'topA':555,'leftA':476},
		{'name':['河南'],'bg':['henan'],'width':106,'height':102,'top':295,'left':511,'topA':337,'leftA':543},
		{'name':['陕西'],'bg':['shanxi'],'width':93,'height':163,'top':232,'left':427,'topA':321,'leftA':472},
		{'name':['山西'],'bg':['shanxi2'],'width':65,'height':135,'top':203,'left':506,'topA':271,'leftA':520},
		{'name':['河北'],'bg':['hebei'],'width':107,'height':147,'top':158,'left':554,'topA':247,'leftA':570},
		{'name':['吉林'],'bg':['jilin'],'width':154,'height':108,'top':70,'left':647,'topA':111,'leftA':717},
		{'name':['北京'],'bg':['beijing'],'width':44,'height':45,'top':186,'left':579,'topA':202,'leftA':585},
		{'name':['天津'],'bg':['tianjin'],'width':39,'height':41,'top':206,'left':603,'topA':219,'leftA':606},
		{'name':['山东'],'bg':['shandong'],'width':126,'height':78,'top':251,'left':584,'topA':281,'leftA':622},
		{'name':['江苏'],'bg':['jiangsu'],'width':116,'height':86,'top':313,'left':609,'topA':339,'leftA':655},
		{'name':['海南'],'bg':['hainan'],'width':52,'height':46,'top':631,'left':490,'topA':646,'leftA':500},
		{'name':['湖北'],'bg':['hubei'],'width':138,'height':94,'top':354,'left':482,'topA':390,'leftA':527},
		{'name':['云南'],'bg':['yunnan'],'width':160,'height':166,'top':449,'left':280,'topA':541,'leftA':344},
		{'name':['四川'],'bg':['sichuan'],'width':196,'height':174,'top':342,'left':286,'topA':413,'leftA':349},
		{'name':['贵州'],'bg':['guizhou'],'width':114,'height':97,'top':445,'left':387,'topA':489,'leftA':432},
		{'name':['台湾'],'bg':['taiwan'],'width':37,'height':76,'top':498,'left':700,'topA':527,'leftA':706},
		{'name':['福建'],'bg':['fujian'],'width':84,'height':102,'top':450,'left':617,'topA':494,'leftA':649},
		{'name':['湖南'],'bg':['hunan'],'width':100,'height':116,'top':423,'left':489,'topA':472,'leftA':520},
		{'name':['浙江'],'bg':['zhejiang'],'width':70,'height':82,'top':390,'left':655,'topA':425,'leftA':673},
		{'name':['江西'],'bg':['jiangxi'],'width':92,'height':122,'top':417,'left':572,'topA':465,'leftA':600},
		{'name':['重庆'],'bg':['chongqing'],'width':86,'height':83,'top':386,'left':426,'topA':423,'leftA':456}
	];
$(function(){
	loadCity();
	effectSmall();
	effectBig();
	corrugated();
	setInterval(function(){
		effectSmall();
		effectBig();
	},10000);
})
// City load
function loadCity(){
	for(var i=0;i<mapObjct.length;i++){
		var html='<div class="city">'+
			'<div class="citybg" style="background-image:url(image/map-2/'+mapObjct[i].bg+'.png);'+
			'top:'+mapObjct[i].top+'px;left:'+mapObjct[i].left+'px;width:'+mapObjct[i].width+'px;height:'+mapObjct[i].height+'px;"></div>'+
			'<a href="index.html" style="top:'+mapObjct[i].topA+'px;left:'+mapObjct[i].leftA+'px;">'+mapObjct[i].name+'</a>'+
			'</div>';
		$('.m-content').append(html);
	}
}
// The small deals show effect
function effectSmall(){
	var texts='广州张先生投资金额8亿元';
	var span=$("<span></span>").html(texts).css({position:"absolute",left:$(".list-span").outerWidth()+"px"});
	span.appendTo(".list-span");
	var size=span.html().length*27;
	span.animate({
		left:"-"+size
	},20000,function(){
		$(this).remove();
	})
}
// The big deals show effect
function effectBig(){
	var time=setInterval(currencyAnd,10);	
	var textName='感谢安徽刘先生';
	var textMoney='200万';
	var html='<div class="tooltip">'+
				'<img src="image/skin/tooltip.png" width="500"class="d-absolute"/>'+
				'<div class="prompt-box d-absolute">'+
				'<div class="prompt">'+
				'<p>'+textName+'</p>'+
				'<p>投资<i>'+textMoney+'</i></p></div></div></div>';
	$('body').append(html);	
	setTimeout(function(){
		clearInterval(time);
	},1000)
	setTimeout(function(){
		$('.tooltip').remove();
	},4000);	
}
function currencyAnd(){
	var  tet=["image/skin/coin_04.png","image/skin/coin_03.png","image/skin/coin_02.png","image/skin/coin_01.png"]
	var speed=Math.ceil(Math.random()*5000)+100;
	var z=Math.ceil(Math.random()*100)
	var arr=[0.32,0.2,0.35,0.29,0.3,0.4,0.25]
	var top=Math.ceil(Math.random()*90);
	var span1=$('<img src="'+tet[Math.floor(Math.random()*tet.length)]+'"/>').css({position:"absolute",bottom:$('body').outerHeight(),
				left:top+"%","z-index":z,'transform':'scale('+arr[Math.floor(Math.random()*arr.length)]+')'});
	span1.appendTo("body");
	span1.animate({
		bottom:"-"+span1.outerWidth()
	},speed,function(){
		$(this).remove();
	})		
}
//  City state of corrugated hints
function corrugated(){
	var city='新疆';
	var cityList=$('.m-content').find('a');
	for(i=0;i<cityList.length;i++){
		if($(cityList).eq(i).html()==city){
			$(cityList).eq(i).css('color','yellow');
			$(cityList).eq(i).siblings('.citybg').css("opacity",'1')
			var top=parseInt($(cityList).eq(i).css('top'))-10;
			var left=parseInt($(cityList).eq(i).css('left'))-5;
			var html=$('<span class="box"></span>').html('<i class="loader"></i>').css({top:top,left:left})
			$(cityList).eq(i).parents('.m-content').append(html);			
		}
	}
}
