
define(function (){
	
	return function fullScreenBmap(){
		if($("#tool_fullScrF").text()=="全屏"){
			$("#bdFullScreen").css("width","65px");
			$("#tool_fullScrF").text("退出全屏");
			$("#gaodeMap").hide();
			$("#centerDiv").hide();
			$("#otherMapContainer").css("width","100%");
		}
		else{
			$("#bdFullScreen").css("width","43px");
			$("#tool_fullScrF").text("全屏");
			$("#otherMapContainer").css("width","49%");
			$("#gaodeMap").show();
			$("#centerDiv").show();
		}
	};
	
	
});

