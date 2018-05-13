var cb =new Codebird();
cb.setConsumerKey ( "XDRdKxPJOK8ClzUVl6RKAlaRc" , "23GZxIl0kW11fT4o7zFFOI4vTVwF8Y9EMthBrNJEprES9U3BSB" );
cb.setToken ( "842057213246087173-ZdEsCIi7gm0fUF166Rw4KCSqfBi0Jw9", "cKlTbMJ4h61LxRBsuKomryy94bKhgvwnxqJxeYBWAFuBk");

function buscarTweets(){
    //var query = document.getElementById('query').value;
    var q = document.getElementById("query").value;
    console.log(q);
    var params = {
        q: q,
        count: 100
        //max_id:0
    };
    cb.__call(
        "search_tweets",
        params,
        function(response){
            console.log("cantidad: " + response.statuses.length);

          console.log("-------------------");
          var _cuerpo =  document.getElementById("tcuerpot");
                      console.log(response);
          for(var i=0;i<response.statuses.length;i++){
            //console.log("i: "+ titulo);
            var titulo = response.statuses[i].text;
            if(response.statuses[i].coordinates!==null){
                var lat = response.statuses[i].coordinates.coordinates[1];
                var lng = response.statuses[i].coordinates.coordinates[0];
                marcarTweets(lat,lng, titulo);
              }

            var _fila = document.createElement("tr");
            var _celda = document.createElement("td");
            var _pararfo = document.createElement("p");
            //console.log("dentro del for");
            _pararfo.textContent = titulo;
            _celda.appendChild(_pararfo);
            _fila.appendChild(_celda);

            var _celda = document.createElement("td");
            var _botonAgregar = document.createElement("button");
            _botonAgregar.textContent="Retwit";
            
            _botonAgregar.id = i;
            _botonAgregar.addEventListener("click", function(obj_evento){funcionAgregar(titulo);},false);
            _celda.appendChild(_botonAgregar);
            _fila.appendChild(_celda); 

            _cuerpo.appendChild(_fila);
          }
        }
    );
}

