define(function(){
	function MarkerAmap(AMaper,makerOptions){
		var icon = makerOptions.icon === undefined ? null :makerOptions.icon ,
				offset = makerOptions.offset === undefined ? new AMap.Pixel(-10,-34) :makerOptions.offset,
				content = makerOptions.content === undefined ? "" :makerOptions.content,
				topWhenClick = makerOptions.topWhenClick === undefined ? false :makerOptions.topWhenClick,
				topWhenMouseOver = makerOptions.topWhenMouseOver === undefined ? false :makerOptions.topWhenMouseOver,
				draggable = makerOptions.draggable === undefined ? false : makerOptions.draggable,
			    raiseOnDrag = makerOptions.raiseOnDrag === undefined ? false : makerOptions.raiseOnDrag,
			    cursor = makerOptions.cursor === undefined ? "pointer" : makerOptions.cursor,
			    visible = makerOptions.visible === undefined ? true : makerOptions.visible,
			    zIndex = makerOptions.zIndex === undefined ? 100 : makerOptions.zIndex,
			    angle = makerOptions.angle === undefined ? null : makerOptions.angle,
			    autoRotation = makerOptions.autoRotation === undefined ? false : makerOptions.autoRotation,
				shadow =  makerOptions.shadow === undefined ? null : makerOptions.shadow,
				title =  makerOptions.title === undefined ? "": makerOptions.title,
				clickable = makerOptions.clickable === undefined ? false : makerOptions.clickable,
				shape = makerOptions.shape === undefined ? null:makerOptions.shape,
				extData = makerOptions.extData === undefined ? null : makerOptions.extData,
				animation = makerOptions.animation === undefined ? "AMAP_ANIMATION_NONE":makerOptions.animation;
		var marker = new AMap.Marker({
				map:AMaper.amap,        			//	Map	 要显示该marker的地图对象
				position:makerOptions.position,		//	LngLat	 点标记在地图上显示的位置，默认为地图中心点
				offset:offset,						//	Pixel	 点标记显示位置偏移量，默认值为Pixel(-10,-34)。Marker指定position后，默认以marker左上角位置为基准点，对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。详细方法可参考开发指南中覆盖物一节中的相关介绍
				icon:icon,							//	String/Icon	 需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效
				content:content,					//	String/Object	 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖
				topWhenClick:topWhenClick,			//	Boolean	鼠标点击时marker是否置顶，默认false ，不置顶（自v1.3 新增）
				topWhenMouseOver:topWhenMouseOver,	//	Boolean	鼠标移进时marker是否置顶，默认false，不置顶（自v1.3 新增）
				draggable:draggable,				//	Boolean	 设置点标记是否可拖拽移动，默认为false
				raiseOnDrag:raiseOnDrag,			//	Boolean	 设置拖拽点标记时是否开启点标记离开地图的效果
				cursor:cursor,						//	String	 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
				visible:visible,					//	Boolean	 点标记是否可见，默认为true
				zIndex:zIndex,						//	Number	 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100
				angle:angle,						//	Number	 点标记的旋转角度	注：angle属性是使用CSS3来实现的，支持IE9及以上版本
				autoRotation:autoRotation,			//	Boolean	 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false IE8以下不支持旋转，autoRotation属性无效
				shadow:shadow,						//	Icon	 点标记阴影，不设置该属性则点标记无阴影
				title:title,						//	String	 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示
				clickable:clickable,				//	Boolean	 点标记是否可点击
				shape:shape,						//	MarkerShape	 设置Marker的可点击区域，在定义的区域内可触发Marker的鼠标点击事件
				extData:extData,					//	Any	 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
				animation:animation					//	String	 点标记的动画效果，默认值：“AMAP_ANIMATION_NONE”
													//				可选值：
													//				“AMAP_ANIMATION_NONE”，无动画效果
													//				“AMAP_ANIMATION_DROP”，点标掉落效果
													//				“AMAP_ANIMATION_BOUNCE”，点标弹跳效果
			});
			return marker;
		};
	
		function IconAmap(iconOptions){
			var icon = new AMap.Icon({
					size:iconOptions.size,					//	Size	 图标尺寸，默认值(36,36)
					imageOffset:iconOptions.imageOffset,	//	Pixel	 图标取图偏移量。当image中指定了一个大图时，可通过size和imageOffset配合，显示图标的指定范围
					image:iconOptions.image,				//	String	 图标的取图地址。默认为蓝色图钉图片
					imageSize:iconOptions.image,			//	Size	 图标所用图片大小，根据所设置的大小拉伸或压缩图片，等同于CSS中的background-size属性。可用于实现高清屏的高清效果		“AMAP_ANIMATION_BOUNCE”，点标弹跳效果
				});
			return icon;
		}

	 return {MarkerAmap:MarkerAmap,IconAmap:IconAmap};
});

	

		
		
		
		

