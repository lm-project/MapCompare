
define(function(){
	
	function addOverlayByLntLat(point,content,BMaper){
		BMaper.markerBmap.createMarker(BMaper,point,null);
		BMaper.lableBmap.createLabel(BMaper,content,{position:point});
	}
	
	function searchLocationByLngLat(firstInputVal,secondInputVal,BMaper){
		var points = [];
		BMaper.clearBmap(BMaper.bmap);
		var bd_point = new BMap.Point(firstInputVal,secondInputVal);
		points.push(bd_point);
		addOverlayByLntLat(bd_point,"百度坐标",BMaper);
		BMap.Convertor.translate(bd_point,2,function(point){
			points.push(point);
			addOverlayByLntLat(point,"国家加密坐标",BMaper);
		});	 
		BMap.Convertor.translate(bd_point,0,function(point){
			points.push(point);
			addOverlayByLntLat(point,"原始坐标",BMaper);
			BMaper.bmap.setViewport(points);
		});	 
	}
	return searchLocationByLngLat;
});
