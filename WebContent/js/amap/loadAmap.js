define(
		[
         "amap/initAmap",
         "amap/streetViewAmap",
         "amap/searchCityAmap",
         "amap/changeLayerAmap",
         "amap/curLinkAmap",
         "amap/autoCompleteAmap",
         "amap/searchDistrict",
         "amap/searchNameAmap",
         "amap/SearchLngLatAmap",
         "amap/MarkerAmap",
         "amap/clearAmap",
         "amap/fullScreenAmap",
         "amap/addListenerAmap",
         '../common/identifyBrowser'
        ],
	    function(
	    		amap,
	    		apan,
	    		citySearchAmap,
	    		changeLayerAmap,
	    		curLinkAmap,
	    		autoCompleteAmap,
	    		searchDistrictAmap,
	    		searchNameAmap,
	    		searchLngLatAmap,
	    		MarkerAmap,
	    		clearAmap,
	    		fullScreenAmap,
	    		addListenerAmap,
	    		Sys
	    ){
			var AMaper = {};
			citySearchAmap(amap);
			AMaper.amap = amap;
			AMaper.apan = apan;
			AMaper.changeLayerAmap = changeLayerAmap;
			AMaper.curLinkAmap = curLinkAmap;
			AMaper.autoCompleteAmap = autoCompleteAmap;
			AMaper.districtSearchAmap = searchDistrictAmap;
			AMaper.searchNameAmap = searchNameAmap;
			AMaper.searchLngLatAmap = searchLngLatAmap;
			AMaper.MarkerAmap = MarkerAmap;
			AMaper.clearAmap = clearAmap;
			AMaper.fullScreenAmap = fullScreenAmap;
			addListenerAmap(AMaper,Sys);
			
			
			return AMaper;
		}
);
	
	

		
		
		
		

