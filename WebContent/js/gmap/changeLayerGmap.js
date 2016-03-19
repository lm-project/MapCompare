
MapCompare.ChangeLayerGMap = function (){
	var layerTypeGmap = {};
	layerTypeGmap.generalMaps = function(){
		alert(1);
		//gmap.setMapTypeId(google.maps.MapTypeId.ROADMAP);//谷歌
	};
	layerTypeGmap.satelliteMaps = function(){
		alert(2);
	};
	layerTypeGmap.threeDMaps = function(){
		alert(3);
	};
	layerTypeGmap.threeDMaps = function(){
		alert(3);
	};
	
	return layerTypeGmap;
}();