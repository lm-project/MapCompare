var gmap = null;
var GtrafficLayer=null;//ʵʱ·��ͼ�����

var infowindow;
var service;
 function initGMap(){//
	 createGgMap();                //������ͼ
	 GgGeocoder();				   //��ַ����
	 infowindow  = new google.maps.InfoWindow();//
	 // gugePlacesSearch();//��ʼ�������ۺ�����
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
 * google.maps.places.PlacesService��
 * ������Ѱ�ҵط��ͼ����йصص����ϸ��Ϣ�ķ���
 */
//����һ���µ�ʵ��PlacesService������ָ���������й���
function gugePlacesSearch(areaName){
	var request = { location: areaName};
	var Gresult=document.getElementById("Gresult");
	service = new google.maps.places.PlacesService(Gresult);
	service.getDetails(request,callback);
}

//服务搜寻回调函数
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}
//添加标注
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
//��Ұ������
function ggInsightSearch(keyword){
	var Gresult=document.getElementById("Gresult");
	service = new google.maps.places.PlacesService(Gresult);
	var Grender=gmap.getCenter();
	 var request = {
		 keyword:keyword,
	 	 radius: 2000,
         location: Grender
    };
	 service.nearbySearch(request);//�ȸ�
}
//ʵʱ·��
function ggTrafficLayer(){//�ȸ�
	if(GtrafficLayer==null){
		GtrafficLayer=new google.maps.TrafficLayer();
		GtrafficLayer.setMap(gmap);
	}else{
		GtrafficLayer.setMap(null);
		GtrafficLayer=null;
	}
}
//�������
var gg_dragend;
var gg_zoom_changed;
function ggAddCursorEvent(){
	gg_zoom_changed=google.maps.event.addListener(gmap,'zoom_changed',function(){
		var gg_zoom=gmap.getZoom();
		mapObj.setZoom(gg_zoom);			//�ߵ�
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
