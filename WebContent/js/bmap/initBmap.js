define(function(){
	var point= new BMap.Point(116.32200939265,39.989999657908);
	var bmap = new BMap.Map("divBaiduMap");			//在百度地图容器中创建一个地图
	bmap.centerAndZoom(point,13);				//设定地图的中心点和坐标并将地图显示在地图容器中
	bmap.enableDragging();						//启用地图拖拽，默认启用。
	bmap.enableScrollWheelZoom();				// 启用滚轮放大缩小，默认禁用。
	bmap.enableDoubleClickZoom();				//none	 启用双击放大，默认启用。
	bmap.enableKeyboard();	 			        //none	  启用键盘操作，默认禁用。键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级。
	bmap.enableContinuousZoom()	; 				//none	 启用连续缩放效果，默认禁用。
	//bmap.enableAutoResize();	 				//none	 启用自动适应容器尺寸变化，默认启用。
	 //向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	bmap.addControl(ctrl_nav);
    //向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	bmap.addControl(ctrl_ove);
    //向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	bmap.addControl(ctrl_sca);
	//向地图添加类型控件
	var ctrl_type=new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT});
	bmap.addControl(ctrl_type);
	//向地图添加全景
	//map.setCurrentCity("北京");
	var ctrl_pan = new BMap.PanoramaControl(); //构造全景控件
	ctrl_pan.setOffset(new BMap.Size(20, 40));
	bmap.addControl(ctrl_pan);//添加全景控件
	
	$("#bdZoom").text(bmap.getZoom());
	bmap.addEventListener("zoomend",
		function(){
			$("#bdZoom").text(bmap.getZoom());
	});
    return bmap;
	
	
});


/*

MapCompare.BMaper.InitBMap = function(){
		var bmap=null;
		var point= new BMap.Point(116.32200939265,39.989999657908);
		bmap = new BMap.Map("divBaiduMap");			//在百度地图容器中创建一个地图
		bmap.centerAndZoom(point,13);				//设定地图的中心点和坐标并将地图显示在地图容器中
		bmap.enableDragging();						//启用地图拖拽，默认启用。
		bmap.enableScrollWheelZoom();				// 启用滚轮放大缩小，默认禁用。
		bmap.enableDoubleClickZoom();				//none	 启用双击放大，默认启用。
		bmap.enableKeyboard();	 			        //none	  启用键盘操作，默认禁用。键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级。
		bmap.enableContinuousZoom()	; 				//none	 启用连续缩放效果，默认禁用。
		//bmap.enableAutoResize();	 				//none	 启用自动适应容器尺寸变化，默认启用。
		 //向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
		bmap.addControl(ctrl_nav);
	    //向地图中添加缩略图控件
		var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
		bmap.addControl(ctrl_ove);
	    //向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		bmap.addControl(ctrl_sca);
		//向地图添加类型控件
		var ctrl_type=new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT});
		bmap.addControl(ctrl_type);
		//向地图添加全景
		//map.setCurrentCity("北京");
		var ctrl_pan = new BMap.PanoramaControl(); //构造全景控件
		ctrl_pan.setOffset(new BMap.Size(20, 40));
		bmap.addControl(ctrl_pan);//添加全景控件
		MapCompare.bmapObj = bmap;
		
		$("#bdZoom").text(MapCompare.bmapObj.getZoom());
		MapCompare.bmapObj.addEventListener("zoomend",
			function(){
				$("#bdZoom").text(MapCompare.bmapObj.getZoom());
		});

		
   
}();


*/