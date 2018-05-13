
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var videosLocalizacion = [];
var videosGeneral = [];
var map;
var nextPageToken;

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyBefjkR8aNYZ4iyrGPeaaN4cV3UVtG64F0');
}


function search() {
    var cantidad = parseInt(document.getElementById('cantidad').value);
    var query = document.getElementById('query').value;
    if(cantidad <= 50){
        var request = gapi.client.youtube.search.list({
        part: 'id',
        maxResults: cantidad,
        type: "video",
        order: "date",
        regionCode: "US",
        q:query
    });
    request.execute(onSearchResponse);
    }else{

    }
}
function onSearchResponse(response, pageToken) {   
    var responseString = JSON.stringify(response.result);
    var responseYoutube = JSON.parse(responseString);
    var responseItems = responseYoutube.items;
        for(var i in responseItems) {
            buscar(response.items[i].id.videoId);
        }

        for(var i = 0; i<10; i++){
            agregar(response.items[i].id.videoId);
        }
}

function dibujarMapa(){
    var uluru = {lat: 23.3133202, lng: -111.6576591};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: uluru
    });
}

function buscar(_id, nextPageToken) {
       var _cuerpo = document.getElementById("tcuerpo");


    dibujarMapa();
    return gapi.client.youtube.videos.list({
      "part": "snippet, player, recordingDetails",
      "id": _id
    })
        .then(function(response) {
            for(var i = 0; i <= response.result.items.length; i++){
                videosGeneral.push(response.result.items[i]);
                if (response.result.items[i].recordingDetails!==undefined){
                    if(response.result.items[i].recordingDetails.location.latitude !== undefined){
                        videosLocalizacion.push(response.result.items[i]);
                    var _latitud= response.result.items[i].recordingDetails.location.latitude;
                    var _longitud= response.result.items[i].recordingDetails.location.longitude;
                    //console.log("titulo: " + response.result.items[i].snippet.title);
                }
            }
            crearMarcadores(_latitud, _longitud);
        }

        },
        function(err) {});
  }

function crearMarcadores(latitud, longitud){
    var uluru = {lat: latitud, lng: longitud};
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
}


function agregar(_id){
     var _cuerpo = document.getElementById("tcuerpo");
    return gapi.client.youtube.videos.list({
      "part": "snippet, player, recordingDetails",
      "id": _id
    })
        .then(function(response) {
            for(var i = 0; i < response.result.items.length; i++){
            var identificador = _id;
        var titulo = response.result.items[i].snippet.title;

        var _fila = document.createElement("tr");
        var _celda = document.createElement("td");
        var _pararfo = document.createElement("p");
        _pararfo.textContent = titulo;
        _celda.appendChild(_pararfo);
        _fila.appendChild(_celda);

        var _celda = document.createElement("td");
        var _div =document.createElement("div");
        var _iframe = document.createElement("iframe");
        _iframe.src= "//www.youtube.com/embed/" + identificador;
        _iframe.width = "150";
        _iframe.height= "100";
        _iframe.class= "video w100";

        _div.appendChild(_iframe);
        _celda.appendChild(_div);
        _fila.appendChild(_celda);

        var _celda = document.createElement("td");
        var _botonAgregar = document.createElement("button");
        _botonAgregar.textContent="Agregar";
        _botonAgregar.id = identificador;
        _botonAgregar.addEventListener("click", function(obj_evento){funcionAgregar(titulo);},false);
        _celda.appendChild(_botonAgregar);
        _fila.appendChild(_celda);

        _cuerpo.appendChild(_fila);
        }

        },
        function(err) {});

}
