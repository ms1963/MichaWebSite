// JavaScript Document
$(document).on("pageinit", function() {
	var fixedPos = new google.maps.LatLng(48.12666322, 11.57210137);
	
	if (navigator.geolocation) {
		function success(pos) {
			drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		}
		function failure(error) {
			drawMap(fixedPos);
		}
		navigator.geolocation.getCurrentPosition(success,failure, { maximumAge: 500000, enableHighAccuracy: true, timeout: 9000});
	}
	else {
		drawMap(fixedPos);
	}
	function drawMap(pos) {
		var opt = {
			zoom: 11,
			center: pos,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	
		var cmap = new google.maps.Map(document.getElementById("con"), opt);      
		var marker = new google.maps.Marker({
						position: pos,
						map: cmap
			         });
	}
});