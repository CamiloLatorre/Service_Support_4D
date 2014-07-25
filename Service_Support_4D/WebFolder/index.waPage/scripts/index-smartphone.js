
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var user = $$('tfUser').getValue();
		var pdw = $$('tfPwd').getValue();
		var userName;
		var response;
		if(user.length > 4 && pdw.length > 4){
			pdw = $().crypt({method:"md5",source:pdw});
			
			WAF.directory.loginByPassword(user, pdw, response = {
			    onSuccess: function(event){
			        if(event.result == true){  
			        	location.href = "/Cases.wapage";
			        } else {
			        	alert("El nombre de usuario o la contraseña introducidos no son correctos.");
			        }  
			    },
			    onError: function(event){
			    	alert("Failed to communicate with server.");
			    }
			});
		}else{
			alert("El nombre de usuario y contraseña deben ser mayor a 4 caracteres.");
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
