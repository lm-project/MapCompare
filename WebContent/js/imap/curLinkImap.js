define(function(){
	
	var curLinkObjIMap = {},AMaper = null,imap = null;
	var changImapEvent = function (){
		if(AMaper.curLinkAmap.doMapEvent==="NO"){AMaper.curLinkAmap.doMapEvent = "YES";return;}
		var imgCenterLonLat=imap.getCenter();
		var imgLon=imgCenterLonLat.lon;
		var imgLat=imgCenterLonLat.lat;
		var qq_point=new qq.maps.LatLng(imgLat,imgLon);
		if($("#divAmapPano").css("display")==="block"){
			AMaper.curLinkAmap.doMapEvent = "NO";
			qq.maps.convertor.translate(qq_point,1,function(res){
				var gd_point=new AMap.LngLat(res[0].lng,res[0].lat);
				AMaper.apan.apanObj.setPosition(gd_point);
			});
		}else{
			AMaper.amap.setZoom(imap.getZoom());
			qq.maps.convertor.translate(qq_point,1,function(res){
				var gd_point=new AMap.LngLat(res[0].lng,res[0].lat);
				AMaper.amap.panTo(gd_point);
			});
		}
			
	};
	curLinkObjIMap.addCurLinkIMap = function(aMap,iMap){
		AMaper = aMap;
		imap = iMap;
		imap.events.register('moveend',imap,changImapEvent);	
	};
	curLinkObjIMap.removeCurLinkIMap = function(){
		imap.events.unregister('moveend',imap,changImapEvent);	
	};
	
	return curLinkObjIMap;
});

