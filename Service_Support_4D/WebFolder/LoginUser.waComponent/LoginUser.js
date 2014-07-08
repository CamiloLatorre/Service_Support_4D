
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Login';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		var currentUser = waf.directory.currentUser();
		
		if(window.location.href.length <= 26){
			$$(id).removeComponent();
			$$('tfUserName').hide();
		}	
		if( currentUser != null ){
			$$('tfUserName').show();
			$$(id).removeComponent();      
			$$('tfUserName').setValue(currentUser.fullName);
			$$('tfUserName').getLabel().setValue("Bienvenido");
			$$('btnLogin').setValue("Salir");
		}
		
		var left = $(window).innerWidth();
		var top = $(window).innerHeight(); // returns height of browser viewport
		this.move(left/2.5, top/4);

	// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var user = $$(id+'_tfUser').getValue();
		var pdw = $$(id+'_tfPwd').getValue();
		var userName;
		var response;
		if(user.length > 4 && pdw.length > 4){
			pdw = $().crypt({method:"md5",source:pdw});
			
			WAF.directory.loginByPassword(user, pdw, response = {
			    onSuccess: function(event){
			        if(event.result == true){  
			        	var currentUser = waf.directory.currentUser();
			        	$$('tfUserName').setValue(currentUser.fullName);
			           $$(id).removeComponent();
			           location.reload();
			        } else {
			        	$$(id+'_errorDiv1').setValue("El nombre de usuario o la contraseña introducidos no son correctos.");
			        }  
			    },
			    onError: function(event){
			    	$$(id+'_errorDiv1').setValue("Failed to communicate with server.");
			    }
			});
		}else{
			$$(id+'_errorDiv1').setValue("El nombre de usuario y contraseña deben ser mayor a 4 caracteres.");
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
