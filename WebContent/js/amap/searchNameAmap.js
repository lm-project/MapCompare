
define(function(){
	var ANameSearch = null;
	var addNameSearchTem  = function(datas,poiArr,indexPage,addExportDataBnt){
		var resultSearTips = Handlebars.compile(datas);
	   	 Handlebars.registerHelper("addOne",function(index){
	   		   return parseInt(index)+1;
	   	 });      
	   	 Handlebars.registerHelper("page",function(page){
	   		 return (page%10==0)?(page/10):(parseInt(page/10)+1);
	   	 });      
	   	 Handlebars.registerHelper("havaVal",function(exist){
	   		 if(exist){
	   			 return exist;
	   		 }else{
	   			 return "暂无";
	   		 }
	   	 });      
	   	$("#Aresult").html(resultSearTips(poiArr));
	   	$("#goPageAmapInput").val(indexPage);
	   	addExportDataBnt("searchResultsAmapTable","exportRelAmapDiv");
	};
	
	var getNameSearchTem = function(poiArr,indexPage,addExportDataBnt){
		$.ajax({
            url: "template/SearchNameAmap.html",
            success: function (datas) {
            	addNameSearchTem(datas,poiArr,indexPage,addExportDataBnt);
            }
        });
	};
	var addAllNameSearchTem  = function(datas,data,keywordsVal){
		var resultSearTips = Handlebars.compile(datas);
	   	 Handlebars.registerHelper("addOne",function(index){
	   		   return parseInt(index)+1;
	   	 });  
	   	 Handlebars.registerHelper("key",function(index){
	   		   return keywordsVal;
	   	 }); 
	   	$("#Aresult").html(resultSearTips(data));
	   
	};
	var getAllNameSearchTem = function(data,keywordsVal){
		$.ajax({
			url: "template/SearchAllNameAmap.html",
			success: function (datas) {
				addAllNameSearchTem(datas,data,keywordsVal);
			}
		});
	};
	var addMarker = function(pois,amap){
		var poisLength = pois.length;
		for(var i = 0;i<poisLength; i++){
			var lngLat = pois[i].location; 
			var markerOption = {  
					map:amap, 
					icon:"http://webapi.amap.com/images/" + (i + 1) + ".png",  
					position:new AMap.LngLat(lngLat.getLng(),lngLat.getLat())  
			};  
			var markerAmap = new AMap.Marker(markerOption);
		}
		amap.setFitView();
	};
	var nameSearchCallback = function(data,amap,indexPage,addExportDataBnt,keywordsVal){	
		if(data.info!=="NO_DATA"){
			var poiArr  = data.poiList;       //Poi对象	
			alert(JSON.stringify(poiArr));
			addMarker(poiArr.pois,amap);
			getNameSearchTem(poiArr,indexPage,addExportDataBnt);
			$("#curCity").text(poiArr.pois[0].cityname);
		}else if(data.cityList.length>0){
			$("#curCity").text("中国");
			getAllNameSearchTem(data,keywordsVal);			
		}else {
			alert("sorry，高德全国没有找到与此关键字相关的点!");
			return;
		}
		
	};
	var initKeywordsSearch = function(amap,indexPage,addExportDataBnt,keywordsVal){
		amap.plugin(["AMap.PlaceSearch"], function() {          
			ANameSearch = new AMap.PlaceSearch({ //构造地点查询类
				pageSize: 10, //每页结果数,默认10 
				extensions:"all"
			});   
			//搜索成功后返回地点查询结果  
			AMap.event.addListener(ANameSearch, "complete", function(data){
				nameSearchCallback(data,amap,indexPage,addExportDataBnt,keywordsVal);
			});
		    //返回地点查询结果  
			AMap.event.addListener(ANameSearch, "error",function(e){alert("高德地图查询失败!"+e.info);});
		}); 
	};
	searchNameAMap = function(searchCity,keywordsVal,AMaper,indexPage,addExportDataBnt){
		initKeywordsSearch(AMaper.amap,indexPage,addExportDataBnt,keywordsVal);
		AMaper.clearAmap(AMaper.amap);
		ANameSearch.setCity(searchCity);
		ANameSearch.setPageIndex(indexPage);		
		ANameSearch.search(keywordsVal);         //关键字搜索
	};
	return searchNameAMap;
});
