define(function(){
	
	//加载腾讯地图
	var smap = null;
	smap = new qq.maps.Map(document.getElementById("divSosoMap"), {       
		center: new qq.maps.LatLng(39.929986,116.395645), // 地图的中心地理坐标。
		zoom:12,
		scaleControl: true
	});
	
	

	$('#sosoZoom').text(smap.getZoom());
	qq.maps.event.addListener(smap, 'zoom_changed',function(){
		$('#sosoZoom').text(smap.getZoom());
	});
	return smap;
	
	
});

/*MapCompare.SMaper.InitSMap=function(){
		//加载腾讯地图
		var smap = null;
		smap = new qq.maps.Map(document.getElementById("divSosoMap"), {       
			center: new qq.maps.LatLng(39.929986,116.395645), // 地图的中心地理坐标。
			zoom:12,
		});
		
		MapCompare.smapObj = smap;
	
		$('#sosoZoom').text(MapCompare.smapObj.getZoom());
		qq.maps.event.addListener(MapCompare.smapObj, 'zoom_changed',function(){
			$('#sosoZoom').text(MapCompare.smapObj.getZoom());
		});
		
   
}();

*/