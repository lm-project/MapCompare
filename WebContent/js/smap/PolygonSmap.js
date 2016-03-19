define(function(){
	function createPolygon(SMaper,paths,color,weight,style,edit,zIndex){
		var color = color === undefined ? null :color,
			weight = weight === undefined ? 2 :weight,
			style = style === undefined ? null :style,
			edit = edit === undefined ? false :edit,
			zIndex = zIndex === undefined ? 1:zIndex;
		
		var polygon = new qq.maps.Polyline({
			map	: SMaper.smap,		//  Map	 要显示折线的地图。
			path : paths,			//	Array.<LatLng> | MVCArray.<LatLng>	 折线的路径，以经纬度坐标数组构成。
			strokeColor :color,		//	Color | String	折线的线条颜色，可通过Color对象的alpha属性设置透明度。
			strokeDashStyle	: style,//  String	 折线的形状。实线是solid，虚线是dash。
			strokeWeight :weight,	//  Number	 折线的线宽。
			visible :true,			//  Boolean	 折线是否可见。
			clickable : true,		//	Boolean	 折线是否可点击。
			editable : edit,		//	Boolean	 多边形是否可编辑。
			zIndex :zIndex			//	Number	 折线的zIndex值。			
		});
		SMaper.OverlaysArray.push(polygon);
		return polygon;
	}
	return {createPolygon : createPolygon}
});
