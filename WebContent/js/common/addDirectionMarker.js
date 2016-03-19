
define(function(){
	function clearMarker(){
		for(var i = 0; i<markers.length; i++){
			markers[i].setMap(null);
		}
		markers = [];
	}
	function createIcon(sx,sy,ox,oy,ix,iy,url){
		var iconOpt = {
				size:new AMap.Size(sx,sy),			//	Size	 图标尺寸，默认值(36,36)
				imageOffset:new AMap.Pixel(ox,oy),	//	Pixel	 图标取图偏移量。当image中指定了一个大图时，可通过size和imageOffset配合，显示图标的指定范围
				image:url,							//	String	 图标的取图地址。默认为蓝色图钉图片
				imageSize:new AMap.Size(ix,iy),		//	Size	 图标所用图片大小，根据所设置的大小拉伸或压缩图片，等同于CSS中的background-size属性。可用于实现高清屏的高清效果		
		}	
		return AMaper.MarkerAmap.IconAmap(iconOpt);
	}
	function addMarker(sx,sy,ox,oy,url,ix,iy,mox,moy){
		console.log(sx+","+sy+","+ox+","+oy+","+url+","+ix+","+iy+","+mox+","+moy);
		console.log("markers的长度："+markers.length);
		if(markers.length >= 2){
			clearMarker();//清空覆盖物
		}
		var icon = createIcon(sx,sy,ox,oy,ix,iy,url)
		var markerOpt = {
				icon:icon,
				position:point,
				draggable:true,
				offset:new AMap.Pixel(mox,moy)
		}
		var marker = AMaper.MarkerAmap.MarkerAmap(AMaper,markerOpt);
		markers.push(marker);
		AMap.event.addListener(marker,'dragend',function(e){
			console.log("拖拽街景marker后的坐标："+e.lnglat);
			gdStreetView.SearchStreetViewAMap(AMaper,e.lnglat,Sys);
	    });
	}
	function getKnertenLocal(heading){
		var heading = apanObj.getPov().heading;
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
			knerten == -310 ? addMarker(70,33,-37,-45,"image/direction.png",70,33,-35,-33) :
			knerten == -155 ? addMarker(80,53,-43,-165,"image/direction.png",80,53,-25,-50) :
			knerten == -124 ? addMarker(85,76,-60,-290,"image/direction.png",85,76,-11,-58) :
			knerten == -279 ? addMarker(85,76,-60,-440,"image/direction.png",85,76,-13,-52) :
			knerten == -93  ? addMarker(55,100,-60,-540,"image/direction.png",55,100,-10,-60) :
			knerten == -62  ? addMarker(75,55,-50,-710,"image/direction.png",75,55,-20,-35) :
			knerten == -339 ? addMarker(75,55,-35,-855,"image/direction.png",75,55,-38,-20) :
			knerten == 0    ? addMarker(65,60,-25,-1000,"image/direction.png",65,60,-45,-28) :
			knerten == -31  ? addMarker(65,60,-25,-1130,"image/direction.png",65,60,-45,-30) :
			knerten == -248 ? addMarker(35,70,-45,-1265,"image/direction.png",35,70,-25,-45) :
			knerten == -221 ? addMarker(65,70,-15,-1400,"image/direction.png",65,70,-55,-55) :
			knerten == -190 ? addMarker(75,70,-15,-1530,"image/direction.png",75,70,-55,-65) : false;
	}
	
	function addMarkerWhenChangePov(lastPoint){
    	var knerten = getKnertenLocal();
    	console.log(lastDirect+"========================"+knerten);
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
		addMarker(24,45,knerten,0,"image/knerten.png",24,45,-12,-45);
	}

});