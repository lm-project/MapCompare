
define(function (){
	return function(){
		if($("#qqFullScreen").css("width")==="45px"){
			$("#qqFullScreen").css("width","65px");
			$("#qqFullScreen").css("backgroundPosition","-267px -300px");
			//this.style.backgroundPosition="-267px -300px";
			//this.style.width="65px";
			$("#gaodeMap").hide();
			$("#centerDiv").hide();
			$("#otherMapContainer").css("width","100%");
		}
		else{
			$("#qqFullScreen").css("width","45px");
			$("#qqFullScreen").css("backgroundPosition","-223px -300px");
			//this.style.width="45px";
			//this.style.backgroundPosition="-223px -300px";
			$("#otherMapContainer").css("width","49%");
			$("#gaodeMap").show();
			$("#centerDiv").show();
		}
	};
	
	
});

