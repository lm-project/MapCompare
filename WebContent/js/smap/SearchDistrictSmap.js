/*
 * AMap.DistrictSearch行政区查询服务插件，提供全国各省、市、县、区的中心点经纬度、行政区边界坐标组、下级行政区等信息。根据行政区边界坐标组可在地图上绘制行政区边界。
 * 
 */
define(function(){
	var searchService = null;
	
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
	
	function districtSearchCallback(SMaper,results){
		var pois = results.detail.latLng;
		SMaper.smap.setCenter(pois);
		
	};
	var initDistrictSearch = function(SMaper,curCityName){
		searchService = new qq.maps.CityService({
			complete:function(result){
				districtSearchCallback(SMaper,result);
				$("#curCity").text(curCityName);
				$("#cur_city").text(curCityName);
			},
			error:function(){alert("腾讯地图查询势失败！");}	
		});
	};
	
	
	var districtSearchSMap = function(SMaper,districtName){
		initDistrictSearch(SMaper,districtName);
		searchService.searchCityByName(districtName);
		
	};
	
	return districtSearchSMap;
	
	
});