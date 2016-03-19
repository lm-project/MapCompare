define(function(){
	var layerTypeBmap = {},bd_trafficLayer = null,bdPanoLayer = null,BMapers = null;
	
	layerTypeBmap.normalLayer = function(BMaper){
		BMaper.bmap.setMapType(BMAP_NORMAL_MAP);//百度地图
		if(bd_trafficLayer != null){
			BMaper.bmap.removeTileLayer(bd_trafficLayer);
			bd_trafficLayer = null;
		}
		closeSpanBmap(BMaper);
				
	};
	
	layerTypeBmap.satelliteLayer = function(BMaper){
		closeSpanBmap(BMaper);
		BMaper.bmap.setMapType(BMAP_HYBRID_MAP);
	};
	
	layerTypeBmap.threeDLayer = function(BMaper){
		closeSpanBmap(BMaper);
		BMaper.bmap.setMapType(BMAP_PERSPECTIVE_MAP);//百度地图
	};
	
	layerTypeBmap.realTrafficLayer = function(BMaper){
		closeSpanBmap(BMaper);
		bd_trafficLayer = new BMap.TrafficLayer();//创建交通流量图层实例    
		BMaper.bmap.addTileLayer(bd_trafficLayer);
	};
	function getClickPointFun(e){
		BMapers.bpan.SearchStreetViewBMap(e.point,BMapers);
	}
	layerTypeBmap.streetViewLayer = function(BMaper){
		BMapers = BMaper;
		var bmap = BMaper.bmap;
		bdPanoLayer = new BMap.PanoramaCoverageLayer();		
		bmap.addTileLayer(bdPanoLayer);
		bmap.addEventListener("click",getClickPointFun);
	};
	 var closeSpanBmap = function(BMaper){
		 if(bdPanoLayer != null){
			 BMaper.bmap.removeTileLayer(bdPanoLayer);//关闭街景层
			 BMaper.bmap.removeEventListener("click",getClickPointFun);
			 bdPanoLayer=null;
		    }
		  if($('#divBaiduPano').css("display")==="block"){
			  $('#divBaiduPano').css("display","none");
			  if($('#divBaiduMap').css("display") === "block"){
		    		 $('#bmapStretchBnt').css("bottom","2px");
		    		 $('#bmapStretchBnt').css("background-position","-40px -405px");
		    		 $('#divBaiduMap').css("height","550px");
		    		 $('#divBaiduMap').css("border-top","2px solid #ccc");
		    		 $('#divBaiduPano').css("height","550px");
		    		 $('#divBaiduPano').css("border-bottom","2px solid #ccc");
		    		 $('#hrBmap').css("display","none");
		    	}else{
		    		$('#divBaiduMap').css("display","block");
		    	}
				var markers = BMaper.bpan.markers;
				for(var i = 0; i< markers.length; i++){
					BMaper.bmap.removeOverlay(markers[i]);
				}
		    	$('#bmapStretchBnt').css("display","none");
		    }
	 };
	
	
	return layerTypeBmap;
});

