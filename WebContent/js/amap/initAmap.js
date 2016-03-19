define(function (){
	var amapOpts = { 
			view: new AMap.View2D({			//创建地图二维视口
				center:new AMap.LngLat(116.395645,39.929986), //设置地图中心点   
				zoom:12, 					//设置地图缩放级别
				rotation:0,					//设置地图旋转角度
			}),	
			resizeEnable:true
			//rotateEnable		:true,	//地图是否可旋转，默认false
	} ; 
	var amap = new AMap.Map("divAMap", amapOpts);
	amap.plugin(["AMap.ToolBar","AMap.OverView","AMap.Scale"],function(){  
		//加载工具条  
		var tool = new AMap.ToolBar({  
			direction:true,					//显示方向导航  
			ruler:true,						//显示视野级别控制尺  
			autoPosition:false				//禁止自动定位  
		});  
		amap.addControl(tool);
		//加载鹰眼  
		view = new AMap.OverView();  
		amap.addControl(view);  
		//加载比例尺  
		scale = new AMap.Scale();  
		amap.addControl(scale);  
	});
	var getGdZoom = function(){
		$("#gdMapZoom").html(amap.getZoom());
	};
	AMap.event.addListener(amap,"zoomchange",getGdZoom);
	getGdZoom();
	return amap;
});



	

		
		
		
		


/*		mapObj.setCenter(new AMap.LngLat( markers[0].getPosition().getLng() , markers[0].getPosition().getLa() ) );
	
 * mapObj.setDefaultCursor("default");
 * 
		var opt = {
//				view: new AMap.View2D({	
					level : 15, // 设置地图缩放级别
					center : new AMap.LngLat(116.397428, 39.90923)// 设置地图中心点
//				}),
				resizeEnable : true,
		
		}; 
 * MapCompare.AMaper.InitAMap=function (){
	var amap = null;
		var amapOpts = { 
				view: new AMap.View2D({//创建地图二维视口
					center:new AMap.LngLat(116.395645,39.929986), //设置地图中心点   
					zoom:12, //设置地图缩放级别
					rotation:0,//设置地图旋转角度
				}),	
				resizeEnable:true
				//rotateEnable		:true,	//地图是否可旋转，默认false
		} ; 
		amap = new AMap.Map("divAMap", amapOpts);
		amap.plugin(["AMap.ToolBar","AMap.OverView","AMap.Scale"],function(){  
			//加载工具条  
			tool=new AMap.ToolBar({  
				direction:true,//显示方向导航  
				ruler:true,//显示视野级别控制尺  
				autoPosition:false//禁止自动定位  
			});  
			amap.addControl(tool);
			//加载鹰眼  
			view=new AMap.OverView();  
			amap.addControl(view);  
			//加载比例尺  
			scale=new AMap.Scale();  
			amap.addControl(scale);  
		});
		//MapCompare.amapObj = amap;
		
		var getGdZoom = function(){
			$("#gdMapZoom").html(MapCompare.amapObj.getZoom());
		};
		AMap.event.addListener(MapCompare.amapObj,"zoomchange",getGdZoom);
		
		getGdZoom();
		return amap;
		
}();*/

/**/
/*
//为school添加students模块
school.students = (function() {
 // 这里定义了很多类如课程类/成绩类, 使用局部变量和函数
 function Subject() {  ...  }
 function Grade() {  ...  }

 // 通过返回命名空间对象将API导出
 return {
     Subject: Subject,
     Grade: Grade
 };
})();
school.students = (new function() {
    // ..... 这里省略了代码 ......

    // 将API导到this对象中
    this.Subject = Subject;
    this.Grade = Grade;

    // 注意，这里没有返回值
}());    // 括号写在里面。这里是创建新实例，new后面应紧跟构造函数的调用而不是表达式
//如果已经定义了命名空间对象
var school;                // 创建school命名空间
if(!school) school = {};
school.students = {};    // student命名空间已经定义
(function(students) {
    // ..... 这里省略了代码 ......

    // 将公共API导到上面定义的命名空间中
    students.Subject = Subject;
    students.Grade = Grade;
    // 这里也不需要返回值
})(school.students);
var module1 = new Object({
	_count : 0,
	m1 : function (){
	},
	m2 : function (){	
	}
});
module1.m1();

Calculator.prototype = function () {
    add = function (x, y) {
        return x + y;
    },

    subtract = function (x, y) {
        return x - y;
    }
    return {
        add: add,
        subtract: subtract
    }
} ();
new Calculator().add(11, 3);
define(function (){
	var add = function (x,y){
	return x+y;
	};
	return {
		add: add
	};
	});//requer.js
define(['myLib'], function(myLib){
	function foo(){
		myLib.doSomething();
	}
	return{
		foo : foo
		
	}
});*/
/*******************************初始化地图对象，加载地图********************************************************/  
/*function createMapObj(){
	var opt = { 
			resizeEnable:true,
			level: 12, //设置地图缩放级别    
			center: new AMap.LngLat(116.395645,39.929986) //设置地图中心点   
		} ; 
		mapObj = new AMap.Map("iCenter", opt);
		window.mapObj=mapObj;
}
//地图操作工具条插件。可支持方向导航、位置定位、视野级别缩放、视野级别选择等操作。
function AmaptoolPlugin(){
	mapObj.plugin(["AMap.ToolBar","AMap.OverView","AMap.Scale"],function(){  
		  //加载工具条  
			  tool=new AMap.ToolBar({  
			  direction:true,//显示方向导航  
			  ruler:true,//显示视野级别控制尺  
			  autoPosition:false//禁止自动定位  
		  });  
		  mapObj.addControl(tool);
		  //加载鹰眼  
		  view=new AMap.OverView();  
		  mapObj.addControl(view);  
		  //加载比例尺  
		  scale=new AMap.Scale();  
		  mapObj.addControl(scale);  
	});
}
//获取地图的级别
function getGdZoom(){
	var gdZoom= mapObj.getZoom();
	$("#gdMapZoom").html("级别："+gdZoom);
}

 * 设置地图函数
 
//添加监听
function addListenerZoomchange(){
	AMap.event.addListener(mapObj,"zoomchange",getGdZoom);}
*//*******************************搜索***************************************************//*
*//**
 * AMap.Autocomplete 插件
 * 根据输入关键字提示匹配信息，可将Poi类型和城市作为输入提示的限制条件。
 * 
 *//*

//搜索提示
var auto;
var tipArr = []; 
var resultSearTips = "";
function autoSearch() {
    //加载输入提示插件  
    mapObj.plugin(["AMap.Autocomplete"], function() {     
       auto = new AMap.Autocomplete();   //创建提示输入功能对象 
       AMap.event.addListener(auto,"complete",function(data){
    	   if(typeof(data.count)==="undefined" ){
	           document.getElementById("result1").style.display = "none"; 
	            return;
    	    }
    	    resultSearTips = "";
    	    tipArr = data.tips;				//输入提示列表    	       	    
    	    for (var i = 0; i < tipArr.length; i++) {
	        	resultSearTips += 
	        		  "<div id='atuoId"+i+"'>"+tipArr[i].name 
	        		  +"<span>"+tipArr[i].district+"<span></div>";  	 
	        }          	 
    	    document.getElementById("result1").innerHTML = resultSearTips;  
    	    document.getElementById("result1").style.display = "block";
        });        
    });  
} 
 function gdAutoComplete(obj){
	 var keywords=obj.value;
	 if(document.getElementById('coordinate').className=="action"||keywords=='')return;
	 if(keywords=="起点"||keywords=="终点"){return;}
	 clearAllOverlayAndAresults();
	 auto.search(keywords);      //根据关键字匹配信息
 }
*/