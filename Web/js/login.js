ERROR_PAGE="#";

$('#login-form').submit(function(e){
	e.preventDefault();
	login($('#inputname').val(),$('#inputPassword').val(),loginResult);
});

function loginResult(response){

	if (response.status==='OK'){
		$.cookie('mus-user', JSON.stringify(response.result));
		window.location.href="index.html";
	}else{
		//alert(response.result);
		bootbox.alert(response.result);
	}
}

//campo username
$('#inputname').blur(function(){
    var value=  $('#inputname').val();
    if (value==''){
       $('#cginputname').addClass('error');
       $('#einputname').text('No puedes dejar este campo en blanco');
       $('#einputname').show();
    } else {
       $('#cginputname').removeClass('error'); 
       $('#einputname').hide(); 
    }
	   
	checkuser(value,checkuserResult)
 
});
$('#inputname').focus(function(){
       $('#cginputname').removeClass('error'); 
       $('#einputname').hide();    
});

//campo contraseña
$('#inputPassword').blur(function(){
    var value=  $('#inputPassword').val();
    if (value==''){
       $('#cginputPassword').addClass('error');
       $('#einputPassword').text('No puedes dejar este campo en blanco');
       $('#einputPassword').show();
    } else {
       $('#cginputPassword').removeClass('error'); 
       $('#einputPassword').hide(); 
       }   
});
$('#inputPassword').focus(function(){
       $('#cginputPassword').removeClass('error'); 
       $('#einputPassword').hide();    
});