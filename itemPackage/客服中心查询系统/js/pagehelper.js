var PageHelper = function(id) {
	this.id = id;
	this.init = function(currentPage, pageSize, total, findByPage) {
		var pagination = $('#' + this.id);
		pagination.empty();
		var showSize = 9;
		pagination.empty();
		var li_first = $('<li><span>首页</span></li>');
		var li_up = $('<li><span>上一页</span></li>');
		pagination.append(li_first);
		pagination.append(li_up);

		if (currentPage == 1) {
			li_first.addClass("disabled");
			li_up.addClass("disabled");
		} else {
			li_first.click(function() {
				findByPage(1);
			});
			li_up.click(function() {
				findByPage(currentPage - 1);
			});
		}

		var totalPage = Math.ceil(total / pageSize);
		var start = 0;
		var end = 0;

		if (totalPage < showSize) {
			start = 1;
			end = totalPage;
		} else if (currentPage >= totalPage - parseInt(showSize / 2)) {
			start = totalPage - showSize + 1;
			end = totalPage;
		} else if (currentPage <= parseInt(showSize / 2)) {
			start = 1;
			end = showSize;
		} else {
			start = currentPage - parseInt(showSize / 2);
			end = currentPage + parseInt(showSize / 2);
		}
		for (var i = start; i <= end; i++) {
			var li = $('<li><span>' + i + '</span></li>');
			if (currentPage != i) {
				li.click(function() {
					findByPage($(this).text());
				});
			} else {
				li.addClass("active");
			}
			pagination.append(li);
		}

		var li_down = $('<li><span>下一页</span></li>');
		var li_end = $('<li><span>尾页</span></li>');
		pagination.append(li_down);
		pagination.append(li_end);

		if (currentPage == totalPage) {
			li_down.addClass("disabled");
			li_end.addClass("disabled");
		} else {
			li_down.click(function() {
				findByPage(currentPage + 1);
			});
			li_end.click(function() {
				findByPage(totalPage);
			});
		}
		pagination.append('<li><span>共' + total + '条数据</span></li>');
	};
};
