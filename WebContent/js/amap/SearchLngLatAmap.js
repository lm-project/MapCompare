
define(function(){
	
	function addOverlayByLntLat(point,content,AMaper){
		var markerOption={
				map:AMaper.amap,
				position:point,
				offset:new AMap.Pixel(-10, -35)	,
		};
		var labelOption={
				map:AMaper.amap,
				position:point,
				content:"<div style='min-width:100px;border:1px solid blue;background:white;text-align:center;'>"+content+"</div>",
				offset:new AMap.Pixel(0,0)	,
		};
		new AMap.Marker(markerOption);//在该点添加marker
		new AMap.Marker(labelOption); //在该点添加marker	
	}
	
	function searchLocationByLngLat(firstInputVal,secondInputVal,AMaper){
		AMaper.clearAmap(AMaper.amap);
		var gd_point = new AMap.LngLat(firstInputVal,secondInputVal);
		var qq_point = new qq.maps.LatLng(secondInputVal,firstInputVal);
		//火星坐标
		addOverlayByLntLat(gd_point,"国家加密坐标",AMaper);
		//用腾讯接口将火星坐标转为百度坐标
		qq.maps.convertor.translate(qq_point, 3, function(res){
			var bd_point = new AMap.LngLat(res[0].getLng(),res[0].getLat());
			addOverlayByLntLat(bd_point,"百度坐标",AMaper);
			//用腾讯接口将火星坐标转为gps坐标
			qq.maps.convertor.translate(qq_point,1, function(res){
				var gps_point = new AMap.LngLat(res[0].getLng(),res[0].getLat());
				addOverlayByLntLat(gps_point,"原始坐标",AMaper);
				AMaper.amap.setFitView();
			});
		});
	}
	return searchLocationByLngLat;
});
