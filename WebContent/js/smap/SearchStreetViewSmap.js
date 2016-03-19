define(function (){
	var qqStreetView = {},latLng = null,
		lastDirect = 1,spanObj = null,SMaper = null,markers = [];
	/*
	 *改变小地图的的大小
	 */
	function  changeMinMapSize(em,oy){
		 var fy = em.pageY - oy;
		 var yPano = 350+fy,ySmap = 195-fy,b = 202-fy;
		 console.log("差值："+fy+"  街景的高度"+yPano +"  地图的高度："+ySmap);
		 if(ySmap<450&&ySmap>50){
			 $('#divSosoPano').css("height",yPano+"px");
			 $('#divSosoMap').css("height",ySmap+"px");
			 $('#smapStretchBnt').css("bottom",b+"px");
		 }
	}
	function showMinMap(){
		 $('#smapStretchBnt').css("bottom","202px");
		 $('#smapStretchBnt').css("background-position","-40px -386px");
		 $('#divSosoMap').css("height","195px");
		 $('#divSosoMap').css("border-top","");
		 $('#divSosoMap').css("display","block");
		 $('#divSosoPano').css("height","350px");
		 $('#divSosoPano').css("border-bottom","");
		 $('#hrSmap').css("display","block");
	}
	function hideMinMap(){
		 $('#smapStretchBnt').css("bottom","2px");
		 $('#smapStretchBnt').css("background-position","-40px -405px");
		 $('#divSosoMap').css("height","550px");
		 $('#divSosoMap').css("border-top","2px solid #ccc");
		 $('#divSosoMap').css("display","none");
		 $('#divSosoPano').css("height","550px");
		 $('#divSosoPano').css("border-bottom","2px solid #ccc");
		 $('#hrSmap').css("display","none");
	}
	function showStreetView(){
		if($('#divSosoPano').css("display")==="block"){
			 return;
		 }
		 $('#divSosoMap').css("display","none");
		 $('#divSosoPano').css("display","block");
		 $('#smapStretchBnt').css("display","block");
		 window.frames[2].document.onclick  = function(){
			 console.log("腾讯街景地图联动按钮！");
			 $('#divSosoMap').css("display")==="none" ? 
					 		showMinMap() : hideMinMap();
		 }
		 $('#hrSmap').on("mousedown",function(e){
			 $(document).on("mouseup",function(){
				 $("#divSosoPano,#divSosoMap").off("mousemove");
				 $(document).off("mouseup");
			 });
			 $('#divSosoPano,#divSosoMap').on("mousemove",function(ev){
				 changeMinMapSize(ev,e.pageY);
			 });
		 });
	}
	function clearMarker(){
		for(var i = 0; i<markers.length; i++){
			markers[i].setMap(null);
		}
		markers.length = 0;
	}
	function createIcon(sx,sy,ox,oy,ix,iy,url,mox,moy){
		return SMaper.markerSmap.markerImage(SMaper,url, new qq.maps.Size(sx,sy), 
				new qq.maps.Point(ox,oy), new qq.maps.Point(mox,moy));
	}
	
	function addMarker(sx,sy,ox,oy,url,ix,iy,mox,moy){
		console.log(sx+","+sy+","+ox+","+oy+","+url+","+ix+","+iy+","+mox+","+moy);
		console.log("markers的长度："+markers.length);
		if(markers.length >= 2){
			clearMarker();//清空覆盖物
		}
		var icon = createIcon(sx,sy,ox,oy,ix,iy,url,mox,moy);
		var marker = SMaper.markerSmap.createMarker(SMaper,latLng,icon,null,null,null,null,1,true);
		markers.push(marker);
		qq.maps.event.addListener(marker,'dragend',function(e){
			console.log("拖拽街景marker后的坐标："+e.latLng);
			qqStreetView.SearchStreetViewSMap(e.latLng,SMaper);
	    });
	}
	function getKnertenLocal(heading){
		var heading = spanObj.getPov().heading;
		return  heading >= 0   && heading < 15 || heading >= 345 && heading <= 360  ? -310 : 
			    heading >= 15  && heading < 45 ? -155 :
				heading >= 45  && heading < 75 ? -124 :
				heading >= 75  && heading < 105 ? -279:
				heading >= 105 && heading < 135 ? -93 :
				heading >= 135 && heading < 165 ? -62 :
				heading >= 165 && heading < 195 ? -339 :
				heading >= 195 && heading < 225 ? 0 :
				heading >= 225 && heading < 255 ? -31 :
				heading >= 255 && heading < 285 ? -248 :
				heading >= 285 && heading < 315 ? -221 :
				heading >= 315 && heading < 345 ? -190 :-1;
	}
	function getDisrectionLocal(knerten){
			knerten == -310 ? addMarker(70,33,37,45,"image/direction.png",70,33,35,33) :
			knerten == -155 ? addMarker(80,53,43,165,"image/direction.png",80,53,25,50) :
			knerten == -124 ? addMarker(85,76,60,290,"image/direction.png",85,76,11,58) :
			knerten == -279 ? addMarker(85,76,60,440,"image/direction.png",85,76,13,52) :
			knerten == -93  ? addMarker(55,100,60,540,"image/direction.png",55,100,10,60) :
			knerten == -62  ? addMarker(75,55,50,710,"image/direction.png",75,55,20,35) :
			knerten == -339 ? addMarker(75,55,35,855,"image/direction.png",75,55,38,20) :
			knerten == 0    ? addMarker(65,60,25,1000,"image/direction.png",65,60,45,28) :
			knerten == -31  ? addMarker(65,60,25,1130,"image/direction.png",65,60,45,30) :
			knerten == -248 ? addMarker(35,70,45,1265,"image/direction.png",35,70,25,45) :
			knerten == -221 ? addMarker(65,70,15,1400,"image/direction.png",65,70,55,55) :
			knerten == -190 ? addMarker(75,70,15,1530,"image/direction.png",75,70,55,65) : false;
	}
	
	function addMarkerWhenChangePov(lastPoint){
    	var knerten = getKnertenLocal();
    	console.log(lastDirect+"==================="+knerten);
		if(lastDirect === knerten){
			if( latLng !== lastPoint){
				for(var i = 0; i<markers.length; i++){
					markers[i].setPosition(latLng);
				}
			}
			return;
		}
		lastDirect = knerten;
		getDisrectionLocal(knerten);
		addMarker(24,45,-knerten,0,"image/knerten.png",24,45,12,45);
	}
	
	function changePositionEve(){
		 var lastPoint = latLng;
    	 console.log("之前的坐标："+ lastPoint);
    	 var spapPosition = spanObj.getPosition();
    	 console.log("之后的坐标：" + spapPosition);
    	 latLng = spapPosition == null ? latLng : spapPosition;
    	 SMaper.smap.setCenter(latLng);
    	 addMarkerWhenChangePov( lastPoint );
	}
	function changePvoEve(){
		 addMarkerWhenChangePov( latLng );
	}
	function resultPanoramaService(hasPano){
		if(hasPano==null){
			alert("腾讯在查询点500米内不包含街景");
			return;
		}
		showStreetView();
		$("#divSosoPano").empty();//清空街景容
		spanObj = new qq.maps.Panorama(divSosoPano,{disableMove:false,
					addressControl:true,
					photoTimeControl:true,
					pov:{
						heading:270,//查看器视线与正北方的水平夹角, 以度为单位。
						pitch:0   //查看器视线与地面的夹角, 以度为单位
					},
					zoom:1,
					pano:hasPano.svid
				});
		
		qqStreetView.spanObj = spanObj;
		$('#sosoZoom').html(spanObj.getZoom());
		//给缩放级别添加事件
		qq.maps.event.addListener(spanObj,'zoom_changed',function(){
			$('#sosoZoom').html(spanObj.getZoom());
		});	
		qq.maps.event.addListener(spanObj,'position_changed',changePositionEve);
		qq.maps.event.addListener(spanObj,'pov_changed',changePvoEve);
		if($("#curLinkText").text()==="关闭联动"){
			SMaper.curLinkSmap.addStreetViewLinkSMap();
		}
	}
	qqStreetView.SearchStreetViewSMap = function(point,SMapers){
		lastDirect = 1;
		latLng = point;
		SMaper = SMapers;
		var qqPanoService = new qq.maps.PanoramaService();
		qqPanoService.getPano(point, 500, function(hasPano){
			resultPanoramaService(hasPano);
		});
	};	
	qqStreetView.markers = markers;
	return qqStreetView;
		
		
});

