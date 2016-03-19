define(function(){
	
	var selectSearchType = {};	
	selectSearchType.nameStreetviewSearch = function(){
		
		$("#coorPolicy").css("display","none");
		$("#twoSerInput").css("display","none");
		$("#txtKeywords").css("display","block");
	};
	selectSearchType.busDrivingSearch = function(){
		$("#coorPolicy").css("display","none");
		$("#txtKeywords").css("display","none");
		$("#twoSerInput").css("display","block");	
		$("#firstValue"). val('输入起点');
		$("#secondValue").val('输入终点');	
		
	};
	selectSearchType.lngLatSearch = function(){

		$("#txtKeywords").css("display","none");
		$("#twoSerInput").css("display","block");
		$("#coorPolicy").css("display","block");		
		$("#firstValue"). val('输入经度');
		$("#secondValue").val('输入纬度'); 
	};	
	
	return selectSearchType;
	
});