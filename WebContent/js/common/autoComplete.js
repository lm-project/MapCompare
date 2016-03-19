
define(function(){
	return function (obj,inputValue){
		var text='',district="",name="";
		var resultId = obj.id;
		district = $("#"+resultId +" span:last").text();
		name = $("#"+resultId +" span:first").text();
		var patt1 = new RegExp(name);
		var ok = patt1.test(district);
		if(ok){
			text = district;
		}else{
			text = district+name;
			}
		if(inputValue==="详细poi/城市/商圈/位置"){
			$("#txtKeywords").val(text);
		}else if(inputValue==="输入起点"||inputValue==="输入经度"){
			$("#firstValue").val(text);
		}else if(inputValue==="输入终点"||inputValue==="输入纬度"){
			$("#secondValue").val(text);
		}
		$("#autoCompleteDiv").css("display","none");

	}

});