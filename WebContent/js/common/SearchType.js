define(function(){
	
	var coordSearch = function(){
		var coorPolicy=document.getElementById("coorPolicy");
		var coorPolicyVal=coorPolicy[coorPolicy.selectedIndex].value;
		//街景。
		if(coorPolicyVal==="streeView"){
			policyCoor = 1;
		}
	
		
	};
	function searchPlace(keywordsVal,AMaper, BMaper, SMaper,indexPage,addExportDataBnt,searchCity){
		AMaper.searchNameAmap(searchCity,keywordsVal,AMaper,indexPage,addExportDataBnt);
		$("#baiduMap").css("display")==="block" ? 
			BMaper.searchNameBmap(searchCity,keywordsVal,BMaper,indexPage,addExportDataBnt) : 
				$("#sosoMap").css("display")==="block" ? 
					SMaper.searchNameSmap (searchCity,keywordsVal,SMaper,indexPage,addExportDataBnt) :false;
		return;
	}
	function searchStreetView(keywordsVal,AMaper, BMaper, SMaper){
		AMaper.searchNameAmap(searchCity,keywordsVal,AMaper,indexPage,addExportDataBnt);
		$("#baiduMap").css("display")==="block" ? 
			BMaper.searchNameBmap(searchCity,keywordsVal,BMaper,indexPage,addExportDataBnt) : 
				$("#sosoMap").css("display")==="block" ? 
					SMaper.searchNameSmap (searchCity,keywordsVal,SMaper,indexPage,addExportDataBnt) :false;
		return;
	}
	function searchBusRoute(firstInputVal ,secondInputVal,AMaper, BMaper, SMaper){
		$("#baiduMap").css("display")==="block" ? 
				BMaper.searchLngLatBmap(firstInputVal ,secondInputVal,BMaper) : 
					$("#sosoMap").css("display")==="block" ? 
							SMaper.searchBusRouteSmap(firstInputVal ,secondInputVal,SMaper):false;
	}
	function searchDriveRoute(firstInputVal ,secondInputVal,AMaper, BMaper, SMaper){
		$("#baiduMap").css("display")==="block" ? 
				BMaper.searchLngLatBmap(firstInputVal ,secondInputVal,BMaper) : 
					$("#sosoMap").css("display")==="block" ? 
							SMaper.searchDriveRouteSmap(firstInputVal ,secondInputVal,SMaper):false;

	}
	function searchCoordinate(firstInputVal ,secondInputVal, AMaper, BMaper, SMaper){
		if( firstInputVal.match(/^(:?(:?\d+.\d+)|(:?\d+))$/)==null ||
			secondInputVal.match(/^(:?(:?\d+.\d+)|(:?\d+))$/)==null||
			firstInputVal<0||firstInputVal>180||secondInputVal<0||secondInputVal>90) {
			alert("坐标输入有误！");
			return;
		}
		AMaper.searchLngLatAmap(firstInputVal ,secondInputVal,AMaper);
		$("#baiduMap").css("display")==="block" ? 
			BMaper.searchLngLatBmap(firstInputVal ,secondInputVal,BMaper) : 
				$("#sosoMap").css("display")==="block" ? 
					SMaper.searchLngLatSmap(firstInputVal ,secondInputVal,SMaper):false;
	}
	
	return {
			searchPlace:searchPlace,
			searchStreetView:searchStreetView,
			searchBusRoute:searchBusRoute,
			searchDriveRoute:searchDriveRoute,
			searchCoordinate:searchCoordinate
		}
	
});