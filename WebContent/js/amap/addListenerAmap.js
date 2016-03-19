

define(function(){
	function doListenerAmap(obj,AMaper,Sys){
		switch ($(obj).index()) {
			case 2:AMaper.fullScreenAmap();break;
			case 3:break;
			case 4:AMaper.changeLayerAmap.streetViewLayer(AMaper,Sys,"layerAamp");break;
			case 5:AMaper.changeLayerAmap.satelliteLayer(AMaper);break;
			case 6:AMaper.changeLayerAmap.normalLayer(AMaper);break;
			default:break;
		}
	}
	function showToolList(e,list){
		if(e.type === "mouseover"){
			$("#"+list).css("display","block");
		}else{
			$("#"+list).css("display","none");
		}
	}
	return function addListenerAmap(AMaper,Sys){
		$("#gaodeMap").on("click",".gd_tool_bar",function(event){
			doListenerAmap(this,AMaper,Sys);
		});
		$("#toolListAmap").on("mouseout mouseover",function(e){
			showToolList(e,"aToolBar");
		});
		$("#aStreetViewBar").on("mouseout mouseover",function(e){
			showToolList(e,"layerList");
		});
		$("#aStreetViewBar").on("click","input",function(e){
			e.stopPropagation();
			AMaper.changeLayerAmap.streetViewLayer(AMaper,Sys,$(this).attr("id"));
		});
		$("#aStreetViewBar").on("click","div",function(e){
			e.stopPropagation();
		});
	};
	

			
});


