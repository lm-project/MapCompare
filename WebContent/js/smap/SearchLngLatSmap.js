
define(function(){
	
	function addOverlayByLntLat(point,content,SMaper){
		SMaper.markerSmap.createMarker(SMaper,point);
		SMaper.lableSmap.createLabel(SMaper,point,content);
	}
	
	function searchLocationByLngLat(firstInputVal,secondInputVal,SMaper){
		SMaper.clearSmap(SMaper)
		//火星坐标
		var qq_point = new qq.maps.LatLng(secondInputVal,firstInputVal);
		addOverlayByLntLat(qq_point,"国家加密坐标",SMaper);
		//将火星坐标转为百度坐标
		qq.maps.convertor.translate(qq_point, 3, function(res){	
			addOverlayByLntLat(res[0],"百度坐标",SMaper);
			//将火星坐标转为gps坐标
			qq.maps.convertor.translate(qq_point,1, function(rs){
				addOverlayByLntLat(rs[0],"原始坐标",SMaper);
				SMaper.smap.fitBounds(new qq.maps.LatLngBounds(res[0],rs[0]));
			});
		});
		
	}
	return searchLocationByLngLat;
});
