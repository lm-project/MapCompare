define(function(){
	function createLabel(SMaper,latlng,content,offset,style,zIndex){
		var offset = offset === undefined ? null: offset,
			style = style === undefined ? null :style,
			zIndex = zIndex === undefined ? 1 :zIndex;
		var lable = new qq.maps.Label({
			map	:SMaper.smap, 	//Map	 显示标签的地图。
			position :latlng ,	//	LatLng	 标签位置坐标，若offset不设置，默认标签左上角对准该位置。
			content : content,	//String	 标签的文本。
			offset :offset,		//	Size	 相对于position位置偏移值，x方向向右偏移为正值，y方向向下偏移为正值，反之为负。
			style : style,		//Object	 Label样式，例如：{color:"#000000",backgroundColor:"red"}
			clickable : true,	//Boolean	 如果为true，表示可点击，默认true。
			visible :true,		//Boolean	 如果为true，表示标签可见，默认为true。
			zIndex  :zIndex
		});
		SMaper.OverlaysArray.push(lable);
	}
	return {createLabel:createLabel}
});
