var basic = {};
    basic.arr = {0:[{'field':'loan_id','title':'序号'},
			{'field':'status','title':'状态'},
			{'field':'project_name','title':'项目名称'},
			{'field':'project_type','title':'项目类型'},
			{'field':'main_loan_name','title':'融资主体'},
			{'field':'assets_no','title':'资产编号'},
			{'field':'rate_type','title':'付息方式'},
			{'field':'danxi_amount','title':'担息金额'},
			{'field':'danxi_days','title':'担息天数及原因'},
			{'field':'preceding_charge','title':'前段费用'},
			{'field':'cut_interest_rate','title':'砍头息利率'},
			{'field':'cut_interest_amount','title':'砍头息'},
			{'field':'caigu_rate','title':'财顾费率'},
			{'field':'caigu_amount','title':'财顾费用'},
			{'field':'is_cut_interest','title':'砍头息是否扣除'},
			{'field':'is_caigu_amount','title':'财顾费 是否收取'},
			{'field':'is_commit_letter','title':'是否开具代偿承诺函'},
			{'field':'is_co_manage','title':'是否设立共管'},
			{'field':'month_category','title':'期限'},
			{'field':'total_amount','title':'总融资规模（元）'},
			{'field':'total_cost_rate','title':'总成本（%）'},
			{'field':'group_cost_rate','title':'成本承担的主体 地产公司'},
			{'field':'area_cost_rate','title':'地区公司'},
			{'field':'borrower_cost_rate','title':'借款人'},
			{'field':'material_cost_rate','title':'材料公司'},
			{'field':'management_channel','title':'资管通道'},
			{'field':'begin_date','title':'委贷起始日'},
			{'field':'end_date','title':'委贷终止日'},
			{'field':'rate_days','title':'计息天数'},
			{'field':'loan_bank_name','title':'放款 开户行'},
			{'field':'loan_bank_no','title':'账号'},
			{'field':'repay_bank_name','title':'还款 开户行'},
			{'field':'repay_bank_no','title':'账号'},
			{'field':'loan_type','title':'备注'}
	]};
	
	basic.wrap = $('#basic-m-flex');
	$(document).ready(function(){
		//  加载 tab 外层模块
		basic.wrap.append(Pages.tabModule(3));
		var html = '<a href="javascript:;" class="flexTab-change">查询</a>';
		basic.wrap.find('.flexTab-u-nav').append(html);
		
		var details = {
			Url:'/get/assetsBaseInfo?id=67',
			Array:basic.arr[0],
			main:basic.wrap.children(':first')
		}
		Pages.getFullFetchData(details);
	})
	
