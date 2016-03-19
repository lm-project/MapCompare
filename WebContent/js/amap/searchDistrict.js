/*
 * AMap.DistrictSearch行政区查询服务插件，提供全国各省、市、县、区的中心点经纬度、行政区边界坐标组、下级行政区等信息。根据行政区边界坐标组可在地图上绘制行政区边界。
 * 
 */
define(function(){
	var districtSearch = null;
	function drawCityOutLine(bounds,amap){
		for(var i =0, l = bounds.length;i < l; i++){
        	var PolylineOptions = {
        			map:amap,
                    strokeWeight:1,
                    path:bounds[i],
                    isOutline:true,
                    strokeColor:'#CC66CC'
        		};
        	var kk = new AMap.Polyline(PolylineOptions);
         }
        amap.setFitView();//地图自适应
	}
	function addSearchCityResultTem(data,datas){
		 var SearchDistrictHTML = Handlebars.compile(datas);
	   	 Handlebars.registerHelper("addOne",function(index){
	   		   return parseInt(index)+1;
	   	 });      
	   	 Handlebars.registerHelper("havaVal",function(exist){
	   		 if(exist){
	   			 return exist;
	   		 }else{
	   			 return "暂无";
	   		 }
	   	 });      
	   	 $("#Aresult").html(SearchDistrictHTML(data));
		
	}
	
	function districtSearchCallback(data,amap){
		if(data.info!=="OK"){return;};
		$.ajax({
            url: "template/SearchDistrictAmap.html",
            success: function (datas) {
            	addSearchCityResultTem(data,datas);
            }
        });
		var bounds = data.districtList[0].boundaries;
		if(bounds) {
			drawCityOutLine(bounds,amap);
          };
  
	};
	var initDistrictSearch = function(amap){
		amap.plugin(["AMap.DistrictSearch"], function() {
			districtSearch = new AMap.DistrictSearch({
					extensions:"all",
					subdistrict:0
			});
			AMap.event.addListener(districtSearch, "complete", function(data){
				
				districtSearchCallback(data,amap);
			});
			AMap.event.addListener(districtSearch, "error",function(e){
				alert("高德行政区查询失败!"+e.info);
			});
			
		});
	};
	
	
	var districtSearchAMap = function(AMaper,districtName){
		AMaper.clearAmap(AMaper.amap);
		initDistrictSearch(AMaper.amap);
		districtSearch.search(districtName);
		
		
	};
	
	return districtSearchAMap;
	
	
});