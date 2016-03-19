
define(function() {
	var curLinkObjAMap = {},
		gdChangeZoomEvent = null,
		gdDragendMapEvent = null,
		gdChangePanoEvent = null,
		gd_povChangeEvent = null,
		gd_MousedownEvent = null,
		mouseDownLngLat = null,
		AMaper = null,BMaper = null,SMaper = null,IMaper = null;
		curLinkObjAMap.doMapEvent = "YES";
	var changeZoomMapEvent = function(){
		var gd_zoom=AMaper.amap.getZoom();
		if($('#baiduMap').css("display")==="block"&&$('#divBaiduMap').css("display")==="block"){
			BMaper.bmap.setZoom(gd_zoom);				//百度
		}else if($('#sosoMap').css("display")==="block"&&$('#divSosoMap').css("display")==="block"){
			SMaper.smap.setZoom(gd_zoom);				//soso	
		}else if($('#gugeMap').css("display")==="block"&&$('#divGugeMap').css("display")==="block"){
			//gmap.setZoom(gd_zoom);			 	//谷歌
		}else if($('#imgMap').css("display")==="block"){
			curLinkObjAMap.doMapEvent = "NO";
			IMaper.imap.zoomTo(gd_zoom);
		}
		
		
	};
	
	
	var doDragendMapEvent = function(){
		
		var gd_center_point = AMaper.amap.getCenter();
		var gdCenterLng = gd_center_point.getLng();
		var gdCenterLat = gd_center_point.getLat();
		if($('#baiduMap').css("display")==="block"){
			if($('#divBaiduPano').css("display")==="block"){
				curLinkObjAMap.doMapEvent = "NO";
				var bd_Point = new BMap.Point(mouseDownLngLat.getLng(),mouseDownLngLat.getLat());
				BMap.Convertor.translate(bd_Point,2,function (point){
					BMaper.bpan.bpanObj.setPosition(point);	
				});	
			}else{	
				var bd_Point = new BMap.Point(gdCenterLng,gdCenterLat);
				BMap.Convertor.translate(bd_Point,2,function (point){
					BMaper.bmap.panTo(point);
				});	
			}
		}else if($('#sosoMap').css("display")==="block"){
			if($('#divSosoPano').css("display")==="block"){
				curLinkObjAMap.doMapEvent = "NO";
				var sosoLatLng = new qq.maps.LatLng(mouseDownLngLat.getLat(),mouseDownLngLat.getLng());
				SMaper.span.SearchStreetViewSMap(sosoLatLng,SMaper);
			}else{	
				var sosoLatLng  = new qq.maps.LatLng(gdCenterLat,gdCenterLng);
				SMaper.smap.panTo(sosoLatLng); 		 
			}			
		}else if($('#gugeMap').css("display")==="block"){
			//gmap.panTo(gd_center_point); 
		}else if($('#imgMap').css("display")==="block"){
			curLinkObjAMap.doMapEvent = "NO";
			IMaper.imap.panTo(new OpenLayers.LonLat(gdCenterLng,gdCenterLat));
		}
	};
	
	
	var changePano = function(){
		if(curLinkObjAMap.doMapEvent === "NO"){curLinkObjAMap.doMapEvent = "YES";return;}
		var gd_pano_lnglat = AMaper.apan.apanObj.getPosition();		//获取当前场景点的经纬度信息
		var gdpano_lng = gd_pano_lnglat.getLng();
		var gdpano_lat = gd_pano_lnglat.getLat();
		var qqPanoPoint = new qq.maps.LatLng(gdpano_lat,gdpano_lng);
		var bd_pano_Point = new BMap.Point(gdpano_lng,gdpano_lat);	
		if($('#baiduMap').css("display")==="block"){
			if($('#divBaiduPano').css("display")==="block"){
				BMap.Convertor.translate(bd_pano_Point,2,function (point){
					BMaper.bpan.bpanObj.setPosition(point);
				});	
			}else{	
				BMap.Convertor.translate(bd_pano_Point,2,function (point){
					BMaper.bmap.panTo(point);	 		 
				});	
			}
		}else if($('#sosoMap').css("display")==="block"){
			if($('#divSosoPano').css("display")==="block"){
				SMaper.span.SearchStreetViewSMap(qqPanoPoint,SMaper);
			}else{				
				SMaper.smap.panTo(qqPanoPoint); 		 
			}			
		}else if($('#gugeMap').css("display")==="block"){
			//gmap.panTo(gd_center_point); 
		}else if($('#imgMap').css("display")==="block"){
				curLinkObjAMap.doMapEvent = "NO";
				IMaper.imap.panTo(new OpenLayers.LonLat(gdpano_lng,gdpano_lat));
			}
	};
	
	var changePov = function(){
		var heading = AMaper.apan.apanObj.getPov().heading;
		var pitch = AMaper.apan.apanObj.getPov().pitch;
		if($('#sosoMap').css("display")==="block"&&$('#divSosoPano').css("display")==="block"){
			SMaper.span.spanObj.setPov({  
	            heading: heading,  
	            pitch: pitch 
	      }); //调整水平视线      
		}else if($('#baiduMap').css("display")==="block"&&$('#divBaiduPano').css("display")==="block"){
			BMaper.bpan.bpanObj.setPov({  
	            heading: heading,  
	            pitch: pitch 
	      }); //调整水平视线      
		}		 
	};
	curLinkObjAMap.addStreetViewLinkAMap = function(){
		if(AMaper.apan.apanObj===undefined){return;}
		gdChangePanoEvent = AMap.event.addListener(AMaper.apan.apanObj,'panochange',changePano);
		gd_povChangeEvent = AMap.event.addListener(AMaper.apan.apanObj,'povchange',	changePov);
		
	};
	
	curLinkObjAMap.removeStreetViewLinkAMap = function(){
		if(gdChangePanoEvent===null){return;}
		AMap.event.removeListener(gdChangePanoEvent);
		AMap.event.removeListener(gd_povChangeEvent);
		gdChangePanoEvent = null;
	};
	var doMousedownEvent = function(e){
		 mouseDownLngLat = e.lnglat;   
	};
	curLinkObjAMap.addCurLinkAMap = function (AMapers,BMapers,SMapers,IMapers){
		AMaper = AMapers;
		BMaper = BMapers;
		SMaper = SMapers;
		IMaper = IMapers;
		gdChangeZoomEvent = AMap.event.addListener(AMaper.amap,"zoomend",changeZoomMapEvent);
		gdDragendMapEvent = AMap.event.addListener(AMaper.amap,"dragend",doDragendMapEvent);	
		gd_MousedownEvent = AMap.event.addListener(AMaper.amap,'mousedown',doMousedownEvent);
		curLinkObjAMap.addStreetViewLinkAMap();
	};
	
	curLinkObjAMap.removeCurLinkAMap = function (){
		AMap.event.removeListener(gdChangeZoomEvent);
		AMap.event.removeListener(gdDragendMapEvent);
		AMap.event.removeListener(gd_MousedownEvent);
		curLinkObjAMap.removeStreetViewLinkAMap();
		
	};
		return curLinkObjAMap;


});
