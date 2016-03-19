define(function(){
	var layerTypeSmap = {},qq_trafficLayer = null,qqPanoLayer = null,getPointClickEventSmap = null;
	
	layerTypeSmap.normalLayer = function(SMaper){
		closePanoSmap(SMaper);  
		//smap.setOptions({ mapTypeId:qq.maps.MapTypeId.ROADMAP});
		SMaper.smap.setMapTypeId(qq.maps.MapTypeId.ROADMAP);
		if(qq_trafficLayer != null){
			qq_trafficLayer.setMap(null);
			qq_trafficLayer=null;
		}
	};
	
	layerTypeSmap.satelliteLayer = function(SMaper){
		closePanoSmap(SMaper);
		SMaper.smap.setMapTypeId(qq.maps.MapTypeId.HYBRID);
	};

	layerTypeSmap.realTrafficLayer = function(SMaper){
		closePanoSmap(SMaper);
	    qq_trafficLayer = new qq.maps.TrafficLayer();
		qq_trafficLayer.setMap(SMaper.smap);
	};
	
	layerTypeSmap.streetViewLayer = function(SMaper){
		qqPanoLayer = new qq.maps.PanoramaLayer();
		qqPanoLayer.setMap(SMaper.smap);
		getPointClickEventSmap = qq.maps.event.addListener(SMaper.smap,'click',function(evt){
			SMaper.span.SearchStreetViewSMap(evt.latLng,SMaper);
			
		});
	};
	var closePanoSmap = function(SMaper){
		//关闭街景层且移除街景点击事件
		if(qqPanoLayer!=null){
			qqPanoLayer.setMap(null);
			qqPanoLayer = null;
			qq.maps.event.removeListener(getPointClickEventSmap);
			qqPanoLayer = null;
		}
		//关闭搜搜街景
		if($('#divSosoPano').css("display")==="block"){
			$('#divSosoPano').css("display","none");
			if($('#divSosoMap').css("display") === "block"){
	    		 $('#smapStretchBnt').css("bottom","2px");
	    		 $('#smapStretchBnt').css("background-position","-40px -405px");
	    		 $('#divSosoMap').css("height","550px");
	    		 $('#divSosoMap').css("border-top","2px solid #ccc");
	    		 $('#divSosoPano').css("height","550px");
	    		 $('#divSosoPano').css("border-bottom","2px solid #ccc");
	    		 $('#hrSmap').css("display","none");
	    	}else{
	    		$('#divSosoMap').css("display","block");
	    	}
			var markers = SMaper.span.markers;
			for(var i = 0; i< markers.length; i++){
				markers[i].setMap(null);
			}
	    	$('#smapStretchBnt').css("display","none");
		}
		
	};
	return layerTypeSmap;
	
	
});
