//campo contrase�a
$('#ricontrase�a').blur(function(){
    var value=  $('#ricontrase�a').val();
    if (value==''){
       $('#rcgcontrase�a').addClass('error');
       $('#recontrase�a').text('No puedes dejar este campo en blanco');
       $('#recontrase�a').show();
    } else {
       $('#rcgcontrase�a').removeClass('error'); 
       $('#recontrase�a').hide(); 
       }   
});
$('#ricontrase�a').focus(function(){
       $('#rcgcontrase�a').removeClass('error'); 
       $('#recontrase�a').hide();    
});

//campo repetir contrase�a
$('#rirepcontrase�a').blur(function(){
    var value=  $('#rirepcontrase�a').val();
    var con=  $('#ricontrase�a').val();    
    if (value==''){
       $('#rcgrepcontrase�a').addClass('error');
       $('#rerepcontrase�a').text('No puedes dejar este campo en blanco');
       $('#rerepcontrase�a').show();
    } else {
       $('#rcgrepcontrase�a').removeClass('error'); 
       $('#rerepcontrase�a').hide(); 
       }

    if (value!=con){
       $('#rcgrepcontrase�a').addClass('error');
       $('#rerepcontrase�a').text('No coinciden');
       $('#rerepcontrase�a').show();
    } 
});
$('#rirepcontrase�a').focus(function(){
       $('#rcgrepcontrase�a').removeClass('error'); 
       $('#rerepcontrase�a').hide();    
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
  if($('#rirepcontrase�a').val()!='' && $('#ricontrase�a').val()!='' && $('#rinombre').val()!='' && 
     $('#riapellido').val()!='' && $('#rimail').val()){
    register($('#rinombre').val(),$('#riapellido').val(),$('#rimail').val(),$('#ritelefono').val(),$('#ricontrase�a').val(),$('#ridireccion').val(),$('#riciudad').val(),registerResult);
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
