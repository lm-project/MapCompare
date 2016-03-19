define(function (){
	function locateCity(amap){
		amap.plugin(["AMap.CitySearch"], function() {      
			var citySearch = new AMap.CitySearch();      //实例化城市查询类  	   
			citySearch.getLocalCity();     				 //自动获取用户IP，返回当前城市  	
		    //citysearch.getCityByIP(183.23.152.*);  	 //根据输入IP，返回IP所在城市
		    AMap.event.addListener(citySearch, "error", function(erro){alert("高德自动定位出错！"+erro.info);});  
		    AMap.event.addListener(citySearch, "complete", function(results){
		    	$("#curCity").text(results.city);
		    	//alert(results.bounds);
		    });
		}); 
	};
	return locateCity; 
});

