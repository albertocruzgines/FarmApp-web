var user;
ERROR_PAGE="error.html";

$(document).ready(function(){
	logged(loggedResult);
});

function loggedResult(response){

	if (response.status==='OK' && response.result){
		user=$.parseJSON($.cookie('mus-user'));
		showContent('#inicio');
		id00 = document.getElementById("alogin");
		id00.style.display="none";
		id01 = document.getElementById("aregistro");
		id01.style.display="none";
		
		var tipo = user.idtipo;
		switch (tipo){
		
			case 3: // usuario
				document.getElementById('user2').innerHTML = user.email + ' <b class="caret"></b>';
				id1 = document.getElementById("afarma");
				id1.style.display="none";
				id3 = document.getElementById("anewfarma");
				id3.style.display="none";
				id4 = document.getElementById("aproductfarm");
				id4.style.display="none";
				id5 = document.getElementById("amifarma");
				id5.style.display="none";
				break;
				
			case 2: // farmacia
				document.getElementById('user2').innerHTML = user.email + ' <b class="caret"></b>';
				id1 = document.getElementById("apedido");
				id1.style.display="none";
				id3 = document.getElementById("ahistorial");
				id3.style.display="none";
				id4 = document.getElementById("anewfarma");
				id4.style.display="none";
				id5 = document.getElementById("afarma");
				id5.style.display="none";
				id6 = document.getElementById("aproductos");
				id6.style.display="none";
				break;
				
			case 1:  // admin
				document.getElementById('user2').innerHTML = user.email + ' <b class="caret"></b>';
				id1 = document.getElementById("apedido");
				id1.style.display="none";
				id3 = document.getElementById("ahistorial");
				id3.style.display="none";
				id4 = document.getElementById("isearch");
				id4.style.display="none";
				id5 = document.getElementById("aproductosfarm");
				id5.style.display="none";
				id6 = document.getElementById("amifarma");
				id6.style.display="none";
				break;
				
			default:
				alert("No es un tipo de usuario correcto!!");
				break;
			
		}
	}else{
		menu2 = document.getElementById("menu_user");
		menu2.style.display="none";
	}
}

function showContent(content){
	$.each($('.content:not('+content+')'), function(k,v){
		$("#"+v.id).hide();
		$("#li"+v.id).removeClass('active');
	});
	$(content).show();
}

$('#afarmacia').click(function(e){
	e.preventDefault();
	showContent('#farmacia');
	farma(initialize);
	$('#lifarmacia').addClass('active');
});

$('#ainicio').click(function(e){
	e.preventDefault();
	showContent('#inicio');
	$('#liinicio').addClass('active');
});

$('#aapp').click(function(e){
	e.preventDefault();
	showContent('#app');
	$('#liapp').addClass('active');
});

$('#alogout').click(function(e){
	e.preventDefault();
	logout(logoutResult);
});

$('#aregistro').click(function(e){
	e.preventDefault();
	showContent('#registro');
	$('#aregistro').addClass('active');
});

$('#apedido').click(function(e){
	e.preventDefault();
	showContent('#pedido');
	$('#apedido').addClass('active');
});

$('#alogin').click(function(e){
	e.preventDefault();
	showContent('#login');
	$('#alogin').addClass('active');
});

function logoutResult(response){
	if (response.status==='OK'){
		window.location.href="index.html";
	}
}

$('#isearch').typeahead().on('keyup',function(ev){
	ev.stopPropagation();
	ev.preventDefault();

	if($.inArray(ev.keyCode,[40,38,9,13,27])===-1){
		var self=$(this);
		self.data('typeahead').source=[];

		//active used so we aren't triggering duplicate keyup events
		if( !self.data('active') && self.val().length > 0){

		    self.data('active', true);

		    //Do data request. Insert your own API logic here.
		    search($(this).val(), function(response){
		    	//set this to true when your callback executes
		        self.data('active',true);
		        if(response.status==='OK'){
			        var arr=[];
			        i = response.result.length;
			        while(i--){
			        	arr[i] = response.result[i];
			        }

			        //set your results into the typehead's source 
		        	self.data('typeahead').source = arr;
		        	//trigger keyup on the typeahead to make it search
		       		self.trigger('keyup');
		       		//All done, set to false to prepare for the next remote query.
		        	self.data('active', false);
		    	}
		    });
		}
	}
});

$('#isearch').change(function(e){
 	$('#search-form').submit();
});

/*function listhistorialResult(response){
	if (response.status==='OK'){
		if (response.result){
			$('#tb_hist > tbody').empty();
			$.each(response.result, function(k,v){
				$('#tb_hist > tbody').append(
					'<tr><td>'
					+ v.id
					+ '</td><td>'
					+ v.fecha
					+ '</td><td>'
					+ v.farmacia
					+ '</td><td>'
					+ v.producto
					+ '</td><td>'
					+ v.cantidad
					+ '</td><td>'
					+ v.pu
					+ '</td><td>'
					+ v.total
					+ '</td><td>'
					+ v.estado
					+ '</td></tr>'
				);
			});
		}else{
			$('#tb_hist > tbody').empty();
			alert("No hay pedidos realizados!");
		}
	}
}*/

$('#ahistorial').click(function(e){
	e.preventDefault();
	//listhistorial(user.username,listhistorial);
	showContent('#historial');
	$('#ahistorial').addClass('active');
});

/* USUARIO,ADMIN Y FARMACIAS: Información */
function infoResult(response){
	if (response.status==='OK' && response.result){ 

		$('#tb_info > tbody').empty();
		$('#tb_info > tbody').append(
			'<tr><td>'
			+ '<input type="text" class="span2" value=\"'+ response.result.name + '\">'
			+ '</td><td>'
			+ '<input type="text" class="span2" value=\"'+response.result.surname+'\">'
			+ '</td><td>'
			+ '<input type="text" class="span3" value=\"'+ response.result.email + '\">'
			+ '</td><td>'
			+ '<input type="text" class="span2" value=\"'+ response.result.ciudad + '\">'
			+ '</td><td>'
			+ '<input type="text" class="span3" value=\"'+ response.result.direccion + '\">'
			+ '</td><td>'
			+ '<input type="text" class="span2" size="1" value=\"'+ response.result.telefono + '\">'
			+ '</td><td>'
			+ '<input type="submit" value="Modificar"><input type="submit" value="Ok">'
			+ '</td></tr>'
		);
	}
}
$('#ainfo').click(function(e){
	e.preventDefault();
	info(user.email,infoResult);
	showContent('#info');
	$('#ainfo').addClass('active');
});



/* ADMIN: Lista y añade FARMACIAS */
$('#afarma').click(function(e){
	e.preventDefault();
	farma(listarfarmacias);
	showContent('#lfarma');
	$('#afarma').addClass('active');
});
function listarfarmacias(response){
		if (response.status==='OK' && response.result){ 

		$('#tb_farma > tbody').empty();
		
		var textHTML = '';
		for(var i=0; i<response.result.length; i++){
			textHTML += '<tr><td>'
			+ '<input id="ad_name" type="text" class="span2" disabled value=\"'+ response.result[i].nombre + '\">'
			+ '</td><td>'
			+ '<input id="ad_surname" type="text" class="span2" disabled value=\"'+response.result[i].ciudad+'\">'
			+ '</td><td>'
			+ '<input id="ad_email" type="text" class="span3" disabled  value=\"'+ response.result[i].latitud + '\">'
			+ '</td><td>'
			+ '<input id="ad_ciudad" type="text" class="span2" disabled value=\"'+ response.result[i].longitud + '\">'
			+ '</td><td>'
			+ '<input id="ad_direccion" type="text" class="span3" disabled value=\"'+ response.result[i].direccion + '\">'
			+ '</td><td>'
			+ '<input id="ad_telefono" type="text" class="span2" disabled size="1"  value=\"'+ response.result[i].horario + '\">'
			+ '</td><td>'
			+ '<a id="mod" class="btn" onclick="dis_1()" href="#"><i class="icon-pencil"></i></a><a id="env" onclick="ena_1()" class="btn hide" href="#"><i class="icon-ok"></i></a>'
			+ '</td></tr>';
		}
		
		$('#tb_farma > tbody').append(textHTML);
		
	}
}


/* ADMIN: Listar y añadir FARMACEUTICOS */
$('#anewfarma').click(function(e){
	e.preventDefault();
	newfarma(newfarmafun);
	showContent('#newfarma');
	$('#anewfarma').addClass('active');
});
function newfarmafun(response){
		if (response.status==='OK' && response.result){ 

		$('#tb_newfarma > tbody').empty();
		
		var textHTML = "";
		for(var i=0; i<response.result.length; i++){
			textHTML += '<tr><td>'
			+ '<input id="ad_name'+i+'" type="text" class="span2" disabled value=\"'+ response.result[i].name + '\">'
			+ '</td><td>'
			+ '<input id="ad_surname'+i+'" type="text" class="span2" disabled value=\"'+response.result[i].surname+'\">'
			+ '</td><td>'
			+ '<input id="ad_email'+i+'" type="text" class="span3" disabled  value=\"'+ response.result[i].email + '\">'
			+ '</td><td>'
			+ '<input id="ad_ciudad'+i+'" type="text" class="span2" disabled value=\"'+ response.result[i].ciudad + '\">'
			+ '</td><td>'
			+ '<input id="ad_direccion'+i+'" type="text" class="span3" disabled value=\"'+ response.result[i].direccion + '\">'
			+ '</td><td>'
			+ '<input id="ad_telefono'+i+'" type="text" class="span2" disabled size="1"  value=\"'+ response.result[i].telefono + '\">'
			+ '</td><td>'
			+ '<a id="mod'+i+'" class="btn" onclick="dis_1(\''+i+'\')" href="#"><i class="icon-pencil"></i></a>'
			+ '<a id="env'+i+'" onclick="ena_1(\''+i+'\')" class="btn hide" href="#"><i class="icon-ok"></i></a>'
			+ '</td></tr>';
		}
		
		textHTML += '<tr><td>'
			+ '<input id="ad_name_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_surname_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_email_new" type="text" class="span3"  >'
			+ '</td><td>'
			+ '<input id="ad_ciudad_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_direccion_new" type="text" class="span3" >'
			+ '</td><td>'
			+ '<input id="ad_telefono_new" type="text" class="span2" size="1" >'
			+ '</td><td>'
			+ '<a id="env" class="btn" href="#"><i class="icon-ok"></i></a>'
			+ '</td></tr>';
		
		
		
		$('#tb_newfarma > tbody').append(textHTML);
		
	}
}
function dis_1(id){
	$("#ad_name"+id).prop('disabled', false);
	$("#ad_surname"+id).prop('disabled', false);
	$("#ad_email"+id).prop('disabled', false);
	$("#ad_ciudad"+id).prop('disabled', false);
	$("#ad_direccion"+id).prop('disabled', false);
	$("#ad_telefono"+id).prop('disabled', false);
	$('#mod'+id).addClass('hide');
	$('#env'+id).removeClass('hide');
}
function ena_1(id){
	$("#ad_name"+id).prop('disabled', true);
	$("#ad_surname"+id).prop('disabled', true);
	$("#ad_email"+id).prop('disabled', true);
	$("#ad_ciudad"+id).prop('disabled', true);
	$("#ad_direccion"+id).prop('disabled', true);
	$("#ad_telefono"+id).prop('disabled', true);
	$('#env'+id).addClass('hide');
	$('#mod'+id).removeClass('hide');
}


/* ADMIN: Listar y añadir PRODUCTOS */
$('#aproductos').click(function(e){
	e.preventDefault();
	lproductos(listarproductos);
	showContent('#lproductos');
	$('#aproductos').addClass('active');
});
function listarproductos(response){
		if (response.status==='OK' && response.result){ 

		$('#tb_productos > tbody').empty();
		
		var textHTML = "";
		for(var i=0; i<response.result.length; i++){
		textHTML += '<tr><td>'
			+ '<input id="ad_name'+i+'" type="text" class="span2" disabled value=\"'+ response.result[i].nombre + '\">'
			+ '</td><td>'
			+ '<input id="ad_surname'+i+'" type="text" class="span2" disabled value=\"'+response.result[i].cantidad+'\">'
			+ '</td><td>'
			+ '<input id="ad_email'+i+'" type="text" class="span3" disabled  value=\"'+ response.result[i].descripcion + '\">'
			+ '</td><td>'
			+ '<input id="ad_ciudad'+i+'" type="text" class="span2" disabled value=\"'+ response.result[i].tipo + '\">'
			+ '</td><td>'
			+ '<input id="ad_direccion'+i+'" type="text" class="span3" disabled value=\"'+ response.result[i].precio + '\">'
			+ '</td><td>'
			+ '</td><td>'
			+ '<a id="mod'+i+'" class="btn" onclick="dis_1(\''+i+'\')" href="#"><i class="icon-pencil"></i></a>'
			+ '<a id="env'+i+'" onclick="ena_1(\''+i+'\')" class="btn hide" href="#"><i class="icon-ok"></i></a>'
			+ '</td></tr>';
		}
		
		textHTML += '<tr><td>'
			+ '<input id="ad_name_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_surname_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_email_new" type="text" class="span3"  >'
			+ '</td><td>'
			+ '<input id="ad_ciudad_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_direccion_new" type="text" class="span3" >'
			+ '</td><td>'
			+ '<input id="ad_telefono_new" type="text" class="span2" size="1" >'
			+ '</td><td>'
			+ '<a id="env" class="btn" href="#"><i class="icon-ok"></i></a>'
			+ '</td></tr>';
	
		$('#tb_productos > tbody').append(textHTML);
	
	}
}


/* FARMACIA: Añadir PRODUCTOS */
$('#aproductosfarm').click(function(e){
	e.preventDefault();
	//alert("user.id: "+ user.id);
	productosfarm(user.id, lproductosfarm);
	showContent('#productosfarm');
	$('#aproductosfarm').addClass('active');
});
function lproductosfarm(response){
		if (response.status==='OK' && response.result){ 

		$('#tb_productosfarm').empty();
		
		var textHTML = "";
		
		for(var i=0; i<response.result.length; i++){
			textHTML += '<br/><br /><p><b style="color:green; font-size:1.5em">'+ response.result[i].nombre_farmacia + '</b></p>'
			+ '<table>'
			+ '<thead style="font-weight:bold">'
			+ '<tr><td>Producto</td><td>Precio</td><td>Tipo</td><td>Acci&oacute;n</td></tr>'
			+ '</thead>'
			+ '<tbody>';
				
			for(var j=0; j<response.result[i].lista_productos.length; j++){
				textHTML += '<tr><td>'
				+ '<input id="ad_surname" type="text" class="span2" disabled value=\"'+response.result[i].lista_productos[j].producto+'\">'
				+ '</td><td>'
				+ '<input id="ad_email" type="text" class="span3" disabled  value=\"'+ response.result[i].lista_productos[j].precio + '\">'
				+ '</td><td>'
				+ '<input id="ad_ciudad" type="text" class="span2" disabled value=\"'+ response.result[i].lista_productos[j].tipo + '\">'
				+ '</td><td>'
				+ '<a id="mod" class="btn" onclick="dis_1()" href="#"><i class="icon-pencil"></i></a><a id="env" onclick="ena_1()" class="btn hide" href="#"><i class="icon-ok"></i></a>'
				+ '</td></tr>';
			}
			
			textHTML += '<form method="get" action="index.html" >'
				+ '<tr><td>'
				+ '<input id="ad_surname" id="producto" type="text" class="span2" >'
				+ '</td><td>'
				+ '<input id="ad_email" id="precio" type="text" class="span3" >'
				+ '</td><td>'
				+ '<input id="ad_ciudad" id="tipo" type="text" class="span2" >'
				+ '</td><td>'
				+ '<button type="submit" id="anadirproducto-form">Add</button>'
				+ '</td></tr>'
				+ '</form>';
			
			textHTML += '</tbody></table>';
		}
		$('#tb_productosfarm').append(textHTML);
		
	}
}


/* FARMACIA: Ver mis farmacias */	
$('#amifarma').click(function(e){
	e.preventDefault();
	user=$.parseJSON($.cookie('mus-user'));
	mifarma(user.email, lmifarma);
	showContent('#mifarma');
	$('#amifarma').addClass('active');
});

function lmifarma(response){
		if (response.status==='OK' && response.result){ 

			alert(response.result);
		$('#tb_mifarma > tbody').empty();
		
		var textHTML = "";
		for(var i=0; i<response.result.length; i++){
			textHTML += '<tr><td>'
			+ '<input id="ad_name'+i+'" type="text" class="span2" disabled value=\"'+ response.result[i].nombre + '\">'
			+ '</td><td>'
			+ '<input id="ad_surname'+i+'" type="text" class="span2" disabled value=\"'+response.result[i].ciudad+'\">'
			+ '</td><td>'
			+ '<input id="ad_email'+i+'" type="text" class="span3" disabled  value=\"'+ response.result[i].latitud + '\">'
			+ '</td><td>'
			+ '<input id="ad_ciudad'+i+'" type="text" class="span2" disabled value=\"'+ response.result[i].longitud + '\">'
			+ '</td><td>'
			+ '<input id="ad_direccion'+i+'" type="text" class="span3" disabled value=\"'+ response.result[i].direccion + '\">'
			+ '</td><td>'
			+ '<input id="ad_telefono'+i+'" type="text" class="span2" disabled size="1"  value=\"'+ response.result[i].horario + '\">'
			+ '</td><td>'
			+ '<a id="mod'+i+'" class="btn" onclick="dis_1('+i+')" href="#"><i class="icon-pencil"></i></a>'
			+ '<a id="env'+i+'" onclick="ena_1('+i+')" class="btn hide" href="#"><i class="icon-ok"></i></a>'
			+ '</td></tr>';
		}
		
		textHTML += '<form>'
				+ '<tr><td>'
				+ '<input id="ad_name_new" type="text" class="span2" >'
				+ '</td><td>'
				+ '<input id="ad_ciudad_new" type="text" class="span3" >'
				+ '</td><td>'
				+ '<input id="ad_latitud_new"  type="text" class="span2" >'
				+ '</td><td>'
				+ '<input id="ad_longitud_new" type="text" class="span2" >'
				+ '</td><td>'
				+ '<input id="ad_direccion_new" type="text" class="span2" >'
				+ '</td><td>'
				+ '<input id="ad_horario_new" type="text" class="span2" >'
				+ '</td><td>'
				+ '<button id="registerfarm-btn" onclick="addFarmacia()" >Add</button>'
				+ '</td></tr>'
				+ '</form>';
		$('#tb_mifarma > tbody').append(textHTML);
	
	}	
}
function addFarmacia(){
	//alert("adios");
	user=$.parseJSON($.cookie('mus-user'));
	//alert("hola "+$.cookie('mus-user'));
	registernewfarm(user.email,
				$('#ad_name_new').val(),
				$('#ad_ciudad_new').val(),
				$('#ad_latitud_new').val(),
				$('#ad_longitud_new').val(),
				$('#ad_direccion_new').val(),
				$('#ad_horario_new').val(),
				lmifarma);
}

$('#registerfarm-btn').click(function(e){
	e.preventDefault();
	alert("holaaaaaaaaaaaaaaaaaaaaaaaaaa");
	/*user=$.parseJSON($.cookie('mus-user'));
	alert("hola "+user.mail);
	registerfarm(user.mail,$('#ad_name').val(),$('#ad_ciudad').val(),$('#ad_latitud').val(),$('#ad_longitud').val(),$('#ad_direccion').val(),$('#ad_horario').val(),lmifarma);
	*/
});