//campo contraseña
$('#ricontraseña').blur(function(){
    var value=  $('#ricontraseña').val();
    if (value==''){
       $('#rcgcontraseña').addClass('error');
       $('#recontraseña').text('No puedes dejar este campo en blanco');
       $('#recontraseña').show();
    } else {
       $('#rcgcontraseña').removeClass('error'); 
       $('#recontraseña').hide(); 
       }   
});
$('#ricontraseña').focus(function(){
       $('#rcgcontraseña').removeClass('error'); 
       $('#recontraseña').hide();    
});

//campo repetir contraseña
$('#rirepcontraseña').blur(function(){
    var value=  $('#rirepcontraseña').val();
    var con=  $('#ricontraseña').val();    
    if (value==''){
       $('#rcgrepcontraseña').addClass('error');
       $('#rerepcontraseña').text('No puedes dejar este campo en blanco');
       $('#rerepcontraseña').show();
    } else {
       $('#rcgrepcontraseña').removeClass('error'); 
       $('#rerepcontraseña').hide(); 
       }

    if (value!=con){
       $('#rcgrepcontraseña').addClass('error');
       $('#rerepcontraseña').text('No coinciden');
       $('#rerepcontraseña').show();
    } 
});
$('#rirepcontraseña').focus(function(){
       $('#rcgrepcontraseña').removeClass('error'); 
       $('#rerepcontraseña').hide();    
});

//campo mail
$('#rimail').blur(function(){
    var value=  $('#rimail').val();
    if (value==''){
       $('#rcgmail').addClass('error');
       $('#remail').text('No puedes dejar este campo en blanco');
       $('#remail').show();
    } else {
       $('#rcgmail').removeClass('error'); 
       $('#remail').hide(); 
    }
	
	if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)){
		$('#rcgmail').removeClass('error'); 
		$('#remail').hide(); 
	} else {
		$('#rcgmail').addClass('error');
		$('#remail').text('El email es incorrecto');
		$('#remail').show();
	}
	checkuser(value,checkuserResult);
});
$('#rimail').focus(function(){
       $('#rcgmail').removeClass('error'); 
       $('#remail').hide();    
});

$('#register-form').submit(function(e){
  e.preventDefault();
  if($('#rirepcontraseña').val()!='' && $('#ricontraseña').val()!='' && $('#rinombre').val()!='' && 
     $('#riapellido').val()!='' && $('#rimail').val()){
    register($('#rinombre').val(),$('#riapellido').val(),$('#rimail').val(),$('#ritelefono').val(),$('#ricontraseña').val(),$('#ridireccion').val(),$('#riciudad').val(),registerResult);
    console.log("-> log");
  }else{
    bootbox.alert('Debes rellenar todos los campos antes de registrarte');
	//alert('Debes rellenar todos los campos antes de registrarte');
  }
});

function registerResult(response,username){
  if (response.status=='OK'){
    bootbox.alert('Registro correcto. Ahora ya puedes logearte');
	//alert('Registro correcto. Ahora ya puedes logearte');
	window.location.href="index.html";      

  }else{    
    bootbox.alert('Registro incorrecto ' + response.result);
	//alert('Registro incorrecto ' + response.result);
    window.location.href="index.html";   
  }
}
