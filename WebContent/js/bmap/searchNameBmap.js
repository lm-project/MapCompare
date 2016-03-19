
define(function(){
	var indexPages = 1;
	var BNameSearch = null,points = [];
	var addNameSearchTem  = function(datas,poiArr,addExportDataBnt){
		var resultSearTips = Handlebars.compile(datas);
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
	   	$("#Bresult").html(resultSearTips(poiArr));
	   	$("#goPageBmapInput").val(indexPages);
	   	addExportDataBnt("searchResultsBmapTable","exportRelBmapDiv");
	};
	
	var getNameSearchTem = function(poiArr,addExportDataBnt){
		$.ajax({
            url: "template/SearchNameBmap.html",
            success: function (datas) {
            	addNameSearchTem(datas,poiArr,addExportDataBnt);
            }
        });
	};
	var addAllNameSearchTem  = function(datas,data){
		var resultSearTips = Handlebars.compile(datas);
	   	 Handlebars.registerHelper("addOne",function(index){
	   		   return parseInt(index)+1;
	   	 });      
	   	$("#Bresult").html(resultSearTips(data));
	   
	};
	var getAllNameSearchTem = function(data){
		$.ajax({
			url: "template/SearchAllNameBmap.html",
			success: function (datas) {
				addAllNameSearchTem(datas,data);
			}
		});
	};
	var addMarker = function(i,point,bmap){
		
		var bd_icon_potion={
				imageOffset:new BMap.Size(-(i*24),-198)
		};
		var bd_Icon = new BMap.Icon("image/baiduMarker.png",new BMap.Size(19,29),bd_icon_potion);

		var bd_marker_option={
				icon:bd_Icon,
				enableClicking:true,
		};

		var bd_markers = new BMap.Marker(point,bd_marker_option);  // 创建标注
		bmap.addOverlay(bd_markers);
		
	};
	var nameSearchCallback = function(local,bmap,addExportDataBnt){
		var arrLocal = [];
		var curPageDataNum = local.getCurrentNumPois();
		for (var i = 0; i < curPageDataNum; i++) {
			var pois = local.getPoi(i);
			addMarker(i,pois.point,bmap);
			points.push(pois.point);
			arrLocal.push({
				title       : pois.title,	
				point       : pois.point,				
				url	        : pois.url,
				address	    : pois.address,
				city	    : pois.city,
				phoneNumber : pois.phoneNumber,
				postcode	: pois.postcode,
				type	    : pois.type, 
				province	: pois.province,
				tags	    : pois.tags,
				detailUrl	: pois.detailUrl
			});
		}
		bmap.setViewport(points);
		local.localPoi = arrLocal;
		getNameSearchTem(local,addExportDataBnt);
	};
	var initKeywordsSearch = function(bmap,addExportDataBnt){
		BNameSearch = new BMap.LocalSearch(bmap,{
			onSearchComplete:function(local){
				local.getNumPois()!==0 ? nameSearchCallback(local,bmap,addExportDataBnt):
					local.getCityList()==="" ? alert("sorry，百度没有找到与此关键字相关的点!"):
						getAllNameSearchTem(local);
			}
		});
	};
	var nameSearchBmap = function(searchCity,keywordsVal,BMaper,indexPage,addExportDataBnt){
		console.log("页码："+indexPage);
		indexPages = indexPage;
		if(indexPages!==1){
			BNameSearch.gotoPage(indexPage-1);
			return;			
		}
		initKeywordsSearch(BMaper.bmap,addExportDataBnt);
		BMaper.clearBmap(BMaper.bmap);
		BNameSearch.setLocation(searchCity);
		BNameSearch.search(keywordsVal);         //关键字搜索
	
	};
	return nameSearchBmap;
});
		