var makeLoans = {};
	makeLoans.total = {};
    makeLoans.arr = {0:[
    				{'field':'loan_id','title':'序号'},
    				{'field':'assets_name','title':'项目名称'},
    				{'field':'','title':'融资主体'},
    				{'field':'total_amount','title':'资产金额'},
    				{'field':'assets_no','title':'底层资产编号'},
    				{'field':'amount','title':'底层资产投资金额'},
    				{'field':'amount','title':'投资金额合计'},
    				{'field':'assets_cost','title':'资产年化收益率'},
    				{'field':'inception_date','title':'资产放款日'},
					{'field':'due_date','title':'资产还款日'},
    				{'field':'product_limit','title':'投资期限'},
					{'field':'','title':'每年期限'},
    				{'field':'','title':'底层资产投资收益'},
					{'field':'','title':'资产投资收益合计'},
    				{'field':'project_name','title':'资管通道'},
    				{'field':'','title':'资管费率'},
					{'field':'','title':'开通/交易所费率'},
					{'field':'','title':'托管费率（含存管费）'},
					{'field':'','title':'通道费率小计'},
					{'field':'','title':'每年期限'},
					{'field':'','title':'通道费小计'},
					{'field':'','title':'委贷行手续费率'},
					{'field':'','title':'委贷行手续费'},
					{'field':'','title':'通道费和委贷行手续费小计'},
					{'field':'','title':'资产通道费和委贷行手续费合计'},
					{'field':'','title':'财顾费'},
					{'field':'','title':'财顾费小计'},
					{'field':'','title':'备注'},
					{'field':'no_loan_amount','title':'未放款金额'}
				]};
	makeLoans.wrap = $('#makeLoans-m-flex');
	makeLoans.footer  = function(numb){
		var html = '<footer class="footer">'
			+'<table>'
			+'<tr>'
			+'<td>投资金额合计：</td>'
			+'<td>'+ numb.amount +'（元）</td>'
			+'<td>投资收益合计：</td>'
			+'<td>'+ numb.profit +'（元）</td>'
			+'</tr>'
			+'</table>'
		+'<footer>';
		return html
	}
	
	// 合并指定行
    makeLoans.merge = function($bodyTab){
    	// 合并相同行
		function merge1($bodyTab,arr){
			// tr>td.length
			var totalRows = $bodyTab.find("tr").length;
			// 倒序对比原因：相同值接点删除掉之后,原有的下标被打乱了
			for ( var i = totalRows-1; i >= 0; i--) {
				for ( var j = arr.length-1; j >=0 ; j--) {
					startCell = $bodyTab.find("tr").eq(i).find("td").eq(arr[j]);
					targetCell = $bodyTab.find("tr").eq(i-1).find("td").eq(arr[j]);
					if (startCell.text() == targetCell.text() && targetCell.html() != "") {
						targetCell.attr("rowspan", (startCell.attr("rowspan")==undefined)?2:(eval(startCell.attr("rowspan"))+1));
						startCell.remove();
					}
				}
			}
		}
		    
		// 计算并合并指定行
		function amountMerge1 ($bodyTab,arr){
			var size = $bodyTab.find("tr").eq(0).children().length;
			$bodyTab.find("tr").each(function(){
				if($(this).children().length == size){
					// 没有删过子元素 td 的 TR，获取其第一个子级的 rowspan 属性; 
					var rowspan = $(this).children('td').eq(1).attr('rowspan');
					// 判断rowspan 是否存在
					if(rowspan == undefined || $(this).children().length < size) return true;
					// 获取当前第一个tr的索引号;
					var index = $(this).index();
					for(n in arr){
						// 当前tr 指定的子元素
						var thisChild = $(this).children('td').eq($(this).length - arr[n]);
						// 根据 rowspan 值遍历符合当前tr要求的的兄弟;
						for(var i = 1; i < rowspan; i++){
							// 当前TR的兄弟;
							var $next = $(this).parent().children('tr').eq(index + i);
							if(arr[n] == 2){
								// html()值替换掉','并转成数值型,相加完成后再次格式化
								// 值 = 资产金额 - 投资金额合计
								var newText = Number((thisChild.parent().children('td').eq(3).html()).replace(/,/g,"")) - Number((thisChild.parent().children('td').eq(6).html()).replace(/,/g,""));
								// 合并 thisChild 的下一个兄弟；
								thisChild.html(parseFloat(newText).toLocaleString());
							}else{
								// html()值替换掉','并转成数值型,相加完成后再次格式化
								var newText = Number((thisChild.html()).replace(/,/g,"")) + Number(($next.children('td').eq($(this).length - arr[n]).html()).replace(/,/g,""));
								// 合并 thisChild 的下一个兄弟；
								thisChild.html(parseFloat(newText).toLocaleString());
							}
							thisChild.attr('rowspan',(thisChild.attr("rowspan")==undefined)?2:(eval(thisChild.attr("rowspan"))+1));
							$next.children('td').eq($(this).length - arr[n]).remove();
						}
					}
				}
			})
		}
		// 根据rowspan值，合并指定行
		function amountMerge2 ($bodyTab,arr){
			var size = $bodyTab.find("tr").eq(0).children().length;
			$bodyTab.find("tr").each(function(){
				if($(this).children().length == size){
					// 没有删过子元素 td 的 TR，获取其第一个子级的 rowspan 属性; 
					var rowspan = $(this).children('td').eq(1).attr('rowspan');
					// 判断rowspan 是否存在
					if(rowspan == undefined || $(this).children().length < size) return true;
					// 获取当前第一个tr的索引号;
					var index = $(this).index();
					for(n in arr){
						// 当前tr 指定的子元素
						var thisChild = $(this).children('td').eq($(this).length - arr[n]);
						// 根据 rowspan 值遍历符合当前tr要求的的兄弟;
						for(var i = 1; i < rowspan; i++){
							// 当前TR的兄弟;
							var $next = $(this).parent().children('tr').eq(index + i);
							// 合并 thisChild 的下一个兄弟；
							thisChild.attr('rowspan',(thisChild.attr("rowspan")==undefined)?2:(eval(thisChild.attr("rowspan"))+1));
							$next.children('td').eq($(this).length - arr[n]).remove();
						}
					}
				}
			})
		}
    	
		var totalCols = ['1'];
		merge1($bodyTab,totalCols)
		// 合并行
		var arrIndex2 = ['28','27'];
		amountMerge2 ($bodyTab,arrIndex2);
		// 需合并&合计的行，索引倒序
		var arrIndex = ['24','17','4','2'];
		amountMerge1 ($bodyTab,arrIndex);
    }

    
	$(document).ready(function(){
		//  加载 tab 外层模块
		makeLoans.wrap.append(Pages.tabModule(4));
		var html = '<a href="javascript:;" class="flexTab-change">查询</a>';
		makeLoans.wrap.find('.flexTab-u-nav').append(html);
		var details = {
			Url:'/get/loanAmount',
			Array:makeLoans.arr[0],
			main:makeLoans.wrap.children(':first'),
		}
		Pages.getFullFetchData(details);
	})
