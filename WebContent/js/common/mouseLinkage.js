define(function(){
	
	
	var linkMouse = function (AMaper,BMaper,SMaper,IMaper){
		if($("#curLinkText").text()==="鼠标联动"){		 
			 $("#linkage").css("background","#FCF4AD");
			 $("#curLinkText").text("关闭联动");
			
			 if(IMaper===null){
				 AMaper.curLinkAmap.addCurLinkAMap(AMaper,BMaper,SMaper,null);
			 }else{
				 AMaper.curLinkAmap.addCurLinkAMap(AMaper,BMaper,SMaper,IMaper);				 
				 IMaper.curLinkImap.addCurLinkIMap(AMaper,IMaper.imap);
			 }
			 BMaper.curLinkBmap.addCurLinkBMap(AMaper,BMaper);
			 SMaper.curLinkSmap.addCurLinkSMap(AMaper,SMaper);
		 }else{		 
			 $("#linkage").css("background","#FAFAFA");
			 $("#curLinkText").text("鼠标联动");
			 AMaper.curLinkAmap.removeCurLinkAMap();
			 BMaper.curLinkBmap.removeCurLinkBMap();
			 SMaper.curLinkSmap.removeCurLinkSMap();
			 if(IMaper!==null){
				 IMaper.curLinkImap.removeCurLinkIMap();
			 }
		 }
	};
	return linkMouse;
});