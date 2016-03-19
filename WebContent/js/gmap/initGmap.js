
MapCompare.GMaper = function () {
	 var gmapOptions = {
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
	  var gmap = new google.maps.Map(document.getElementById("divGugeMap"), gmapOptions);
	  
	  MapCompare.gmapObj = gmap;
}();
