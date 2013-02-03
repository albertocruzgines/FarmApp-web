var user;
ERROR_PAGE="#";
var answers = [];
var prod = "";

$(document).ready(function(){
	logged(loggedResult);
	var i = $('input').size() + 1;
     
	$('#add').click(function() {
               if($('#value_product').val() != "" && $('#value_cantidad').val() != "" && $('#value_product').val() != "--- LISTA PRODUCTOS -"){
                       $('<div><input type="text" class="field field2" name="dynamic[]" value="' + $('#value_product').val() + " - " + $('#value_cantidad').val() + '" /></div>').fadeIn('slow').appendTo('.extra');
                       i++;
                       $("#despl_ciudad").prop('disabled', true);
                       $("#despl_farma").prop('disabled', true);
               }else{
                       bootbox.alert("Producto o cantidad incorrecta.");
               }
   });
     
    $('#remove').click(function() {
    if(i > 1) {
        $('.field2:last').remove();
        i--;
    }
    });
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
				id4 = document.getElementById("aproductosfarm");
				id4.style.display="none";
				id5 = document.getElementById("amifarma");
				id5.style.display="none";
				id6 = document.getElementById("aproductos");
				id6.style.display="none";
				id7 = document.getElementById("verpedidos");
				id7.style.display="none";
				
				
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
				id7 = document.getElementById("verpedidos");
				id7.style.display="none";
				
				
				break;
				
			default:
				alert("No es un tipo de usuario correcto");
				logout(logoutResult);
				break;
			
		}
	}else{
		logout(logoutResult);
	}
}

function showContent(content){
	$.each($('.content:not('+content+')'), function(k,v){
		$("#"+v.id).hide();
		$("#li"+v.id).removeClass('active');
	});
	$(content).show();
	$('#buscar_prod-form2').addClass('hide'); 
	$('#cgbuscar_prod > div').empty();
}

/*---------------------------------------------------------------FARMACIAS----------------------------------------------------------*/
$('#afarmacia').click(function(e){
	e.preventDefault();
	showContent('#farmacia');
	farma(initialize);
	$('#lifarmacia').addClass('active');
});

$('#afarmlist').click(function(e){
	e.preventDefault();
	ListarCiudades(listarciudadResult2);
	showContent('#listafarma');
	$('#lifarmacia').addClass('active');
});

/*Llena el desplegable de listar farmacias por ciudad con las ciudades donde hay farmacias*/
function listarciudadResult2(response){

	if (response.status==='OK' && response.result){
		$('#cgnomciudad2 > SELECT').empty();
		$('#cgnomciudad2 > SELECT').append(
				'<option selected id="city">--- LISTA CIUDADES ---'
			);
		$.each(response.result, function(k,v){
			$('#cgnomciudad2 > SELECT').append(
				'<option name="city_'+k+'" >'
				+ v.ciudad
			);
		});
	}
}

/*Obtiene la lista con todos los datos de las farmacias y los manda a listarfarmaciaResult2*/
function listfarms2(ciudad){
	ListarFarmacias(ciudad,listarfarmaciaResult2);
}
/*Rellena la tabla con los datos de las farmacias*/
function listarfarmaciaResult2(response){
	if (response.status==='OK' && response.result){
			$('#tb_listfarma > tbody').empty();
			$.each(response.result, function(k,v){
				$('#tb_listfarma > tbody').append(
					'<tr><td>'
					+ v.nombre
					+ '</td><td>'
					+ v.ciudad
					+ '</td><td>'
					+ v.direccion
					+ '</td><td>'
					+ v.telefono
					+ '</td><td>'
					+ v.horario
					+ '</td></tr>'
				);
			});
	}
}

//Listar farmacias por ciudad - ESTA CREO QUE NO SE USA!!
function listarfarmacias2(response){
		if (response.status==='OK' && response.result){ 

		$('#tb_farma > tbody').empty();
		
		var textHTML = '';
		for(var i=0; i<response.result.length; i++){
			textHTML += '<tr><td>'
			+ '<input id="ad_name" type="text" class="span2" disabled value=\"'+ response.result[i].nombre + '\">'
			+ '</td><td>'
			+ '<input id="ad_surname" type="text" class="span2" disabled value=\"'+response.result[i].ciudad+'\">'
			+ '</td><td>'
			+ '<input id="ad_direccion" type="text" class="span3" disabled value=\"'+ response.result[i].direccion + '\">'
			+ '</td><td>'
			+ '<input id="ad_telefono" type="text" class="span2" disabled size="1"  value=\"'+ response.result[i].horario + '\">'
			+ '</td></tr>';
		}		
		$('#tb_farma > tbody').append(textHTML);	
	}
}

/*---------------*/

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
		menu2 = document.getElementById("menu_user");
		menu2.style.display="none";
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

function historialResult(response){
	if (response.status==='OK'){
		if(response.result!=''){
			$('#tb_hist > tbody').empty();
			$.each(response.result, function(k,v){
				$('#tb_hist > tbody').append(
					'<tr><td>'
					+ v.idpedido
					+ '</td><td>'
					+ v.nombre
					+ '</td><td>'
					+ v.producto
					+ '</td><td>'
					+ v.cantidad
					+ '</td><td>'
					+ v.precio
					+ '</td><td>'
					+ v.fecha
					+ '</td><td>'
					+ v.estado
					+ '</td></tr>'
				);
			});
		}else{
			$('#tb_hist > tbody').empty();
			$('#tb_hist').addClass('hide');
			bootbox.alert("No hay pedidos realizados");
		}
	}
}

$('#ahistorial').click(function(e){
	e.preventDefault();
	historial(user.id,historialResult);
	showContent('#historial');
	$('#ahistorial').addClass('active');
});

/* USUARIO,ADMIN Y FARMACIAS: Información */
function infoResult(response){
	if (response.status==='OK' && response.result){ 

		$('#tb_info > tbody').empty();
		$('#tb_info > tbody').append(
			'<tr><td width="100px"><b>Nombre</b></td><td width="200px"><input id="info_name" type="text" class="span3"  value=\"'+ response.result.name + '\"></td></tr>'
			+ '<tr><td><b>Apellido</b></td><td><input id="info_surname" type="text" class="span3"  value=\"'+ response.result.surname + '\"></td></tr>'
			+ '<tr><td><b>Email</b></td><td><input id="info_email" type="text" class="span3"  value=\"'+ response.result.email + '\"></td></tr>'
			+ '<tr><td><b>Password</b></td><td><input id="info_password" type="password" class="span3"  value=\"'+ response.result.password + '\"></td></tr>'
			+ '<tr><td><b>Repetir password</b></td><td><input id="info_password2" type="password" class="span3"  value=\"'+ response.result.password + '\"></td></tr>'
			+ '<tr><td><b>Ciudad</b></td><td><input id="info_ciudad" type="text" class="span5"  value=\"'+ response.result.ciudad + '\"></td></tr>'
			+ '<tr><td><b>Direcci&oacute;n</b></td><td><input id="info_direccion" type="text" class="span5"  value=\"'+ response.result.direccion + '\"></td></tr>'
			+ '<tr><td><b>Telefono</b></td><td><input id="info_telefono" type="text" class="span3"  value=\"'+ response.result.telefono + '\"></td></tr>'
			+ '<tr><td><button onclick="infoform()"  class="btn btn-success">Guardar</button></td></tr>'

		);
	}
}

function infoform(){
	
	if($('#info_email').val() !='' && $('#info_password').val() !='' && $('#info_password2').val() !=''){
		
		if($('#info_password').val() == $('#info_password2').val()){
			updateinfo(user.id,
				$('#info_name').val(),
				$('#info_surname').val(),
				$('#info_email').val(),
				$('#info_password').val(),
				$('#info_direccion').val(),
				$('#info_ciudad').val(),
				$('#info_telefono').val(), updateinfoResult);
				prod = "";
				if($('#info_email').val() != user.email){
					bootbox.alert("Al modificar el e-mail tendr&aacute;s que volverte a indentificar");
				}
		}else{
			bootbox.alert('No coinciden las contrase&ntilde;as');
		}
	}else{
		bootbox.alert('Debes rellenar los campos email y password antes de actualizar');
	}
				 
}

function updateinfoResult(response){
	if (response.status==='OK' && response.result){ 
		bootbox.alert("Informaci&oacute;n actualizada correctamente.");
	}else{
		bootbox.alert("Error al actualizar los datos.");
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



			+ response.result[i].nombre 
			+ '</td><td>'


			+ response.result[i].ciudad
			+ '</td><td>'


			+  response.result[i].latitud 
			+ '</td><td>'


			+  response.result[i].longitud 
			+ '</td><td>'


			+  response.result[i].direccion 
			+ '</td><td>'


			+ response.result[i].horario 
			+ '</td></tr>'
		
			}
		}
		
		$('#tb_farma > tbody').append(textHTML);
		
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
			+ '<input id="ad_email'+i+'" type="text" class="span2" disabled  value=\"'+ response.result[i].email + '\">'
			+ '</td><td>'
			+ '<input id="ad_password'+i+'" type="password" class="span2" disabled  value=\"'+ response.result[i].password + '\">'
			+ '</td><td>'
			+ '<input id="ad_ciudad'+i+'" type="text" class="span2" disabled value=\"'+ response.result[i].ciudad + '\">'
			+ '</td><td>'
			+ '<input id="ad_direccion'+i+'" type="text" class="span2" disabled value=\"'+ response.result[i].direccion + '\">'
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
			+ '<input id="ad_email_new" type="text" class="span2"  >'
			+ '</td><td>'
			+ '<input id="ad_password_new" type="password" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_ciudad_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_direccion_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_telefono_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<a id="env" class="btn" onclick="new_farmaceutico()" href="#"><i class="icon-ok"></i></a>'
			+ '</td></tr>';
		
		$('#tb_newfarma > tbody').append(textHTML);
		
	}
}
function new_farmaceutico(){
	//alert("adios");
	window.location.reload();
	user=$.parseJSON($.cookie('mus-user'));
	//alert("hola "+$.cookie('mus-user'));
	//(nombre,surname,email,password,direccion,ciudad,telefono,callback)
	newfarmaceutico($('#ad_name_new').val(),
				$('#ad_surname_new').val(),
				$('#ad_email_new').val(),
				$('#ad_password_new').val(),
				$('#ad_direccion_new').val(),
				$('#ad_ciudad_new').val(),
				$('#ad_telefono_new').val(),
				newfarmafun);
				 
}



function dis_1(id){
	$("#ad_name"+id).prop('disabled', false);
	$("#ad_surname"+id).prop('disabled', false);
	$("#ad_email"+id).prop('disabled', true);
	$("#ad_password"+id).prop('disabled', false);
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
	$("#ad_password"+id).prop('disabled', true);
	$("#ad_ciudad"+id).prop('disabled', true);
	$("#ad_direccion"+id).prop('disabled', true);
	$("#ad_telefono"+id).prop('disabled', true);
	$('#env'+id).addClass('hide');
	$('#mod'+id).removeClass('hide');

	updateusuario($("#ad_name"+id).val(),
				$("#ad_surname"+id).val(),
				$("#ad_email"+id).val(),
				$("#ad_password"+id).val(),
				$("#ad_direccion"+id).val(),
				$("#ad_ciudad"+id).val(),
				$("#ad_telefono"+id).val());
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
		for(var j=0; j<response.result.length; j++){
		textHTML += '<tr><td>'
			+ '<input id="id_'+j+'" type="text" class="span1" disabled value=\"'+ response.result[j].id_producto + '\">'
			+ '</td><td>'
			+ '<input id="product_'+j+'" type="text" class="span2" disabled value=\"'+ response.result[j].producto + '\">'
			+ '</td><td>'
			+ '<input id="descripcion_'+j+'" type="text" class="span6" disabled value=\"'+response.result[j].descripcion+'\">'
			+ '</td><td>'
			+ '<input id="tipo_'+j+'" type="text" class="span2" disabled  value=\"'+ response.result[j].tipo + '\">'
			+ '</td><td>'
			+ '<a id="mod2'+j+'" class="btn" onclick="dis_2(\''+j+'\')" href="#"><i class="icon-pencil"></i></a>'
			+ '<a id="env2'+j+'" onclick="ena_2(\''+j+'\')" class="btn hide" href="#"><i class="icon-ok"></i></a>'
			+ '</td><td>'
			+ '<a id="ad_name'+j+'" onclick="eliminarproducto(\''+j+'\')" class="btn" href="#"><i class="icon-remove"></i></a>'
			+ '</td></tr>';
		}
		
		textHTML += '<tr><td>'
			+ '<input id="ad_id_new" type="text" disabled class="span1" >'
			+ '</td><td>'
			+ '<input id="ad_producto_new" type="text" class="span2" >'
			+ '</td><td>'
			+ '<input id="ad_descripcion_new" type="text" class="span6"  >'
			+ '</td><td>'
			+ '<input id="ad_tipo_new" type="text" class="span2" >'
			+ '</td><td>'


			+ '<a  onclick="addproducto()" class="btn" href="#"><i class="icon-ok"></i></a>'
			+ '</td></tr>';
	
		$('#tb_productos > tbody').append(textHTML);
	
	}
}
function dis_2(id){
$("#product_"+id).prop('disabled', false);
	$("#descripcion_"+id).prop('disabled', false);
	$("#tipo_"+id).prop('disabled', false);
	$('#mod2'+id).addClass('hide');
	$('#env2'+id).removeClass('hide');
}
function ena_2(id){
	$("#product_"+id).prop('disabled', true);
	$("#descripcion_"+id).prop('disabled', true);
	$("#tipo_"+id).prop('disabled', true);
	$('#env2'+id).addClass('hide');
	$('#mod2'+id).removeClass('hide');
	updateproduct($("#id_"+id).val(),
				$("#product_"+id).val(),
				$("#descripcion_"+id).val(),
				$("#tipo_"+id).val());
	
}
function addproducto(){
	//alert("adios");
	window.location.reload();
	user=$.parseJSON($.cookie('mus-user'));
	//alert("hola "+$.cookie('mus-user'));
	insertarproducto($('#ad_producto_new').val(),
				$('#ad_descripcion_new').val(),
				$('#ad_tipo_new').val(),
				listarproductos);
				 
}
function eliminarproducto(id){
	//alert("adios");
	window.location.reload();
	elimproducto($("#product_"+id).val());
				 
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
			
			textHTML = '<br/><br /><p><b style="color:green; font-size:1.5em">'+ response.result[i].nombre_farmacia + '</b></p>'
			+ '<form id="form_farmacia_'+ response.result[i].id_farmacia + '" method="get" action="index.html" >'
			+ '<table id="tabla_farmacia_'+ response.result[i].id_farmacia + '">'
			+ '<thead style="font-weight:bold">'
			+ '<tr><td>Producto</td><td>Precio</td><td>Stock</td><td>Acci&oacute;n</td></tr>'
			+ '</thead>'
			+ '<tbody>';
				
			for(var j=0; j<response.result[i].lista_productos.length; j++){
				textHTML += '<tr><td>'
				+ '<input id="ad_surname" type="text" class="span2" disabled value=\"'+response.result[i].lista_productos[j].producto+'\">'
				+ '</td><td>'
				+ '<input id="ad_email" type="text" class="span3" disabled  value=\"'+ response.result[i].lista_productos[j].precio + '\">'
				+ '</td><td>'
				+ '<input id="ad_ciudad" type="text" class="span2" disabled value=\"'+ response.result[i].lista_productos[j].cantidad + '\">'
				+ '</td><td>'
				+ '<a id="mod" class="btn" onclick="dis_1()" href="#"><i class="icon-pencil"></i></a><a id="env" onclick="ena_1()" class="btn hide" href="#"><i class="icon-ok"></i></a>'
				+ '</td></tr>';
			}
			$('#tb_productosfarm').append(textHTML);
			lproductos2(response.result[i].id_farmacia, listarproductosResult2);	
		}
		$('#tb_productosfarm').append('</tbody></table></form>');
		
	}
}


function listarproductosResult2(response){
	//alert("id_farmacia: "+ response.farmID)
	if (response.status==='OK' && response.result && response.farmID){
	
		textHTML = '<tr><td>'
			+ '<select id="producto_new_'+response.farmID+'" class="span2" >'
			+ '<option value=""></option>';
			
			for(var i=0; i < response.result.length; i++){
				textHTML += '<option value="'+response.result[i].producto+'">'+response.result[i].producto+'</option>';
			}
			
		textHTML += '</select>'
				+ '</td><td>'
				+ '<input id="precio_new_'+response.farmID+'" type="text" class="span3" >'
				+ '</td><td>'
				+ '<input id="stock_new_'+response.farmID+'" type="text" class="span2" >'
				+ '</td><td>'
				+ '<button type="submit" onclick="addproductoFarmAction('+response.farmID+')" id="anadirproducto-form">Add</button>'
				+ '</td></tr>'
				+ '</tr>';
		//alert('ID farmacia: '+ farmaciaSeleccionada_id);
		$('#tabla_farmacia_'+ response.farmID).append(textHTML);
	}
}

function addproductoFarmAction(id_farmacia){
	window.location.reload();
	user=$.parseJSON($.cookie('mus-user'));
	//(id_farmacia, producto, precio, stock, callback)
	addproductofarm(id_farmacia,
				$('#producto_new_'+id_farmacia).val(),
				$('#precio_new_'+id_farmacia).val(),
				$('#stock_new_'+id_farmacia).val(),
				lmifarma);
				 
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
				+ '<input id="ad_ciudad_new" type="text" class="span2" >'
				+ '</td><td>'
				+ '<input id="ad_latitud_new"  type="text" class="span3" >'
				+ '</td><td>'
				+ '<input id="ad_longitud_new" type="text" class="span2" >'
				+ '</td><td>'
				+ '<input id="ad_direccion_new" type="text" class="span3" >'
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
	window.location.reload();
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


$('#apedido').click(function(e){
	e.preventDefault();
	
	ListarCiudades(listarciudadResult);
	showContent('#pedido');
	$('#apedido').addClass('active');
});

function listarciudadResult(response){

	if (response.status==='OK' && response.result){
		$('#cgnomciudad > SELECT').empty();
		$('#cgnomciudad > SELECT').append(
				'<option selected id="ciudad">--- LISTA CIUDADES ---'
			);
		$.each(response.result, function(k,v){
			$('#cgnomciudad > SELECT').append(
				'<option name="farmacia_'+k+'" >'
				+ v.ciudad
			);
		});
	}


}

function listfarms(ciudad){
	ListarFarmacias(ciudad,listarfarmaciaResult);
}
function listarfarmaciaResult(response){
	if (response.status==='OK' && response.result){
		$('#cgnomfarmacia > SELECT').empty();
		$('#cgnomfarmacia > SELECT').append(
				'<option selected id="farmacia">--- LISTA FARMACIAS ---'
			);
		$.each(response.result, function(k,v){
			$('#cgnomfarmacia > SELECT').append(
				'<option id="farmacia'+k+'" >'
				+ v.nombre
			);
		});
	}
}

function listprod(farma){
	ListarProductos(farma,listarproductosResult);
}

function listarproductosResult(response){
	if (response.status==='OK' && response.result){
		$('#cgnomproducto > SELECT').empty();
		$('#cgnomproducto > SELECT').append(
				'<option selected id="producto">--- LISTA PRODUCTOS ---'
			);
		$.each(response.result, function(k,v){
			$('#cgnomproducto > SELECT').append(
				'<option id="producto'+k+'" >'
				+ v.producto
			);
		});
	}

}

function pedidoResult(response){
	if (response.status==='OK'){
		if (response.result){
			bootbox.alert("Compra realizada con exito");
			window.location.href=index.html;
		}
	}else{
		bootbox.alert("Compra cancelada, intentelo de nuevo m&aacute;s tarde");
		window.location.href=index.html;
	}

}

function enviar(){
    $.each($('.field'), function() {
        answers.push($(this).val());
    });
     
    if(answers.length == 0) {
        answers = "none";
    }  
 
    insped(user.id,answers,pedidoResult);
                                 
}


function historialResultFarm(response){
	if (response.status==='OK' && response.result){ 

		$('#tb_hist_farm > tbody').empty();
		
		var textHTML = "";
		for(var i=0; i<response.result.length; i++){
		
		var color = "";
		var nuevo = "";
		var enProceso = "";
		var finalizado = "";
		
		if (response.result[i].estado == "Nuevo"){
			color = "#f2dede"
			nuevo = "selected=\'selected\'";
			
		}else if(response.result[i].estado == "En proceso"){
			color = "#fcf8e3";
			enProceso = "selected=\'selected\'";
		
		}else if(response.result[i].estado == "Finalizado"){
			color = "#dff0d8";
			finalizado = "selected=\'selected\'";
		}
		
		textHTML += 
			'<tr class="succes" style="background-color: '+color+' !important"><td>'
					+ response.result[i].idpedido 
					+ '</td><td>'
					+ response.result[i].nombre
					+ '</td><td>'
					+ response.result[i].producto
					+ '</td><td>'
					+ response.result[i].cantidad
					+ '</td><td>'
					+ response.result[i].precio
					+ '</td><td>'
					+ response.result[i].emaileuser 
					+ '</td><td>'
					+ response.result[i].fecha
					+ '</td><td disabled>'
					+ '<select id="newestado_'+response.result[i].idpedido+'" ></option>'
					+ '<option '+nuevo+'>Nuevo</option>'
					+ '<option '+enProceso+'>En proceso</option>'
					+ '<option '+finalizado+'>Finalizado</option>'
					+ '</select>'
					+ '</td><td>'
			+ '<a id="mod'+i+'" class="btn" onclick="modifestado(\''+response.result[i].idpedido+'\')" href="#"><i class="icon-ok"></i></a>'
			+ '</td><tr>'
		}	
		$('#tb_hist_farm > tbody').append(textHTML);
	}
}

function modifestado(id){
	
	user=$.parseJSON($.cookie('mus-user'));
	//alert("hola "+$.cookie('mus-user'));
	updateestado(id,
				$('#newestado_'+id).val(),
				lmifarma);
				 
}

$('#verpedidos').click(function(e){
	e.preventDefault();
	user=$.parseJSON($.cookie('mus-user'));
	historialFarm(user.id,historialResultFarm);
	showContent('#historial_farm');
	$('#verpedidos').addClass('active');
});

$('#abuscar_prod').click(function(e){
	e.preventDefault();
	Buscar_prod(buscar_prodResult);
	showContent('#buscar_prod');
	$('#abuscar_prod').addClass('active');
});

function buscar_prodResult(response){
	if (response.status==='OK' && response.result){
		$('#cgbuscar_prod > SELECT').empty();
		$('#cgbuscar_prod > SELECT').append(
				'<option selected id="producto">--- LISTA PRODUCTOS ---'
			);
		$.each(response.result, function(k,v){
			$('#cgbuscar_prod > SELECT').append(
				'<option id="producto'+k+'" >'
				+ v.producto
			);
		});
	}

}

function buscar_prod_ok(producto){
	Buscar_prod_farm(producto,Buscar_prod_farmResult);
	prod = producto;
}

function Buscar_prod_farmResult(response){
	Buscar_prod(buscar_descResult);
	if (response.status==='OK' && response.result){
		if(response.result!=''){
			$('#buscar_prod-form2').removeClass('hide');
			$('#tb_prod_farm > tbody').empty();
			$.each(response.result, function(k,v){
				$('#tb_prod_farm > tbody').append(
					'<tr><td>'
					+ v.nombre
					+ '</td><td>'
					+ v.ciudad
					+ '</td><td>'
					+ v.direccion
					+ '</td><td>'
					+ v.telefono
					+ '</td><td>'
					+ v.horario
					+ '</td></tr>'
				);
			});
		}else{
			bootbox.alert("No existe el producto solicitado en ninguna farmacia");
			$('#buscar_prod-form2').addClass('hide');
		}
	}else{
		$('#buscar_prod-form2').addClass('hide');
	}
}

function buscar_descResult(response){
	if (response.status==='OK' && response.result){
		$('#cgbuscar_prod > div').empty();
		$.each(response.result, function(k,v){
			if(v.producto === prod) $('#cgbuscar_prod > div').append("<b>"+v.descripcion+"</b>");
		});
	}

}