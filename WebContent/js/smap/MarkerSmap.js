define(function(){
	function createMarker(SMaper,position,icond,shadowd,shaped,titled,animationd,zIndexd,draggabled){
		var icon = icond === undefined ? null :icond,
			shadow = shadowd === undefined ? null :shadowd,
			shape = shaped === undefined ? null:shaped,
			title = titled === undefined ? null:titled,
			animation = animationd === undefined ? null:animationd,
			zIndex = zIndexd === undefined ? 1:zIndexd,
			draggable = draggabled === undefined ? false : draggabled;
		var marker = new qq.maps.Marker({
			map	 	 : SMaper.smap,	//Map	显示Marker的地图。
			position : position	,	//LatLng	 Marker的位置坐标，必填项。
			icon	 : icon,		//MarkerImage	 Marker的图标，当使用自定义图标时，设置该属性。
			shadow	 : shadow,		//MarkerImage	 Marker的阴影使用的图标。
			shape	 : shape,		//MarkerShape	 Marker图片可点区域。
			title	 : title,		//String	 Marker标题，鼠标划过Marker时显示。
			animation: animation,	//MarkerAnimation	 用于指定Marker被添加到Map上时的动画效果。
			zIndex	 : zIndex,		//Number	 Marker的z轴高度，它决定了Marker在地图上的显示前后顺序。zIndex大的Marker显示在zIndex值小的前面。若没有设置zIndex属性，默认情况下， Marker在地图屏幕纵向位置决定前后顺序，位置越靠近屏幕下方的Marker，显示在位置靠近屏幕上方的Marker的前面。
			draggable: draggable,	//Boolean	 该值为true时，Marker可以拖拽移动，默认值false。
			clickable: true,	    //Boolean	 如果为true，Marker可响应鼠标的click事件和触屏设备上touch事件。默认值true。
			visible  : true,		//Boolean	 是否可见，为true时可见。
			flat	 : false,		//Boolean	 为true，表示不显示默认图标的阴影，默认值为false。
			
		});
		SMaper.OverlaysArray.push(marker);
		return marker;
	}
	function markerImage(SMaper,url, sized, origind, anchord, scaleSized, shadowAngled){
		var  size = sized === undefined ? null :sized, 
			 origin = origind === undefined ? null : origind, 
			 anchor	= anchord === undefined ? null : anchord, 
			 scaleSize = scaleSized === undefined ? null :scaleSized, 
			 shadowAngle = shadowAngled === undefined ? null :shadowAngled;
		
		var markerImg = new qq.maps.MarkerImage(url, size,
				 				origin, anchor, scaleSize, shadowAngle);
		 return markerImg;
	}
	return {
				createMarker : createMarker,
				markerImage : markerImage
			}
});
