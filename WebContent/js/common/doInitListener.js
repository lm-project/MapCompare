define([
        "common/changeMap",
        "common/cityList",
        "common/mouseLinkage",
        "common/changeMapLayer",
        "common/searchInputFocusEve",
        "common/selectSearchType",
        "common/autoComplete",
        "common/SearchType",
        "common/CheckInputArguments",
        "common/showCloseSearchResult",
        "common/exportData"
        
       ],function(
    		   changeMap,
    		   cityeList,
    		   mouseLinkage,
    		   changeMapLayer,
    		   searchInputFocusEve,
    		   selectSearchType,
    		   autoComplete,
    		   searchType,
    		   checkInputArguments,
    		   showCloseSearchResult,
    		   addExportDataBnt
    	){
	
		var IMaper = null,
			lastSelected = "place",
			inputValue = "",
			controlEvent = 0,
			saveKeyWordsVal = "",
			doInitListenerObj = {};
		doInitListenerObj.changeMapFun = function(obj,AMaper,BMaper,SMaper){
			changeMap.changeMap(obj,AMaper,BMaper,SMaper,IMaper);
			
			setTimeout(function(){
				if(changeMap.IMaper===undefined){return;}
				IMaper = changeMap.IMaper;
				
			}, 1000);
			
		};
	
		doInitListenerObj.commonToolBar = function(obj,AMaper,BMaper,SMaper,Sys){
			var toolBntIndex = $(obj).index();
			switch (toolBntIndex) {
				case 1:
					changeMapLayer.normalLayer(AMaper,BMaper,SMaper);					
					break;
				case 2:
					changeMapLayer.satelliteLayer(AMaper,BMaper,SMaper);
					break;
				case 3:
					changeMapLayer.threeDLayer(AMaper,BMaper,SMaper);
					break;
				case 4:
					changeMapLayer.streetViewLayer(AMaper,BMaper,SMaper,Sys);
					break;
				
				case 5:
					changeMapLayer.realTrafficLayer(AMaper,BMaper,SMaper);
					break;
				case 6:
					mouseLinkage(AMaper,BMaper,SMaper,IMaper);				
					break;
				case 8:
					MapCompare.AMaper.ClearAMap();				
					break;
				default:break;
			}
		};
		
		doInitListenerObj.openCityList = function(AMaper,BMaper,SMaper){
			$("#cityList").css("display","block");
			$.ajax({
	            url: "data/cityList.json",
	            cache:true,
	            dataType:"json",
	            success: function (data) {
	            	cityeList(data,AMaper,BMaper,SMaper);
	            }
	        });
		};
		
		doInitListenerObj.searchInputFocusFun = function(e,obj,Sys,AMaper){	
				if(e.type==="focusin"){
					var inputText = obj.value;
					if(
							inputText==="详细poi/城市/商圈/位置"||
							inputText==="输入起点"||
							inputText==="输入经度"||
							inputText==="输入终点"||
							inputText==="输入纬度"
						)
					{
						inputValue = obj.value;
						obj.value = "";
					}	
					
					searchInputFocusEve.focusEvent(obj,Sys,AMaper,lastSelected);
				}else if(e.type=="focusout"){
					searchInputFocusEve.focusoutEvent(obj,Sys,inputValue);
				}
		};

		doInitListenerObj.selecteSearchType = function() {
			$(this).attr("class","selected");
			$("#"+lastSelected).attr("class","select");
			lastSelected = this.id;
			//单搜索框事件
			if(lastSelected==="place"||lastSelected==="streetView"){
				selectSearchType.nameStreetviewSearch();
			}else if(lastSelected=="busRoute"||lastSelected=="driveRoute"){
				selectSearchType.busDrivingSearch();
			}else {//坐标事件
				selectSearchType.lngLatSearch();
			
			}
		};
			
		doInitListenerObj.innerDataToSearInput = function(){
			autoComplete(this,inputValue);
		};
		doInitListenerObj.searchButton = function(AMaper,BMaper,SMaper){
			var firstInputVal  =  $("#firstValue").val();
			var secondInputVal =  $("#secondValue").val();
			var keywordsVal = $("#txtKeywords").val();
			var searchCity = $("#curCity").text();
			console.log("firstInputVal："+firstInputVal);
			console.log("secondInputVal："+secondInputVal);
			console.log("keywordsVal："+keywordsVal);
			console.log("searchCity："+searchCity);
			var ok = checkInputArguments(lastSelected,firstInputVal,secondInputVal,keywordsVal);
			saveKeyWordsVal = keywordsVal;
			console.log("搜索的类型是："+lastSelected+";符合条件："+ok);
			if(ok&&lastSelected==="place"){
				searchType.searchPlace(keywordsVal,AMaper, BMaper, SMaper,1,addExportDataBnt,searchCity);
				return ;
			}
			if(ok&&lastSelected==="streetView"){
				searchType.searchStreetView( keywordsVal,AMaper, BMaper, SMaper);
				return;
			}
			if(ok&&lastSelected==="busRoute"){
				searchType.searchBusRoute(firstInputVal ,secondInputVal,AMaper, BMaper, SMaper);
				return;
			}
			if(ok&&lastSelected==="driveRoute"){
				searchType.searchDriveRoute(firstInputVal ,secondInputVal, AMaper, BMaper, SMaper);
				return;
			}
			if(ok && lastSelected === "coordinate"){
				searchType.searchCoordinate(firstInputVal ,secondInputVal, AMaper, BMaper, SMaper);
				return;
			}
		};
		

		doInitListenerObj.searchByPage = function(obj,AMaper,BMaper,SMaper){
			var whichMap = $(obj).attr("class");
			var totalPage = parseInt($("#"+whichMap+"Total").text());
			var curpage =  parseInt($("#"+whichMap+"Input").val());
			var whichBnt = $(obj).text();
			console.log("whichMap:"+whichMap+"   当前页码为："+curpage+"   总页码："+totalPage+"   点击的按钮："+whichBnt);

			var nowpage = whichBnt==="上一页" &&  curpage > 1 ? curpage-1 : 
				whichBnt==="下一页" && curpage < totalPage ? curpage+1 :
					whichBnt==="GO" && 0< curpage && curpage<= totalPage ? curpage :100000;
			console.log("现在页码："+nowpage);
			if( nowpage===curpage&&whichBnt!=="GO" || nowpage === 100000){
				return;
			}
			
			if( whichMap==="goPageAmap" ){
				searchType.searchPlace(saveKeyWordsVal,AMaper, BMaper, SMaper,
						nowpage,addExportDataBnt,$("#curCity").text());
				return;
			}
			if( whichMap==="goPageBmap" ){
				BMaper.searchNameBmap($("#curCity").text(),saveKeyWordsVal,BMaper,nowpage,addExportDataBnt); 
				return;
			}
			if( whichMap==="goPageSmap" ){
				SMaper.searchNameSmap($("#curCity").text(),saveKeyWordsVal,SMaper,nowpage,addExportDataBnt);
				return;
			}
			
		}	
//		点击标题栏查看详细信息
		var lastSeq = 0;
		doInitListenerObj.searchResultListEve = function(e){
			var resultListId = $(this).parent().parent().parent().parent().parent().attr("id");
			if(e.type=="mouseover"){
	    		$(this).css("background","#CAE1FF");
	    	}else if(e.type=="mouseout"){
	    		$(this).css("background","yellow");
	    	}else if(e.type=="click"){
	    		var tdSeq = $(this).parent().find("th").index($(this)[0]);
	    		console.log("-----"+tdSeq);
	        	var attrValue = $(this).text();
	        	if( attrValue.indexOf("退出") === 0 ){
	        		showCloseSearchResult.closeSearchResult(tdSeq,attrValue,resultListId)
	        		lastSeq = 0;
	        	}else if(lastSeq==0){
	        		showCloseSearchResult.showSearchResult(tdSeq,attrValue,resultListId);
	        		lastSeq = 1;
	        	}else{
	        		return;
	        	} 
	    	}   	
		};
		
		doInitListenerObj.searchResultList = function(AMaper,BMaper,SMaper,obj){
			$(obj).attr("id","tmpId");
			var keyVal = $("#curCity").text()==="中国" ? saveKeyWordsVal:
				$("#tmpId td:eq(1)").text();
			var cityVal = $("#curCity").text()==="中国" ? $("#tmpId td:eq(1)").text() :
					$("#curCity").text();
			console.log("城市："+cityVal+"   关键字："+keyVal);
			$(obj).removeAttr("id");
			$("#txtKeywords").val(keyVal);
			$("#curCity").text(cityVal);
			doInitListenerObj.searchButton(AMaper,BMaper,SMaper,keyVal,cityVal);
		};
		return doInitListenerObj;
});

