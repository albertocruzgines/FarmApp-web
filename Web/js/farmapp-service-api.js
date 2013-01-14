var API_BASE_URL="http://localhost:8080/Farmapp/ServiceServlet?";
var ERROR_PAGE="#";

function checkUser(username,callback){
	
	var url=API_BASE_URL + "action=checkuser&email=" + username + "&callback=?";
		
		var jqxhr=$.jsonp({
			url:url, 
			success: function(response){
			callback(response);
			}
		}).fail(function(){
			window.location.href=ERROR_PAGE;
		});
}

function login(username,password,callback){
	
	var url=API_BASE_URL + "action=login&email=" + username + "&password=" + password + "&callback=?";
		
		var jqxhr=$.jsonp({
			url:url, 
			success: function(response){
			callback(response);
			}
		}).fail(function(){
			window.location.href=ERROR_PAGE;
		});
}

function logged(callback){
	
	var url=API_BASE_URL + "action=logged&callback=?";
		
		var jqxhr=$.jsonp({
			url:url, 
			success: function(response){
			callback(response);
			}
		}).fail(function(){
			window.location.href=ERROR_PAGE;
		});
}

function logout(callback){

	var url=API_BASE_URL + "action=logout&callback=?";
		
		var jqxhr=$.jsonp({
			url:url, 
			success: function(response){
			callback(response);
			}
		}).fail(function(){
			window.location.href=ERROR_PAGE;
		});
}
function search(q, callback) {
  var url = API_BASE_URL + "action=search&query=" + q + "&callback=?";
  url = encodeURI(url);
  var jqxhr = $.jsonp({
    url: url,
    success: function(response) {
      callback(response);
    },
  }).fail(function() {
    window.location.href = ERROR_PAGE;
  });
}

function registerfarm(name,surname,email,telefono,password,direccion,ciudad,callback){

  var url=API_BASE_URL+"action=register&email="+email+"&telefono="+telefono+"&direccion="+direccion+"&ciudad="+ciudad+"&password="+password+"&name="+name+"&surname="+surname+"&telefono="+telefono+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response,username){
        callback(response,username);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}


function register(name,surname,email,telefono,password,direccion,ciudad,callback){

  var url=API_BASE_URL+"action=register&email="+email+"&telefono="+telefono+"&direccion="+direccion+"&ciudad="+ciudad+"&password="+password+"&name="+name+"&surname="+surname+"&telefono="+telefono+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response,username){
        callback(response,username);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function info(username,callback){
  var url=API_BASE_URL+"action=info&email="+username+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response,username){
        callback(response,username);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}


function farma(callback){
  var url=API_BASE_URL+"action=listfarmacias&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function newfarma(callback){
  var url=API_BASE_URL+"action=listfarmaceuticos&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}
function lproductos(callback){
  var url=API_BASE_URL+"action=listproductos&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}



function mifarma(email, callback){
  var url=API_BASE_URL+"action=infofarm&email="+email+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}
function productosfarm(username, callback){
  var url=API_BASE_URL+"action=listprod&id_farmaceutico="+username+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function registernewfarm(email,nombre,ciudad,latitud,longitud,direccion,horario,callback){
 //alert("email: "+email+"nombre: "+nombre+"ciudad: "+ciudad);
  var url=API_BASE_URL+"action=registfarm&email="+email+"&name="+nombre+"&direccion="+direccion+"&ciudad="+ciudad+"&latitud="+latitud+"&longitud="+longitud+
  "&horario="+horario+"&callback=?";
  //alert(url);
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}