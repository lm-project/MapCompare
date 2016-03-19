
define(function(){
	var showCloseSearchResult = {};
	
	showCloseSearchResult.showSearchResult = function (tdSeq,attrValue,resultListId){
		
		console.log("点击的结果列表"+resultListId+"  查看的列值："+tdSeq+"  表头值："+attrValue);
		$("#"+resultListId+" table td").hide();
		$("#"+resultListId+" table th").hide();
		$("#"+resultListId+" table th:eq("+tdSeq+")").show();
		$("#"+resultListId+" table th:eq("+tdSeq+")").text("退出"+attrValue+"对比");
		$("#"+resultListId+" table th:eq("+tdSeq+")").css("color","red"); 
		if(attrValue!="名称"){
			$("#"+resultListId+" table th:eq("+1+")").show();
			$('#'+resultListId+' table tr').find('td:eq('+1+')').show();
			$("#"+resultListId+" table tr").find('td:eq('+1+')').css("width","40%");
		}	
		$('#'+resultListId+' table tr').find('td:eq('+tdSeq+')').show();
		$('#'+resultListId+' table tr').find('td:eq('+tdSeq+')').css("white-space","normal");
		$('#'+resultListId+' table tr').find('td:eq('+tdSeq+')').css("width","100%");
		$('#'+resultListId+' table').css("table-layout","auto");
  
	};
	showCloseSearchResult.closeSearchResult = function(tdSeq,attrValue,resultListId){
		var textLength = attrValue.length-2;
		var preValue = attrValue.substring(2, textLength);
		$("#"+resultListId+" table th:eq("+tdSeq+")").text(preValue);
		$("#"+resultListId+" table th:eq("+tdSeq+")").css("color","");
		$("#"+resultListId+" table th").show();
		$("#"+resultListId+" table td").show();
		$("#"+resultListId+" table tr").find('td:eq('+tdSeq+')').css("white-space","nowrap");
		$("#"+resultListId+" table").css("table-layout","fixed");
		
	};
	return showCloseSearchResult;

});