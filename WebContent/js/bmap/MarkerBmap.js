define(function(){
	function createMarker(BMaper,point,options){
		var marker = new BMap.Marker(point,options);
		BMaper.bmap.addOverlay(marker);
		return marker;
	}
	
	function createIcon(url,size,options){
		var icon = new BMap.Icon(url,size,options);
		return icon;
	}
	
	
	return {
		createMarker:createMarker,
		createIcon:createIcon
	}
});
