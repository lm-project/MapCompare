define(function(){
	function createLabel(BMaper,content,options){
		var label = new BMap.Label(content,options);
		BMaper.bmap.addOverlay(label); 
	}
	return {createLabel:createLabel}
});
