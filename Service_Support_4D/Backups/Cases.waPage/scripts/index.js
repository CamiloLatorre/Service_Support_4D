
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock	
	var cASOSEvent = {};	// @dataSource
	var documentEvent = {};	// @document
	var KbScCases = {};	// @KeyboardShortcuts
	var image2 = {};	// @image
	var image1 = {};	// @image
	var RespondidoEvent = {};	// @dataSource
// @endregion// @lock

// eventHandlers// @lock

	cASOSEvent.onCurrentElementChange = function cASOSEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		/*var entityCase = sources.cASOS.getCurrentElement();
		var importantCase = entityCase.Importante.value;
		var complexityCase = entityCase.Cod_Complejidad.value;
		
		if(importantCase){
			$$('imageImportant').setValue('/Images/onebit_44.png');
		}else{
			$$('imageImportant').setValue('/Images/onebit_46.png');
		}
		$$('imageComplexy').show('');
		
		if(entityCase.Cod_Estado.value == 3){
			$$('imageNewMsj').hide();
		}
		
		switch(complexityCase) {
			case 1:
				$$('imageComplexy').setValue('/Images/onebit_50.png');
				break;
			case 2:
				$$('imageComplexy').setValue('/Images/onebit_48.png');
				break;
			case 3:
				$$('imageComplexy').hide('');
				break;
			case 4:
				$$('imageComplexy').setValue('/Images/onebit_47.png');
				break;
			case 5:
				$$('imageComplexy').setValue('/Images/onebit_49.png');
				break;
		}*/
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		currentUser = waf.directory.currentUser();
		if(currentUser != null){
			ds.PERSONAS.query('Email ='+currentUser.userName,
				 {  onSuccess: function(event){
					    var collection = event.entityCollection;
					        collection.forEach(
					        	function(e){
					        		var persona = e.entity;
					        		var tipo = persona.Cod_Tipo.value;
					        		switch(tipo) {
										case 1:
											codigo = persona.Codigo.value;
						        			sources.cASOS.query('Cod_Contacto = '+codigo);
											break;
										case 2:
											
											sources.cASOS.all();
											break;
										case 3:
											break;
									}
									
					        });
				    }
				 }
			);
		}
		
		var actionEvents = new Array();
		
		actionEvents[0] = function () {
			source.cASOS.selectNext();	
		}
		actionEvents[1] = function () {
			source.cASOS.selectPrevious();	
		}
		actionEvents[2] = function (){
			source.Respondido.selectNext();
		}
		actionEvents[3] = function (){
			source.Respondido.selectPrevious();	
		}

		//$$('KbScCases').setActions(actionEvents);
	};// @lock

	KbScCases.click = function KbScCases_click (event)// @startlock
	{// @endlock
//		$$('KbScCases').removeActions();
	};// @lock

	image2.click = function image2_click (event)// @startlock
	{// @endlock
		var entitiesMsj = sources.Respondido;
		sources.Respondido.selectPrevious();
	};// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		source.Respondido.selectNext();
	};// @lock

	RespondidoEvent.onCurrentElementChange = function RespondidoEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var title = this.Tipo;
		var response;	
		if(title == "Respuesta"){
			$$('ctnHeaderMsj').setBackgroundColor("#e8f2f2");			
		}else{
			$$('ctnHeaderMsj').setBackgroundColor("#d4ffaa");
		}
		sources.Respondido.Contesto.load({
		    onSuccess: function(event){
		        var persona = event.entity;
		        response = persona.Nombre.value + " " + persona.Apellido.value;
		    	$$('rtResponse').setValue(response);
		    }
		 });
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("cASOS", "onCurrentElementChange", cASOSEvent.onCurrentElementChange, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("Respondido", "onCurrentElementChange", RespondidoEvent.onCurrentElementChange, "WAF");
	WAF.addListener("KbScCases", "select", KbScCases.select, "WAF");
	WAF.addListener("KbScCases", "focus", KbScCases.focus, "WAF");
	WAF.addListener("KbScCases", "click", KbScCases.click, "WAF");
	WAF.addListener("image2", "click", image2.click, "WAF");
	WAF.addListener("image1", "click", image1.click, "WAF");
// @endregion
};// @endlock

function getUrlVars(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

(function() {
	var url = window.location.href;
	var index =  getUrlVars()["Index"];
	if(index == undefined){
		document.location = "/?callback="+url.substring(25);
	}
})();