define(function(){
	var changeMapLayer = {};
	changeMapLayer.normalLayer = function(AMaper,BMaper,SMaper){
		AMaper.changeLayerAmap.normalLayer(AMaper);
		BMaper.changeLayerBmap.normalLayer(BMaper);
		SMaper.changeLayerSmap.normalLayer(SMaper);
	};
	changeMapLayer.satelliteLayer = function(AMaper,BMaper,SMaper){
		AMaper.changeLayerAmap.satelliteLayer(AMaper);
		BMaper.changeLayerBmap.satelliteLayer(BMaper);
		SMaper.changeLayerSmap.satelliteLayer(SMaper);
	};
	changeMapLayer.threeDLayer = function(AMaper,BMaper,SMaper){
		AMaper.changeLayerAmap.threeDLayer(AMaper);
		BMaper.changeLayerBmap.threeDLayer(BMaper);
	};
	changeMapLayer.streetViewLayer = function(AMaper,BMaper,SMaper,Sys){
		AMaper.changeLayerAmap.streetViewLayer(AMaper,Sys,"layerAamp");
		BMaper.changeLayerBmap.streetViewLayer(BMaper);
		SMaper.changeLayerSmap.streetViewLayer(SMaper);
	};
	changeMapLayer.realTrafficLayer = function(AMaper,BMaper,SMaper){
		AMaper.changeLayerAmap.realTrafficLayer(AMaper);
		BMaper.changeLayerBmap.realTrafficLayer(BMaper);
		SMaper.changeLayerSmap.realTrafficLayer(SMaper);
	};
	
	return changeMapLayer;
	
});