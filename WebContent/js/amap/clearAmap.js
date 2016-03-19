define(function(){
	var clearAmap = function(amap){
		amap.clearMap();
		if($("#Aresult").children().html()!=undefined){
			 $("#Aresult").empty();
		}
	};
	return clearAmap;
});

/*MapCompare.AMaper.ClearAMap=function(){
	MapCompare.amapObj.clearMap();
	if($("#Aresult").children().html()!=undefined){
		 $("#Aresult").empty();
	}
	/*if($("#result1").children().html()!=undefined){
		tipArr = []; 
		resultSearTips = "";
		$("#result1").empty();//清空上次的搜素结果面板
	}
	if($("#Aresult").children().html()!=undefined){
		 resultStr = '';//将Aresult中插入的字符串设为空！
		 last_line = '';//
		 keyword='';//将视野内搜索关键字的字符串设为空！
		 resLine ="";//清空公交结果拼接string 
		 route_text=""; //清空驾车结果拼接string
		 $("#Aresult").empty();//清空上次的搜素结果面板
		// $("#exportRel").empty();//清空上次的搜素结果面板		
	}
	//清空鼠标增加标记
	 if(mousetoolAddMarker!=null){
		 mousetoolAddMarker.close( true);
		 mousetoolAddMarker=null;
	 }
	//关闭搜索提示框
	if(document.getElementById('result1').style.display="block"){
		document.getElementById('result1').style.display="none";
	}
	 	
};*/


