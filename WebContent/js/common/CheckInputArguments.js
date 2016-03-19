define(function(){
	function checkInputArguments(lastSelected,firstInputVal,secondInputVal,keywordsVal){
		if($("#autoCompleteDiv").css("display")==="block"){
			$("#autoCompleteDiv").css("display","none");
		}
		//判断单搜索框的值是否为要求
		if(lastSelected === "place" || lastSelected === "streetView" ){
			return keywordsVal === ""||keywordsVal === "详细poi/城市/商圈/位置" ?false:true;
		}else{
			
			return firstInputVal==''||secondInputVal==''||
			       firstInputVal=="输入起点"||secondInputVal=='输入终点'||
				   firstInputVal=="输入经度"||secondInputVal=='输入纬度' ? false :true;
				
		}
	}
	
	return checkInputArguments;
});