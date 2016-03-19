define(function(){
	var drive = null;
	function addSearchDriveRouteTem(data){
		$.ajax({
            url: "template/SearchDriveRouteSmap.html",
            success: function (datas) {
            	var compoileHTML = Handlebars.compile(datas);
            	Handlebars.registerHelper("index",function(index){
            		return parseInt(index)+1;
            	});     
            	Handlebars.registerHelper("img",function(turningtext){
            		return turningtext === '左转' ? '0px 0px' :
            				turningtext === '右转' ? '-19px 0px' :
            					turningtext === '直行' ? '-38px 0px' :
            						turningtext === '偏左转'|| turningtext === '靠左' ? '-57px 0px' :
            							turningtext === '偏右转' || 	turningtext === '靠右' ? '-76px 0px' :
            								turningtext === '左转调头' ? '-95px 0px' : "";
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
	function callback( result,SMaper ){
		var start = result.detail.start,
			end = result.detail.end;
		addImageMarker(start.latLng,'image/busmarkerSmap.png',24,36,0,0,6,6,SMaper);
		addImageMarker(end.latLng,'image/busmarkerSmap.png',24,36,24,0,6,6,SMaper);
		var routes = result.detail.routes;
		console.log("腾讯地图路线的长度："+routes.length);
		for(var i = 0;i < routes.length; i++){
			var route = routes[i]; 
		    var steps = route.steps;
		    SMaper.polygonSmap.createPolygon(SMaper,route.path,'#3893F9',6);
		    console.log("地标的长度："+steps[i].placemarks.length);
		}
		SMaper.smap.fitBounds(result.detail.bounds); //此路线的地理范围
		addSearchDriveRouteTem(result.detail);
	}
	
	function getDriveRouteObj(SMaper){
		drive = new qq.maps.DrivingService({
			location:"北京市",
			error:function(){alert("腾讯驾车服务查询失败！");},
			complete:function(result){
				callback(result,SMaper);
			}
		});
		
	}
	function searchDriveRoute(firstInputVal ,secondInputVal,SMaper){
		//清空搜索结果
		SMaper.clearSmap(SMaper);
		getDriveRouteObj(SMaper);
		drive.search(firstInputVal,secondInputVal);
	}
	return  searchDriveRoute;
	
});
