define(function(){
	var clearBmap = function(bmap){
		bmap.clearOverlays();//清楚百度地图上的所有覆盖物;
		if($("#Bresult").children().html()!=undefined){
			 $("#Bresult").empty();
		}
	};
	return clearBmap;
});
