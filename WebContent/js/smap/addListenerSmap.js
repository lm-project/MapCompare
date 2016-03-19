

define(function(){
	function doLisFun(obj,SMaper){
		var qqToolBntIndex=$(obj).index();
		switch (qqToolBntIndex) {

		case 0:SMaper.changeLayerSmap.normalLayer(SMaper);break;
		case 1:alert("此接口还没有开放！");break;
		case 2:SMaper.changeLayerSmap.satelliteLayer(SMaper);break;
		case 3:SMaper.changeLayerSmap.streetViewLayer(SMaper);break;


		default:
			break;
		};
	}
	function doOtherListener(obj,SMaper){
		var qqToolBntIndex=$(obj).index();
		switch (qqToolBntIndex) {

		case 0:alert("ditu");break;
		case 1:alert("dix");break;
		case 2:alert("wx");break;
		case 3:SMaper.fullScreenSmap();break;
		default:
			break;
		}
	}
	return function(SMaper){
		$("#qqMaptpyeBnt").on("click","div",function(){
			doLisFun(this,SMaper);
		});
	
		$("#qqBarBnt").on("click","div",function(){
			doOtherListener(this,SMaper);
		});
	};
});


