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
    
}

