
define(
		[
	        "bmap/initBmap",
	        "bmap/streetViewBmap",
	        "bmap/changeLayerBmap",
	        "bmap/curLinkBmap",
	        "bmap/SearchDistrictBmap",
	        "bmap/searchNameBmap",
	        "bmap/MarkerBmap",
	        "bmap/LableBmap",
	        "bmap/SearchLngLatBmap",
	        "bmap/clearBmap",
	        "bmap/fullScreenBmap",
	        "bmap/addListenerBmap"
        ],
        function(
        		bmap,
        		bpan,
        		changeLayerBmap,
        		curLinkBmap,
        		SearchDistrictBmap,
        		searchNameBmap,
        		markerBmap,
        		lableBmap,
        		searchLngLatBmap,
        		clearBmap,
        		fullScreenBmap,
        		addListenerBmap
        		){
		var BMaper = {};
		BMaper.bmap = bmap;
		BMaper.bpan = bpan;
		BMaper.changeLayerBmap = changeLayerBmap;
		BMaper.curLinkBmap = curLinkBmap;
		BMaper.districtSearchBmap = SearchDistrictBmap;
		BMaper.searchNameBmap = searchNameBmap;
		BMaper.markerBmap = markerBmap;
		BMaper.lableBmap = lableBmap;
		BMaper.searchLngLatBmap = searchLngLatBmap;
		BMaper.clearBmap = clearBmap;
		BMaper.fullScreenBmap = fullScreenBmap;
		addListenerBmap(BMaper);
		
		return BMaper;
	
		}

);

	



