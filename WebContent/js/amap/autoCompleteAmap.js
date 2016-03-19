
/**
 * AMap.Autocomplete 插件
 * 根据输入关键字提示匹配信息，可将Poi类型和城市作为输入提示的限制条件。
 * 
 */

define(function (){
	var auto = null;
	var getAutoCompleteTem = function(data){
		$.ajax({
			url:"template/autoComplete.html",
			cache:false,
			success:function(datas){				
				var autoCompleteTem = Handlebars.compile(datas);
				$("#autoCompleteDiv").html(autoCompleteTem(data));
			}
		});


	};
	var autoCompleteResults = function(data){
		if(typeof(data.count)==="undefined" ){
			$("#autoCompleteDiv").css("display","none"); 
            return;
 	    }
		getAutoCompleteTem(data);
 	   $("#autoCompleteDiv").css("display","block");
	};
	function initAutoComplete(amap){
	
		amap.plugin(["AMap.Autocomplete"], function() {     
			auto = new AMap.Autocomplete();   //创建提示输入功能对象 
			AMap.event.addListener(auto,"complete",autoCompleteResults);        
		});  
	}
	return  function(keywords,amap){
		 initAutoComplete(amap);
		 auto.search(keywords);      //根据关键字匹配信息
	 };
});


