define(function(){
	
	
	markerObj.searchMarkerAMap = function(pois){
		var poisLength = pois.length;
		for(var i = 0;i<poisLength; i++){
			var lngLat = pois[i].location; 
			var markerOption = {  
					map:MapCompare.amapObj,  
					icon:"http://webapi.amap.com/images/" + (i + 1) + ".png",  
					position:new AMap.LngLat(lngLat.getLng(),lngLat.getLat())  
			};  
			createMarker(markerOption);
		}
		
	};

	 return markerObj;
});

	

		
		
		
		

