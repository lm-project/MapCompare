define(function(){
	
	var bdStreetView = {},BMaper = null, bpanObj = null, point = null,
		lastDirect = 1,markers = [];
	/*
	 *改变小地图的的大小
	 */
	function  changeMinMapSize(em,oy){
		 var fy = em.pageY - oy;
		 var yPano = 350+fy,yBmap = 195-fy,b = 202-fy;
		 console.log("差值："+fy+"  街景的高度"+yPano +"  地图的高度："+yBmap);
		 if(yBmap<450&&yBmap>50){
			 $('#divBaiduPano').css("height",yPano+"px");
			 $('#divBaiduMap').css("height",yBmap+"px");
			 $('#bmapStretchBnt').css("bottom",b+"px");
		 }
	}
	function showMinMap(){
		 $('#bmapStretchBnt').css("bottom","202px");
		 $('#bmapStretchBnt').css("background-position","-40px -386px");
		 $('#divBaiduMap').css("height","195px");
		 $('#divBaiduMap').css("border-top","");
		 $('#divBaiduMap').css("display","block");
		 $('#divBaiduPano').css("height","350px");
		 $('#divBaiduPano').css("border-bottom","");
		 $('#hrBmap').css("display","block");
	}
	function hideMinMap(){
		 $('#bmapStretchBnt').css("bottom","2px");
		 $('#bmapStretchBnt').css("background-position","-40px -405px");
		 $('#divBaiduMap').css("height","550px");
		 $('#divBaiduMap').css("border-top","2px solid #ccc");
		 $('#divBaiduMap').css("display","none");
		 $('#divBaiduPano').css("height","550px");
		 $('#divBaiduPano').css("border-bottom","2px solid #ccc");
		 $('#hrBmap').css("display","none");
	}
	function showAmapPano(){
		 if($('#divBaiduPano').css("display")==="block"){
			 return;
		 }
		 $('#divBaiduMap').css("display","none");
		 $('#bmapStretchBnt').css("display","block");
		 $('#divBaiduPano').css("display","block");
		 window.frames[1].document.onclick  = function(){
			 $('#divBaiduMap').css("display")==="none" ? 
					 		showMinMap() : hideMinMap();
		 }
		
		 $('#hrBmap').on("mousedown",function(e){
			 $(document).on("mouseup",function(){
				 $("#divBaiduPano,#divBaiduMap").off("mousemove");
				 $(document).off("mouseup");
			 });
			 $('#divBaiduPano,#divBaiduMap').on("mousemove",function(ev){
				 changeMinMapSize(ev,e.pageY);
			 });
		 });
	}
	function clearMarker(){
		for(var i = 0; i<markers.length; i++){
			BMaper.bmap.removeOverlay(markers[i]);
		}
		markers.length = 0;
	}
	function createIcon(sx,sy,ox,oy,ix,iy,url,mox,moy){
		return BMaper.markerBmap.createIcon(url, new BMap.Size(sx,sy),
				{imageOffset:new BMap.Size(ox,oy)});
	}
	
	function addMarker(sx,sy,ox,oy,url,ix,iy,mox,moy,zIndex){
		console.log(sx+","+sy+","+ox+","+oy+","+url+","+ix+","+iy+","+mox+","+moy+","+zIndex);
		console.log("markers的长度："+markers.length);
		if(markers.length >= 2){
			clearMarker();//清空覆盖物
		}
		var icon = createIcon(sx,sy,ox,oy,ix,iy,url,mox,moy);
		var markerOpt = {
				offset:new BMap.Size(mox,moy),
				icon:icon,
				enableMassClear:false,
				enableDragging:true
		};
		var marker = BMaper.markerBmap.createMarker(BMaper,point,markerOpt);
		if(zIndex === 10){
			marker.setTop(true);
		}
		markers.push(marker);
		marker.addEventListener('dragend',function(e){
			console.log("拖拽街景marker后的坐标："+e.point);
			bdStreetView.SearchStreetViewBMap(e.point,BMaper);
	    });
	}
	function getKnertenLocal(heading){
		var heading = bpanObj.getPov().heading;
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
			knerten == -310 ? addMarker(70,33,-37,-45,"image/direction.png",70,33,-6,-14,1) :
			knerten == -155 ? addMarker(80,53,-43,-165,"image/direction.png",80,53,11,-22,1) :
			knerten == -124 ? addMarker(85,76,-60,-290,"image/direction.png",85,76,28,-16,1) :
			knerten == -279 ? addMarker(85,76,-60,-440,"image/direction.png",85,76,25,-9,1) :
			knerten == -93  ? addMarker(55,100,-60,-540,"image/direction.png",55,100,15,-5,1) :
			knerten == -62  ? addMarker(75,55,-50,-710,"image/direction.png",75,55,12,5,1) :
			knerten == -339 ? addMarker(75,55,-35,-855,"image/direction.png",75,55,-5,10,1) :
			knerten == 0    ? addMarker(65,60,-25,-1000,"image/direction.png",65,60,-15,6,1) :
			knerten == -31  ? addMarker(65,60,-25,-1130,"image/direction.png",65,60,-18,6,1) :
			knerten == -248 ? addMarker(35,70,-45,-1265,"image/direction.png",35,70,-10,-6,1) :
			knerten == -221 ? addMarker(65,70,-15,-1400,"image/direction.png",65,70,-26,-15,1) :
			knerten == -190 ? addMarker(75,70,-15,-1530,"image/direction.png",75,70,-20,-28,1) : false;
	}
	
	function addMarkerWhenChangePov(lastPoint){
    	var knerten = getKnertenLocal();
		if(lastDirect === knerten){
			if( point !== lastPoint){
				for(var i = 0; i<markers.length; i++){
					markers[i].setPosition(point);
				}
			}
			return;
		}
		lastDirect = knerten;
		getDisrectionLocal(knerten);
		addMarker(24,45,knerten,0,"image/knerten.png",24,45,-4,-20,10);
	}
	
	function changePositionEve(){
		 var lastPoint = point;
    	 console.log("之前的坐标："+ lastPoint);
    	 var bpapPosition = bpanObj.getPosition();
    	 console.log("之后的坐标：" + bpapPosition);
    	 point = bpapPosition == null ? point : bpapPosition;
    	 BMaper.bmap.setCenter(point);
    	 addMarkerWhenChangePov( lastPoint );
	}
	function changePvoEve(){
		 addMarkerWhenChangePov( point );
	}
	
	function resultPanoramaService(data){
		if (data == null) {
			alert("百度此处没有街景");
			return;
		}
		$("#divBaiduPano").empty();			//清空街景内容
		showAmapPano();						//显示街景
		bpanObj.setPosition(data.position); //根据经纬度坐标展示全景图	    	
		bpanObj.setPov({heading:270, pitch: 0});
		bpanObj.addEventListener('position_changed',changePositionEve);
		bpanObj.addEventListener('pov_changed',changePvoEve);
		if($("#curLinkText").text()==="关闭联动"){
			BMaper.curLinkBmap.addStreetViewLinkBMap();
		}
	}
	bdStreetView.SearchStreetViewBMap = function(points,BMapers){
		lastDirect = 1;
		BMaper = BMapers;
		point = points;
		bpanObj = new BMap.Panorama('divBaiduPano');
		bdStreetView.bpanObj = bpanObj;
	    new BMap.PanoramaService().getPanoramaByLocation(point,500,function(data){
	    	resultPanoramaService(data);
		});
	};	
	bdStreetView.markers = markers;
	return bdStreetView;
	
	
});
