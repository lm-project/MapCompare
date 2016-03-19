
define(function(){
	var nowpage = 1;
	var SNameSearch = null,points = [];
	var addNameSearchTem  = function(datas,data,addExportDataBnt){
		var resultSearTips = Handlebars.compile(datas);
	   	 Handlebars.registerHelper("addOne",function(index){
	   		   return parseInt(index)+1;
	   	 });      
	   	 Handlebars.registerHelper("havaVal",function(exist){
	   		 return !exist || exist === " " ? "暂无" : exist;
	   	 });
	   	 Handlebars.registerHelper("havaView",function(exist){
	   		 return !exist ? "暂无" : "查看街景";
	   	 });
	   	Handlebars.registerHelper("pages",function(exist){
	   		 return !exist ? "0" : Math.ceil(exist/10);
	   	 });
	   	$("#Soresult").html(resultSearTips(data));
		$("#goPageSmapInput").val(nowpage); 
	   	addExportDataBnt("searchResultsSmapTable","exportRelBmapDiv");
	};
	
	var getNameSearchTem = function(data,addExportDataBnt){
		$.ajax({
            url: "template/SearchNameSmap.html",
            success: function (datas) {
            	addNameSearchTem(datas,data,addExportDataBnt);
            }
        });
	};
	var addAllNameSearchTem  = function(datas,data){
		var resultSearTips = Handlebars.compile(datas);
	   	 Handlebars.registerHelper("addOne",function(index){
	   		   return parseInt(index)+1;
	   	 });      
	   	$("#Soresult").html(resultSearTips(data));
	   
	};
	var getAllNameSearchTem = function(data){
		$.ajax({
			url: "template/SearchAllNameSmap.html",
			success: function (datas) {
				addAllNameSearchTem(datas,data);
			}
		});
	};
	
	function addImageMarker(point,SMaper,ori){
		var size = new qq.maps.Size(27, 35),
			origin = new qq.maps.Point(ori, 0),
		    anchor = new qq.maps.Point(6, 6);
		var imgMarker = SMaper.markerSmap.markerImage(SMaper,'image/qq_marker4.png',size, origin);
		SMaper.markerSmap.createMarker(SMaper,point, imgMarker);
	}
	var nameSearchCallback = function(local,SMaper,addExportDataBnt){
		var pois = local.pois;
		var latlngBounds = new qq.maps.LatLngBounds();
		for(var i = 0 ; i< pois.length;i++){
			var latLng = pois[i].latLng;
			latlngBounds.extend(latLng);
			addImageMarker(latLng,SMaper,i*27);
		}
		SMaper.smap.fitBounds(latlngBounds);
		getNameSearchTem(local,addExportDataBnt);
		
	};
	var initKeywordsSearch = function(SMaper,addExportDataBnt){
		SNameSearch = new qq.maps.SearchService({
	       //检索的回调函数
	        error:function(errorInfo){alert("腾讯地图搜索出错了！");},
			complete:function(result){
				result.detail.pois !== undefined ? 
					nameSearchCallback(result.detail,SMaper,addExportDataBnt) :
						result.detail.cities===undefined ? alert("腾讯检索失败！"): 
							getAllNameSearchTem(result.detail);
			}
		});
	};
	var searchNameSmap = function(searchCity,keywordsVal,SMaper,indexPage,addExportDataBnt){
		console.log("腾讯名称搜索页码："+indexPage);
		nowpage = indexPage;
		initKeywordsSearch(SMaper,addExportDataBnt);
		SMaper.clearSmap(SMaper);
		SNameSearch.setPageIndex(indexPage-1);	
		SNameSearch.setLocation(searchCity);
		SNameSearch.search(keywordsVal);         //关键字搜索
	
	};
	return searchNameSmap;
});
		