define(["common/doInitListener" ],function(doInitListener){
	
		return function(AMaper,BMaper,SMaper,Sys){
			$("#changeMap").on("click","input",function(){
				doInitListener.changeMapFun(this,AMaper,BMaper,SMaper);
			});
			$("#allToolbar").on("click",".alltools",function(){
				doInitListener.commonToolBar(this,AMaper,BMaper,SMaper,Sys);
			});
			$("#openCity").on("click",function(){
				doInitListener.openCityList(AMaper,BMaper,SMaper );
			});
			$("#serInputDiv").on("focus blur","input",function(e){
				doInitListener.searchInputFocusFun(e,this,Sys,AMaper);
			});
			$("#btnSearch").on("click",function(){
				doInitListener.searchButton(AMaper,BMaper,SMaper);
			});
			$("#searchOption").on("click","div",doInitListener.selecteSearchType);
			$("#autoCompleteDiv").on("click","div",doInitListener.innerDataToSearInput);
			$("#Aresult,#Bresult,#Soresult").on("click mouseover mouseout","th:gt(0)",doInitListener.searchResultListEve);
			/**
			 *分页搜索
			 */
			$("#Aresult,#Bresult,#Soresult").on("click","button",function(){
				doInitListener.searchByPage(this,AMaper,BMaper,SMaper);
			});
			$("#Aresult,#Bresult,#Soresult").on("click","tr:gt(0)",function(){
				doInitListener.searchResultList(AMaper,BMaper,SMaper,this);
			});
			
		
		};
	
	
	
});