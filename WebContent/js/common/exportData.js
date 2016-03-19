define(function(){

	var addExportDataBnt = function(searchResultsTable,exportRelDiv){
		var oTable=null;
		var oTableTools=null;
		$.extend($.fn.dataTable.defaults,{
			"bInfo":false,		  //是否显示表格的一些信息
			"bSort":false,        //是否让各列具有按列排序功能
			"bSortable": false,
			"bSortClasses":false, //指定当当前列在排序时，是否增加classes 
			"bDeferRender":false, //用于渲染的一个参数
			"bFilter": false,     //是否启用客户端过滤功能
			"bLengthChange":false,//是否显示一个每页长度的选择条
			"bPaginate":false,    //是否显示（使用）分页器
			"bProcessing":false,  //以指定当正在处理数据的时候，是否显示“正在处理”这个提示信息
			"bStateSave":false,
			"asStripClasses":['strip1', 'strip2', 'strip3']
		});
		oTable = $('#'+searchResultsTable).dataTable();
		oTableTools = new TableTools( oTable, {
			"buttons": ["copy", "csv","xls","pdf","print"],
			"sSwfPath":"jQuery/tableTools/copy_csv_xls_pdf.swf"
		});
		$('#'+exportRelDiv).append(oTableTools.dom.container);
		
	};
	
	return addExportDataBnt;
	
});