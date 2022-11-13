window.onload = function() {
    var myOptions = {
        center: new google.maps.LatLng(34.239, -118.5285),
        zoom: 16.6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById("map"), myOptions);
}