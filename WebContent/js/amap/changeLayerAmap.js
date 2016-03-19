define(function(){

	var gd_satellireLayer = null,
		gd_roadNetLayer = null,
		gd_threeDLayer = null,
		gd_realTrafficLayer = null,
		gd_streetView = null,
		bd_streetView = null,
		qq_streetView = null,
		getPointClickEvent = null,
		layerTypeAmap = {};
	layerTypeAmap.normalLayer = function (AMaper){
		//移除高德卫星图层
		if(gd_satellireLayer !== null){
			gd_satellireLayer.setMap(null);
			gd_satellireLayer = null;
			
		}
		//移除高德路网图层
	    if(gd_roadNetLayer != null){
	    	gd_roadNetLayer.setMap(null);
	    	gd_roadNetLayer = null;
	    	
	    } 
	    if(gd_threeDLayer != null){

	    	gd_threeDLayer.setMap(null);
	    	gd_threeDLayer = null;
	    }
	    if(gd_realTrafficLayer != null){
	    	
	    	gd_realTrafficLayer.setMap(null);
	    	gd_realTrafficLayer = null;
	    }
	    
	    removeBmapStreetViewLayer();
	    removeQQStreetViewLayer();
	    closeSpanAmap(AMaper);
	   
	};
	
//高德卫星地图
	layerTypeAmap.satelliteLayer = function(AMaper){
		closeSpanAmap(AMaper);
		gd_satellireLayer = new AMap.TileLayer.Satellite({map:AMaper.amap});
		gd_roadNetLayer = new AMap.TileLayer.RoadNet({map:AMaper.amap});
	};
	//用于在地图上显示3D楼块层,当地图缩放级别达到17、18级时可以显示。
	
	 layerTypeAmap.threeDLayer = function(AMaper){
		closeSpanAmap(AMaper);
		gd_threeDLayer = new AMap.Buildings({map:AMaper.amap});
	};
	
	//实时交通图层类，继承自TileLayer。请点击[覆盖城市]来查看已覆盖了实时交通图层的城市名单。
	layerTypeAmap.realTrafficLayer = function(AMaper){
		closeSpanAmap(AMaper);
		gd_realTrafficLayer = new AMap.TileLayer.Traffic({map:AMaper.amap,zIndex:10});
	};
	function removeAmapStreetViewLayer(){
		if(gd_streetView != null){
	    	gd_streetView.setMap(null);
	    	gd_streetView = null;
	    	$("#layerAamp").removeAttr("checked");
	    }
	}
	function removeBmapStreetViewLayer(){
		 if(bd_streetView != null){
		    	bd_streetView.setMap(null);
		    	bd_streetView = null;
		  }
	}
	function removeQQStreetViewLayer(){
		if(qq_streetView != null){
	    	qq_streetView.setMap(null);
	    	qq_streetView = null;
	    }
	}
	function addQQStreetViewLayer(AMaper){
		var scopes = new Array(0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3,
				0, 7, 0, 7, 0, 15, 0, 15, 0, 31, 0, 31, 0, 63, 4,
				59, 0, 127, 12, 115, 0, 225, 28, 227, 356, 455,
				150, 259, 720, 899, 320, 469, 1440, 1799, 650, 929,
				2880, 3589, 1200, 2069, 5760, 7179, 2550, 3709,
				11520, 14349, 5100, 7999, 23060, 28689, 10710,
				15429, 46120, 57369, 20290, 29849, 89990, 124729,
				41430, 60689, 184228, 229827, 84169, 128886);
		qq_streetView = new AMap.TileLayer({
			opacity : 0.5,
			getTileUrl : function(x, y, z) {
				var s = [ 1, 2, 3 ];
				var t ="http://sv"+ s[Math.floor(Math.random() * s.length)] +".map.qq.com/road/"; //图块取图地址
				var f = z * 4;
				var i = scopes[f++], j = scopes[f++],l = scopes[f++],scope = scopes[f];
				if (x >= i && y <= j && y >= l && y <= scope) {
					y = Math.pow(2, z) - 1 - y;
					t += z + '/' + Math.floor(x / 16) + '/'
							+ Math.floor(y / 16) + '/' + x + '_'+ y + '.png';
				}
				console.log("加载腾讯地图街景层的取图地址："+t);
				return t;
			}
		});
		qq_streetView.setMap(AMaper.amap);
	}
	function addBaiduStreetViewLayer(AMaper){
		var b_h = [ 0, 0, 1, 3, 6, 12, 24, 49, 98, 197, 395, 790,1581, 3163, 6327, 12654, 25308, 50617 ],
			g_h = [ 0, 1, 3, 6, 13, 26, 52, 105, 210, 421, 843,1685, 3372, 6744, 13489, 26978, 53957, 107917],
			b_l = [ 0, 0, 0, 1, 2, 4, 9, 18, 36, 73, 147, 294, 589,1178, 2356, 4712, 9425, 18851 ],
			g_l = [ 0, 0, 1, 2, 6, 12, 24, 48, 97, 194, 387, 776,1551, 3103, 6207, 12416, 24832, 49661 ];
			bd_streetView = new AMap.TileLayer({
				getTileUrl : function(x, y, z) { // 自定义取图规则
					var s = [ 1, 2, 3 ];
					var t = [];
					t.push('http://pcsv'+ s[Math.floor(Math.random() * s.length)]
							+ '.map.bdimg.com/tile/?udt=20141128&qt=tile&styles=pl');
					t.push('x=' + (x - g_h[z] + b_h[z]));
					t.push('y=' + (-y + b_l[z] + g_l[z]));
					t.push('z=' + (z+1));
					console.log("百度地图街景图层："+t.join('&'));
					return t.join('&');
				}
			});
			bd_streetView.setMap(AMaper.amap);
	}
	function addAmaptreetViewLayer(AMaper){
		gd_streetView = new AMap.PanoramaLayer();
		gd_streetView.setMap(AMaper.amap);
		document.getElementById("layerAamp").checked = true;
	}
	//AMap.Panorama 街景类
	layerTypeAmap.streetViewLayer = function(AMaper,Sys,whichLayer){
		console.log("展示的街景层：" + whichLayer);
		whichLayer === "layerAamp" && gd_streetView == null ? addAmaptreetViewLayer(AMaper):
		whichLayer === "layerAamp" && gd_streetView != null ? removeAmapStreetViewLayer():
		whichLayer === "layerBamp" && bd_streetView == null ? addBaiduStreetViewLayer(AMaper): 
		whichLayer === "layerBamp" && bd_streetView != null ? removeBmapStreetViewLayer(): 
		whichLayer === "layerSamp" && qq_streetView == null ? addQQStreetViewLayer(AMaper):
		whichLayer === "layerSamp" && qq_streetView != null ? removeQQStreetViewLayer():false;
		getPointClickEvent = AMap.event.addListener(AMaper.amap,'click',function(ev){
			AMaper.apan.SearchStreetViewAMap(AMaper,ev.lnglat,Sys);
		});
	};
	function closeSpanAmap(AMaper){
		 if(gd_streetView != null){
		    	gd_streetView.setMap(null);
		    	gd_streetView = null;
		    	AMap.event.removeListener(getPointClickEvent); 
		    	getPointClickEvent = null;
		    	$(".layerCheck").removeAttr("checked");
		    }
	    if($('#divAmapPano').css("display")==="block"){
	    	$('#divAmapPano').css("display","none");
	    	if($('#divAMap').css("display") === "block"){
	    		 $('#amapStretchBnt').css("bottom","2px");
	    		 $('#amapStretchBnt').css("background-position","-40px -405px");
	    		 $('#divAMap').css("height","550px");
	    		 $('#divAMap').css("border-top","2px solid #ccc");
	    		 $('#divAmapPano').css("height","550px");
	    		 $('#divAmapPano').css("border-bottom","2px solid #ccc");
	    		 $('#hr').css("display","none");
	    	}else{
	    		$('#divAMap').css("display","block");
	    	}
	    	AMaper.amap.clearMap();
	    	$('#amapStretchBnt').css("display","none");
	    }
	 }
	return layerTypeAmap;
});

