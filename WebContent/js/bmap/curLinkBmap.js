define(function() {
	var curLinkObjBMap = {},addEvented = 0;
	var AMaper = null,BMaper = null;
	var bdZoomendFun = function(){
			if($("#divAmapPano").css("display")==="block"){return;};
			AMaper.amap.setZoom(BMaper.bmap.getZoom());			
		};
	var	bdDragendFun = function(e){
			var bd_center_point = BMaper.bmap.getCenter();
			var qq_point = new qq.maps.LatLng(bd_center_point.lat,bd_center_point.lng);
			var qqPoint = new qq.maps.LatLng(e.point.lat,e.point.lng);
			if($("#divAmapPano").css("display")==="block"){
				AMaper.curLinkAmap.doMapEvent = "NO";
				qq.maps.convertor.translate(qqPoint,3, function(res){
					var bd_lat_lng =new AMap.LngLat(res[0].getLng(),res[0].getLat());
					AMaper.apan.apanObj.setPosition(bd_lat_lng);
				});
				
			}else {			
				qq.maps.convertor.translate(qq_point,3, function(res){
					var bd_lat_lng =new AMap.LngLat(res[0].getLng(),res[0].getLat()) ;
					AMaper.amap.panTo(bd_lat_lng);
				});
			};	
		};
	var panoPositionchangedBmap = function(){
		 if(AMaper.curLinkAmap.doMapEvent==="NO"){
			 AMaper.curLinkAmap.doMapEvent = "YES";
			 return;}
		 var bdPanopoit = BMaper.bpan.bpanObj.getPosition();
		 var qq_point=new qq.maps.LatLng(bdPanopoit.lat,bdPanopoit.lng);
		 if($("#divAmapPano").css("display")==="block"){
			 return;
		 }else {			
			qq.maps.convertor.translate(qq_point,3, function(res){
				AMaper.amap.panTo(new AMap.LngLat(res[0].getLng(),res[0].getLat()));
			});
		}
	};
	curLinkObjBMap.addStreetViewLinkBMap = function(){
		console.log("百度街景对象为："+BMaper.bpan.bpanObj);
		if(BMaper.bpan.bpanObj===undefined || BMaper.bpan.bpanObj === null){return;}
		BMaper.bpan.bpanObj.addEventListener('position_changed',panoPositionchangedBmap);
		addEvented = 1;
	};
	curLinkObjBMap.removeStreetViewLinkBMap = function(){
		if(addEvented===0){return;}
		BMaper.bpan.bpanObj.removeEventListener('position_changed',panoPositionchangedBmap);
		addEvented = 0;
	};
	
	curLinkObjBMap.addCurLinkBMap = function (AMapers,BMapers){
		AMaper = AMapers;
		BMaper = BMapers;
		BMaper.bmap.addEventListener("dragend",bdDragendFun);
		BMaper.bmap.addEventListener("zoomend",bdZoomendFun);
		curLinkObjBMap.addStreetViewLinkBMap();
	};
	curLinkObjBMap.removeCurLinkBMap = function (){
		BMaper.bmap.removeEventListener("dragend",bdDragendFun);
		BMaper.bmap.removeEventListener("zoomend",bdZoomendFun);
		curLinkObjBMap.removeStreetViewLinkBMap();
	};
	
	return curLinkObjBMap;
	

});

