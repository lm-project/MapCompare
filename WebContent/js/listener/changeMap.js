/*******************************地图切换************************************************/
MapCompare.changeMapFun=function(mapDisplay){
	var getDomId = MapCompare.init.getDomId;
	var mapHide = getDomId('gugeMap').style.display=="block"?"gugeMap":getDomId('sosoMap').style.display=="block"?"sosoMap":getDomId('baiduMap').style.display=="block"?"baiduMap":"imgMap";
	mapDisplay==="bMapBnt"?mapDisplay="baiduMap":mapDisplay==="sMapBnt"?mapDisplay="sosoMap":mapDisplay==="gMapBnt"?mapDisplay="gugeMap":mapDisplay="imgMap";
	if(mapHide===mapDisplay)return false;
	getDomId(mapHide).style.display="none";
	getDomId(mapDisplay).style.display="block";
};

