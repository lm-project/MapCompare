define(function(){
	var lastMapDisplay = "baiduMap",changeMapObj = {};
	
	var initIMap = function(AMaper,BMaper,SMaper){
		require(["imap/loadImap"],function(IMaper){
			changeMapObj.IMaper = IMaper;
			if($("#curLinkText").text()==="关闭联动"){
				AMaper.curLinkAmap.removeCurLinkAMap();
				AMaper.curLinkAmap.addCurLinkAMap(AMaper,BMaper,SMaper,IMaper);
				IMaper.curLinkImap.addCurLinkIMap(AMaper,IMaper.imap);
			}
		});
	};
	
	changeMapObj.changeMap = function(obj,AMaper,BMaper,SMaper,IMaper){
		var mapDisplay = obj.id;
		mapDisplay==="bMapBnt"?mapDisplay="baiduMap":mapDisplay==="sMapBnt"?mapDisplay="sosoMap":mapDisplay==="gMapBnt"?mapDisplay="gugeMap":mapDisplay="imgMap";
		if(lastMapDisplay===mapDisplay){return false;}
		$("#"+lastMapDisplay).css("display","none");
		$("#"+mapDisplay).css("display","block");
		lastMapDisplay = mapDisplay;
		if(IMaper===null&&mapDisplay==="imgMap"){
			initIMap(AMaper,BMaper,SMaper);
		}
		/*if(initGmap===0&&mapDisplay==="gMapBnt"){
		require(['gmap/initGmap'], function (){});	
		}*/
	};
	return changeMapObj;
	
});