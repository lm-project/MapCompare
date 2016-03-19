var gmap = null;
var GtrafficLayer=null;//实时路况图层对象

var infowindow;
var service;
 function initGMap(){//
	 createGgMap();                //创建地图
	 GgGeocoder();				   //地址解析
	 infowindow  = new google.maps.InfoWindow();//
	 // gugePlacesSearch();//初始化本地综合搜索
	 $("#ggZoom").text(gmap.getZoom());
	 gg_zoom_changed=google.maps.event.addListener(gmap,'zoom_changed',function(){
			$("#ggZoom").text(gmap.getZoom());
		});
 }
 function createGgMap(){
	 var mapOptions = {
	          center: new google.maps.LatLng(39.929986,116.395645),
	          zoom: 12,
	          rotateControl:true,
	          scaleControl: true,
	          scaleControlOptions: {
	              position: google.maps.ControlPosition.BOTTOM_LEFT
	          },
	         	overviewMapControl: true,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	  gmap = new google.maps.Map(document.getElementById("divGugeMap"),
	            mapOptions);
	  window.gmap = gmap;  
 }
 /*
  * google.maps.Geocoder class
  * A service for converting between an address and a LatLng. 
  */
 var gg_geocoder;
 var gg_geocoderSel;
 function GgGeocoder(){
	 gg_geocoder = new google.maps.Geocoder();	 
 }
 function GgGeocoderAddress(keywords){
	 gg_geocoder.geocode({"address":keywords},function(results,status){
		 if(status==google.maps.GeocoderStatus.OK){
			if(gg_geocoderSel==1){
				 gmap.setCenter(results[0].geometry.location);
				    //gugePlacesSearch(results[0].geometry.location);
				    var marker=new google.maps.Marker({
				           map:gmap,
				           position:results[0].geometry.location
				    });
			}else if(gg_geocoderSel==2){
				gmap.setCenter(results[0].geometry.location);
			}
		   
		 } 
	 });
 }
 function Gsearch(areaName) { 
	 gg_geocoderSel=1;
	 GgGeocoderAddress(areaName);
}
/*
 * google.maps.places.PlacesService类
 * 包含与寻找地方和检索有关地点的详细信息的方法
 */
//创建一个新的实例PlacesService呈现在指定的容器中归属
function gugePlacesSearch(areaName){
	var request = { location: areaName};
	var Gresult=document.getElementById("Gresult");
	service = new google.maps.places.PlacesService(Gresult);
	service.getDetails(request,callback);
}

//鏈嶅姟鎼滃鍥炶皟鍑芥暟
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}
//娣诲姞鏍囨敞
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: gmap,
    position: place.geometry.location
  });
	google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(gmap, this);
  });
}
//视野内搜索
function ggInsightSearch(keyword){
	var Gresult=document.getElementById("Gresult");
	service = new google.maps.places.PlacesService(Gresult);
	var Grender=gmap.getCenter();
	 var request = {
		 keyword:keyword,
	 	 radius: 2000,
         location: Grender
    };
	 service.nearbySearch(request);//谷歌
}
//实时路况
function ggTrafficLayer(){//谷歌
	if(GtrafficLayer==null){
		GtrafficLayer=new google.maps.TrafficLayer();
		GtrafficLayer.setMap(gmap);
	}else{
		GtrafficLayer.setMap(null);
		GtrafficLayer=null;
	}
}
//鼠标联动
var gg_dragend;
var gg_zoom_changed;
function ggAddCursorEvent(){
	gg_zoom_changed=google.maps.event.addListener(gmap,'zoom_changed',function(){
		var gg_zoom=gmap.getZoom();
		mapObj.setZoom(gg_zoom);			//高德
	});
	gg_dragend=google.maps.event.addListener(gmap,'dragend',function(){
		var gg_center_point=gmap.getCenter();
		mapObj.panTo(new AMap.LngLat(gg_center_point.lng(),gg_center_point.lat()));
	});
}
function ggRemoveCursorEvent(){
	google.maps.event.removeListener(gg_dragend);
	google.maps.event.removeListener(gg_zoom_changed);
}
