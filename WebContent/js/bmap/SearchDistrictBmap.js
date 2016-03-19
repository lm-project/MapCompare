/*
 * AMap.DistrictSearch行政区查询服务插件，提供全国各省、市、县、区的中心点经纬度、行政区边界坐标组、下级行政区等信息。根据行政区边界坐标组可在地图上绘制行政区边界。
 * 
 */
define(function(){
	function drawCityOutLine(arrPoint,BMaper){
			var polyline = new BMap.Polyline();
			polyline.setPath(arrPoint);
			polyline.setStrokeColor("#CC66CC");
			polyline.setStrokeWeight(2);
			polyline.setStrokeStyle("dashed");
			BMaper.bmap.addOverlay(polyline);
		
	}
	function addSearchCityResultTem(data){
		$.ajax({
            url: "template/SearchDistrictBmap.html",
            success: function (datas) {
            	 var SearchDistrictHTML = Handlebars.compile(datas);
            	 var m  = {"value":data};
        	   	 $("#Bresult").html(SearchDistrictHTML(m));

            }
        });
				
	}
	
	function districtSearchCallback(bounds,BMaper){
		if(bounds===null){return;};
		var arrPoint = [],arr = [];
		BMaper.clearBmap(BMaper.bmap);
		for(var i in bounds){
			var boundsArr = bounds[i];	
			arr.push(boundsArr);
			var boundsStr = boundsArr.toString();
			if(boundsStr===""){return;}
			var boundsStrArr = boundsStr.split(";");
			var l = boundsStrArr.length;
			for (var j=0;j<l;j++){
				var boundsMath = boundsStrArr[j].split(",");
				var pointObj = new BMap.Point(parseFloat(boundsMath[0]),parseFloat(boundsMath[1]));
				arrPoint.push(pointObj);
			}
			
		}
		BMaper.bmap.setViewport(arrPoint);
		drawCityOutLine(arrPoint,BMaper);
		addSearchCityResultTem(arr);
	};
	
	var districtSearchBMap = function(BMaper,districtName){

		var districtSearch = new BMap.Boundary();
		districtSearch.get(districtName,function(data){
			districtSearchCallback(data,BMaper);
		});
	
		
		
	};
	
	return districtSearchBMap;
	
	
});