define(function(){
	var clearSmap = function(SMaper){
//		//清除综合搜索
//		searchService.clear();
//		//清除公交搜索
//		soso_taransfer.clear();
//		//清除驾车搜素
//		so_drive_roure.clear();
//		if($("#Soresult").children().html()!=undefined){
//			/* bd_markeres=[];
//			 bd_searchInfoWins=[];*/
//			 qq_resultStr='';
//			 qq_pagesRec_str='';
//			 $("body #Soresult").empty();
//		 }
		//清空地图上自己添加的覆盖物
		console.log("地图上覆盖物的数量："+SMaper.OverlaysArray.length);
		if(SMaper.OverlaysArray.length>0){
			var overlay;
			while(overlay = SMaper.OverlaysArray.pop()){
				overlay.setMap(null);
		    }
			SMaper.OverlaysArray.length = 0;
		}
	};
	return clearSmap;
});
