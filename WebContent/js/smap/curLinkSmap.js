define(function() {
	var curLinkObjSMap = {},
    	qq_zoom_changed = null,
	    qq_Dragend = null,
	    qq_mouseDown = null,
		changePositonPano = null,
		mouseDownLatLng = null,
		AMaper = null,SMaper = null;
	var changeZoomSMap = function(){
		if($("#divAmapPano").css("display")==="block"){return;}
		AMaper.amap.setZoom(SMaper.smap.getZoom());
	};
	var dragendSMap = function(){
		if($("#divAmapPano").css("display")==="block"){
			AMaper.curLinkAmap.doMapEvent = "NO";
			var amapPoints = new AMap.LngLat(mouseDownLatLng.getLng(),mouseDownLatLng.getLat());
			AMaper.apan.apanObj.setPosition(amapPoints);
		}else {
			var qq_center_point=SMaper.smap.getCenter();
			var amapPoint = new AMap.LngLat(qq_center_point.getLng(),qq_center_point.getLat());
			AMaper.amap.panTo(amapPoint);
		}
	};
	var panoPositionSMap = function(){
		if(AMaper.curLinkAmap.doMapEvent==="NO"){
			AMaper.curLinkAmap.doMapEvent = "YES";
			return;
		}	
		var soso_pano_latlng = SMaper.span.spanObj.getPosition();//获取当前场景点的经纬度信息
		var amapPanoPoint = new AMap.LngLat(soso_pano_latlng.getLng(),soso_pano_latlng.getLat());
		if(document.getElementById("divAmapPano").style.display=="block"){
			return;
			//panoObj.setPosition(amapPanoPoint);
		}else {		
			AMaper.amap.panTo(amapPanoPoint);
		}
	};
	curLinkObjSMap.addStreetViewLinkSMap = function(){
		console.log("腾讯街景对象为：" + SMaper.span.spanObj);
		if(SMaper.span.spanObj===undefined || SMaper.span.spanObj === null){return;}
		changePositonPano = qq.maps.event.addListener(SMaper.span.spanObj,'position_changed',panoPositionSMap);
	};
	curLinkObjSMap.removeStreetViewLinkSMap = function(){
		if(changePositonPano===null){return;}
		qq.maps.event.removeListener(changePositonPano);
		changePositonPano = null;
	};
	var mouseDownSMap = function(e){
		mouseDownLatLng = e.latLng;
	};
	curLinkObjSMap.addCurLinkSMap = function (AMapers,SMapers){
		AMaper = AMapers;SMaper = SMapers;
		qq_zoom_changed = qq.maps.event.addListener(SMaper.smap,"zoom_changed",changeZoomSMap);
		qq_Dragend= qq.maps.event.addListener(SMaper.smap,"dragend",dragendSMap);
		qq_mouseDown = qq.maps.event.addListener(SMaper.smap,"mousedown",mouseDownSMap);
		curLinkObjSMap.addStreetViewLinkSMap();
	};
	curLinkObjSMap.removeCurLinkSMap = function (){
		qq.maps.event.removeListener(qq_zoom_changed);
		qq.maps.event.removeListener(qq_Dragend);
		qq.maps.event.removeListener(qq_mouseDown);
		curLinkObjSMap.removeStreetViewLinkSMap();
	};
	
	return curLinkObjSMap;


});


