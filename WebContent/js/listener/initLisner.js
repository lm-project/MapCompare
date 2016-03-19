/*******************************地图切换************************************************/
var changeMapFun=function(mapDisplay){
	var mapHide="";
	mapHide=getMapDisplay();
	mapDisplay==="bMapBnt"?mapDisplay="baiduMap":mapDisplay==="sMapBnt"?mapDisplay="sosoMap":mapDisplay==="gMapBnt"?mapDisplay="gugeMap":mapDisplay="imgMap";
	if(mapHide===mapDisplay)return false;
	getDomId(mapHide).style.display="none";
	getDomId(mapDisplay).style.display="block";
		
};