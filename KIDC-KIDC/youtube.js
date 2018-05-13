var nextPageToken, prevPageToken, cantidad, query, auxcantidad;
var contador = 0;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var videosGeneral = [];
var map;
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyC9PnuBI8fHXVFU6OOUz7ZCX-cg5LeRCAo');
}

function search(){
    dibujarMapa();
    buscarTweets();
    cantidad = parseInt(document.getElementById('cantidad').value);
    auxcantidad = parseInt(document.getElementById('cantidad').value);
    query = document.getElementById('query').value;
    var pageToken;
    aux(cantidad, pageToken);
}

function aux(cantidad, pageToken){
    console.log("cantidad: "+ cantidad);
    if(cantidad<=0){
        console.log("menor a 0");
        encuentra();
        }else{
            if(cantidad<=50 ){
            var request = gapi.client.youtube.search.list({
            part: 'id',
            maxResults: cantidad,
            type: "video",
            order: "date",
            q:query
        });
        request.execute(onSearchResponse, pageToken);
        }else{
            var request = gapi.client.youtube.search.list({
            part: 'id',
            maxResults: 50,
            type: "video",
            order: "date",
            regionCode: "US",
            pageToken:pageToken,
            q:query
        });
        request.execute(onSearchResponse, pageToken);
        }
    }
}
function onSearchResponse(response, pageToken) {
cantidad = cantidad - 50;  
    var respuesta = response.result.items;
        for(var i in respuesta) {
            videosGeneral.push(response.result.items[i].id.videoId);
        }
        if(response.result.nextPageToken!==undefined){
        aux(cantidad, response.result.nextPageToken);
    }  
}
function encuentra(){
    //console.log(cantidad + " .cantidad");
    if(auxcantidad< 10){
        agregarVideos(0, auxcantidad);
    }else{
         agregarVideos(0, 10);
    }
    for(var i = 0; i < videosGeneral.length; i++){
        buscar(videosGeneral[i]);
    }
}

function buscar(_id) {
    return gapi.client.youtube.videos.list({
      "part": "snippet, player, recordingDetails",
      "id": _id
    })
        .then(function(response) {
            var titulo = response.result.items[0].snippet.title;
            var informacion = titulo  + "\n";
            var identificador = _id;
                if (response.result.items[0].recordingDetails!==undefined){
                    if(response.result.items[0].recordingDetails.location.latitude !== undefined){
                    var _latitud= response.result.items[0].recordingDetails.location.latitude;
                    var _longitud= response.result.items[0].recordingDetails.location.longitude;
                    crearMarcadores(_latitud, _longitud, identificador);
                }
            }        },
        function(err) {});
  }
  function agregarVideos(inicio, fin){   
    console.log(videosGeneral.length);
        console.log("auxcantidad > "+ auxcantidad);
        console.log("contador >  "+ contador);
  var _fila=document.getElementById("videos");
    for(var i = inicio; i<fin; i++){
        var _celda = document.createElement("td");
        var _div =document.createElement("div");
        var _iframe = document.createElement("iframe");
        _iframe.src= "//www.youtube.com/embed/" + videosGeneral[i];
        _iframe.width = "120";
        _iframe.height= "80";
        _iframe.class= "video w100";
        _div.appendChild(_iframe);
        _celda.appendChild(_div);
        _fila.appendChild(_celda);
    }
  }
function botonSiguiente(){
    auxcantidad = auxcantidad - 10;
    contador = contador + 10;
    borrar();
    if(auxcantidad > 10){
        agregarVideos(contador, contador+10);
    }else{
        console.log("no entro");
        agregarVideos(contador, auxcantidad);
    }
}
function botonAtras(){
    borrar();
    if(contador > 0){
        agregarVideos(contador, contador + 10);
    }
    auxcantidad = auxcantidad + 10;
    contador = contador - 10;
}
function borrar(){
    var _fila=document.getElementById("videos");
    console.log("arreglo: " + document.getElementById("videos").children.length);
    for(var i =document.getElementById("videos").children.length -1 ; i >= 0; i--){
        _fila.deleteCell(_fila.children[i]);
    }
}
