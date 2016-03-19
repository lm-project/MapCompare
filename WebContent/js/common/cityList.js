define(function(){
	function districtSearch(obj,AMaper,BMaper,SMaper){
		
			$("#cityList").css("display","none");
			var curCityName = $(obj).text()||$("#citySearchInput").val();
			if(curCityName === "全国"){curCityName = "中国";}
			if(curCityName === "热门城市"||curCityName === "直辖市"||curCityName === "特别行政区"){return;}
			AMaper.districtSearchAmap(AMaper,curCityName);
			$("#baiduMap").css("display")==="block" ? 
				BMaper.districtSearchBmap(BMaper,curCityName) : 
					$("#sosoMap").css("display")==="block" ? 
						SMaper.districtSearchSmap(SMaper,curCityName) :false;
		}
	
	function addCityListTem(datas,data,AMaper,BMaper,SMaper){
			var cityList = Handlebars.compile(datas);
			$("#cityList").html(cityList(data));
			var curCity = $("#curCity").text();
			$("#cur_city").text(curCity);
			$("#closeCityList").on("click",function(){
				$("#cityList").css("display","none");
			});
			$("#citylist_container").on("click","a",function(){
				districtSearch(this,AMaper,BMaper,SMaper);
    		});  
			$("#citySearchBnt").on("click",function(){
				
				districtSearch(null,AMaper,BMaper,SMaper);
			});  
		}
	
	var getCityListTem = function (data,AMaper,BMaper,SMaper){
			$.ajax({
    			url:"template/cityList.html",
    			cache:true,
    			success:function(datas){
    				addCityListTem(datas,data,AMaper,BMaper,SMaper);
    				
    			}
    		});
		};
	return getCityListTem;
});