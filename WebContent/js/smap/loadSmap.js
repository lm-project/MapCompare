define(
	[
	 	"smap/initSmap",
	 	"smap/SearchStreetViewSmap",
	 	"smap/changeLayerSmap",
	 	"smap/curLinkSmap",
	 	"smap/SearchDistrictSmap",
	 	"smap/searchNameSmap",
	 	"smap/SearchLngLatSmap",
		"smap/SearchBusRouteSmap",
	 	"smap/SearchDriveRouteSmap",
	 	"smap/MarkerSmap",
	 	"smap/LableSmap",
	 	"smap/PolygonSmap",
	 	"smap/clearSmap",
	 	"smap/fullScreenSmap",
	 	"smap/addListenerSmap"
	 ],function(
			 smap,
			 searchStreetViewSmap,
			 changeLayerSmap,
			 curLinkSmap,
			 searchDistrictSmap,
			 searchNameSmap,
			 searchLngLatSmap,
			 searchBusRouteSmap,
			 searchDriveRouteSmap,
			 markerSmap,
			 lableSmap,
			 polygonSmap,
			 clearSmap,
			 fullScreenSmap,
			 addListenerSmap
		){
		var SMaper = {};
		SMaper.OverlaysArray = [];
		SMaper.smap = smap;
		SMaper.span = searchStreetViewSmap;
		SMaper.changeLayerSmap = changeLayerSmap;
		SMaper.curLinkSmap = curLinkSmap;
		SMaper.districtSearchSmap = searchDistrictSmap;
		SMaper.searchNameSmap = searchNameSmap;
		SMaper.searchLngLatSmap = searchLngLatSmap;
		SMaper.searchBusRouteSmap = searchBusRouteSmap;
		SMaper.searchDriveRouteSmap = searchDriveRouteSmap;
		SMaper.markerSmap = markerSmap;
		SMaper.lableSmap = lableSmap;
		SMaper.polygonSmap = polygonSmap;
		SMaper.clearSmap = clearSmap;
		SMaper.fullScreenSmap = fullScreenSmap;
		addListenerSmap(SMaper);
		return SMaper;
	}

);


