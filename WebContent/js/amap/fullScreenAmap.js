define(function (){
	return function fullScreenAmap (){
			if($("#gdFullScreen").text()==="全屏"){
				$("#gdFullScreen").text("退出全屏");
				$("#otherMapContainer").hide();
				$("#centerDiv").hide();
				$("#gaodeMap").css("width","100%");
			}
			else{
				$("#gdFullScreen").text("全屏");
				$("#gaodeMap").css("width","49%");
				$("#centerDiv").show();
				$("#otherMapContainer").show();
			}	
	};
	
});


/*
MapCompare.AMaper.FullScreenAMap=function (){
	
	if($("#gdFullScreen").text()==="全屏"){
		$("#gdFullScreen").text("退出全屏");
		$("#otherMapContainer").hide();
		$("#centerDiv").hide();
		$("#gaodeMap").css("width","100%");
	}
	else{
		$("#gdFullScreen").text("全屏");
		$("#gaodeMap").css("width","49%");
		$("#centerDiv").show();
		$("#otherMapContainer").show();
	}
};

*/