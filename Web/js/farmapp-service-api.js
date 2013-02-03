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

  var url=API_BASE_URL+"action=register&email="+email+"&telefono="+telefono+"&direccion="+direccion+"&ciudad="+ciudad+"&password="+password+"&name="+name+"&surname="+surname+"&callback=?";
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

  var url=API_BASE_URL+"action=register&email="+email+"&telefono="+telefono+"&direccion="+direccion+"&ciudad="+ciudad+"&password="+password+"&name="+name+"&surname="+surname+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response,username){
        callback(response,username);
		logout(logoutResult);
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

function updateinfo(id,name,surname,email,password,direccion,ciudad,telefono,callback){
  var url=API_BASE_URL+"action=updateinfo&id_usuario="+id+"&email="+email+"&telefono="+telefono+"&direccion="+direccion+"&ciudad="+ciudad+"&password="+password+"&nombre="+name+"&apellidos="+surname+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function updateusuario(name,surname,email,password,direccion,ciudad,telefono,callback){
  var url=API_BASE_URL+"action=updateadmin&email="+email+"&telefono="+telefono+"&direccion="+direccion+"&ciudad="+ciudad+"&password="+password+"&nombre="+name+"&apellidos="+surname+"&callback=?";
 var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
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


function lproductos2(id_farmacia, callback){
  var url=API_BASE_URL+"action=listproductos&farmID="+id_farmacia+"&callback=?";
	
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}



function elimproducto(producto, callback){
  var url=API_BASE_URL+"action=elimprod&producto="+producto+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function insertarproducto(producto,descripcion, tipo, callback){
  var url=API_BASE_URL+"action=insprod&producto="+producto+"&descripcion="+descripcion+"&tipo="+tipo+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function addproductofarm(id_farmacia, producto, precio, stock, callback){
  var url=API_BASE_URL+"action=insprodfarm&id_farmacia="+id_farmacia+"&producto="+producto+"&precio="+precio+"&stock="+stock+"&callback=?";
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


function updateproduct(id,nombre,descripcion,tipo,callback){
  var url=API_BASE_URL+"action=updateproducto&id_producto="+id+"&producto="+nombre+"&descripcion="+descripcion+"&tipo="+tipo+"&callback=?";
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

function newfarmaceutico(nombre,surname,email,password,direccion,ciudad,telefono,callback){
 //alert("email: "+email+"nombre: "+nombre+"ciudad: "+ciudad);
  var url=API_BASE_URL+"action=newfarmaceutico&nombre="+nombre+"&surname="+surname+"&email="+email+"&password="+password+"&direccion="+direccion+"&ciudad="+ciudad+"&telefono="+telefono+"&callback=?";
 
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });

}



function historial(idusuario,callback){
  var url=API_BASE_URL+"action=listpedidosuser&idusuario="+idusuario+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response,pedido){
        callback(response,pedido);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function historialFarm(idadmin,callback){
  var url=API_BASE_URL+"action=listpedidosfarm&idadmin="+idadmin+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response,historialResultFarm){
        callback(response,historialResultFarm);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}


function insped(idusuario,answers,callback){
	
  var url=API_BASE_URL+"action=insped&id_usuario="+idusuario+"&nombre="+answers[2];
	url=url.replace(" ","_");
	
	for (var i = 5; i < answers.length-1; i++) {
		var n = answers[i].split(" - "); 
		url = url + "&producto=" + n[0] + "&cantidad=" + n[1];
	}
  url = url + "&callback=?";
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

function ListarCiudades(callback){
  var url=API_BASE_URL+"action=listciudades&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response,ciudad){
        callback(response,ciudad);
      }
    }).fail(function(){
	
      window.location.href=ERROR_PAGE;
    });
}

function ListarFarmacias(ciudad3,callback){
  var url=API_BASE_URL+"action=listfarm&ciudad="+ciudad3+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response,ciudad){
        callback(response,ciudad);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function ListarProductos(nombre,callback){
  var url=API_BASE_URL+"action=listproduct&nombre="+nombre+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response,productos){
        callback(response,productos);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}



function updateestado(id, estado,callback){
  var url=API_BASE_URL+"action=updateestado&estado="+estado+"&id_pedido="+id+"&callback=?";
  
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}

function Buscar_prod(callback){
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

function Buscar_prod_farm(producto,callback){
  var url=API_BASE_URL+"action=listprodfarm&producto="+producto+"&callback=?";
  var jqxhr=$.jsonp({
    url:url,
    success:function(response){
        callback(response);
      }
    }).fail(function(){
      window.location.href=ERROR_PAGE;
    });
}