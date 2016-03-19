define(function(){
	var focusEve = {};
	focusEve.focusEvent = function(obj,Sys,AMaper,lastSelected){
		if(Sys.ie){
			obj.onpropertychange = function(){
				if(obj.value==="" || lastSelected === "coordinate"){
					$("#autoCompleteDiv").css("display","none");
					return;
				};
				AMaper.autoCompleteAmap(obj.value,AMaper.amap);
			};
		}else{
			obj.oninput = function(){
				if(obj.value ==="" || lastSelected ==="coordinate"){
					$("#autoCompleteDiv").css("display","none");
					return;
				};
				AMaper.autoCompleteAmap(obj.value,AMaper.amap);
			};	
		}
	};
	
	focusEve.focusoutEvent = function(obj,Sys,inputValue){
		if(obj.value===''){
			if(inputValue==="详细poi/城市/商圈/位置"){
				obj.value='详细poi/城市/商圈/位置';
			}else if(inputValue==="输入起点"){
				$(obj).val('输入起点');	
			}else if(inputValue==="输入经度"){
				$(obj).val('输入经度');		
			}else if(inputValue==="输入终点"){
				$(obj).val('输入终点');	
			}else if(inputValue==="输入纬度"){
				$(obj).val('输入纬度');	
			}
			if($("#autoCompleteDiv").css("display")==="block"){
				$("#autoCompleteDiv").css("display","none");
			}
			if(Sys.ie){
				obj.onpropertychange = null;
			}else{
				obj.oninput = null;
			} 
		}else{return false;}				

	};
	return focusEve;
});