function dibujarMapa(){
    var uluru = {lat: 23.3133202, lng: -111.6576591};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: uluru
    });
}

function crearMarcadores(latitud, longitud, identificador){

	var _iframe = document.createElement("iframe");
        _iframe.src= "//www.youtube.com/embed/" + identificador;
        _iframe.width = "320";
        _iframe.height= "200";
        _iframe.class= "video w100"; 


    var uluru = {lat: latitud, lng: longitud};
    var infowindow = new google.maps.InfoWindow({
          content: _iframe
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
}

function marcarTweets(latitud, longitud, informacion){
        var image = "twitter-50x50.png"
     var uluru = {lat: latitud, lng: longitud};
        var infowindow = new google.maps.InfoWindow({
          content: informacion
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          icon: image
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      

        console.log("posicion: "+latitud + longitud);
    }