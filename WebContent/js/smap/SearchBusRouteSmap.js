define(function(){
	var plans = [];
	function addSearchDriveRouteTem(data){
		$.ajax({
            url: "template/SearchBusRouteSmap.html",
            success: function (datas) {
            	var compoileHTML = Handlebars.compile(datas);
            	Handlebars.registerHelper("index",function(index){
            		return parseInt(index)+1;
            	});     
            	Handlebars.registerHelper("img",function(turningtext){
            		return turningtext === 'BUS' ? '-99px -211px' :
            				turningtext === 'SUBWAY' ? '-155px -211px' :
            					turningtext === 'WALK' ? '-126px -211px' :"";
            	});     
            	$("#Soresult").html(compoileHTML(data));
            }
        });
		
	}
	function addImageMarker(point, url, width, height, oLat, oLng, aLat, aLng,SMaper){
		var size = new qq.maps.Size(width, height),
			origin = new qq.maps.Point(oLat, oLng),
		    anchor = new qq.maps.Point(aLat, aLng);
		var imgMarker = SMaper.markerSmap.markerImage(SMaper,url,size, origin,anchor);
		SMaper.markerSmap.createMarker(SMaper,point, imgMarker);
	}
	function drawBusLine(SMaper,lines){
	    for(var j = 0; j < lines.length; j++){
	        var line = lines[j];
	        SMaper.polygonSmap.createPolygon(SMaper,line.path,'#3893F9',6);
	    } 
	}
	function drawWalkLine(SMaper,walks){
	    for(var j = 0; j < walks.length; j++){
	        var walk = walks[j];
	        SMaper.polygonSmap.createPolygon(SMaper,walk.path,'#3FD2A3',6);
	    } 
	}
	function drawMarker(){
		for(var j = 0; j < stations.length; j++){
	        var station = stations[j],path = null;
	        if(station.type === "SUBWAY_STATION"){
	        	addImageMarker(station.latLng, 'image/busmarkerSmap.png', 24,36, 48,0, 6,6, SMaper);
	        	path = drawBusLine(SMaper,lines);//draw bus line
	        }else if(station.type === "BUS_STATION"){
	        	addImageMarker(station.latLng, 'image/busmarkerSmap.png', 24,36, 72,0, 6,6, SMaper);
	        	path = drawBusLine(SMaper,lines);//draw bus line
	        }else{
	        	addImageMarker(station.latLng, 'image/baidu_img.gif', 25,18, -126,-211, 6,6, SMaper);
	        	path = drawWalkLine(SMaper,walks); //draw walk line
	        }
	    } 
	}
	function drawLine(SMaper,plan){
		var lines = plan.lines,
	        walks = plan.walks,
	    stations = plan.stations;
    	drawBusLine(SMaper,lines);//draw bus line
    	drawWalkLine(SMaper,walks); //draw walk line
		SMaper.smap.fitBounds(plan.bounds);
	}
	function callback( result,SMaper ){
		var start = result.start,end = result.end;
		addImageMarker(start.latLng,'image/busmarkerSmap.png',24,36,0,0,6,6,SMaper);
		addImageMarker(end.latLng,'image/busmarkerSmap.png',24,36,24,0,6,6,SMaper);
		plans = result.plans;
		console.log("腾讯地图公交路线的长度："+plans.length);
		drawLine(SMaper,plans[0]);
		addSearchDriveRouteTem(result);
	}
	
	function getBusRouteObj(SMaper){
		 var bus = new qq.maps.TransferService({
			 	location : "北京",
				error:function(){alert("腾讯公交换乘查询失败！");},
			 	complete:function(result){
			 		typeof result.detail.plans==="undefined" ?
			 				alert("腾讯无此线路！"): callback( result.detail,SMaper );
				}
			 });
		 return  bus;
	}
	
	function searchBusRouteSmap(firstInputVal ,secondInputVal,SMaper){
		//清空搜索结果
		SMaper.clearSmap(SMaper);
		getBusRouteObj(SMaper).search(firstInputVal,secondInputVal);
	}
	return  searchBusRouteSmap;
	
});
