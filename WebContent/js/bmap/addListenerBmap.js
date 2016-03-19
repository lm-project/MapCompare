

define(function(){
	function doListenerBmap(obj,BMaper){
		var bdToolBntIndex=$(obj).index();
		switch (bdToolBntIndex) {
		case 2:BMaper.fullScreenBmap();break;
		case 3:alert("gongju");break;
		case 4:BMaper.changeLayerBmap.realTrafficLayer(BMaper);break;
		case 5:alert("shiye");break;
		case 6:BMaper.changeLayerBmap.threeDLayer(BMaper);break;
		case 7:BMaper.changeLayerBmap.streetViewLayer(BMaper);break;
		case 8:BMaper.changeLayerBmap.satelliteLayer(BMaper);break;
		case 9:BMaper.changeLayerBmap.normalLayer(BMaper);break;

		default:
			break;
		}
	}
	return function(BMaper){
		$("#baiduMap").on("click",".bd_Btn",function(){
			doListenerBmap(this,BMaper);
		});
	};
});


