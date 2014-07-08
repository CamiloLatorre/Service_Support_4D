
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'CreateMesagge';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var image1 = {};	// @image
	var image2 = {};	// @image
	// @endregion// @endlock

	// eventHandlers// @lock
	var left = $(window).innerWidth();
	var top = $(window).innerHeight(); // returns height of browser viewport
	this.move(left/3.5, top/4);
	SetShortCuts('Disable');
	
	image1.click = function image1_click (event)// @startlock
	{// @endlock
		$$(id).removeComponent();
		SetShortCuts('Enable');
	};// @lock

	image2.click = function image2_click (event)// @startlock
	{// @endlock
		try{
			var response = $$(id+'_wEditMessage').getValue();
			var currentPerson;	
			source.cmpEditMessage_uSUARIOS.query('ID_Directory = :1', {
				onSuccess:function(entity){
				 	var currentUser = entity.dataSource.Adquirido.load({					
				    	onSuccess: function(relation){
				   			currentPerson = relation.entity;
							sources.Respondido.newEntity();
							sources.Respondido.Cod_Caso = source.cASOS.Codigo;
							sources.Respondido.Cuerpo = response;
							sources.Respondido.Fecha = new Date();
							sources.Respondido.Hora = source.Respondido.Fecha.getTime();
							sources.Respondido.Contesto = currentPerson;
							sources.Respondido.Cod_Persona = currentPerson.Codigo.value;
							var tipoPersona = currentPerson.Cod_Tipo.value;
							if((tipoPersona ==1) || (tipoPersona ==3)){ 
								sources.Respondido.Tipo = 'Pregunta';
							}else{
								sources.Respondido.Tipo = 'Respuesta';
							}
							sources.Respondido.save({
								onSuccess:function(event){
	 	  							sources.Respondido.addEntity(source.Respondido.getCurrentElement());
	 	  							sources.Respondido.serverRefresh();
	 	  							sources.Respondido.orderBy('Fecha desc, Hora desc');
				    			}
							});
	    				}
	    			});
				}, 
				params: [waf.directory.currentUser().ID]
			});

			$$(id).removeComponent();
			SetShortCuts('Enable');
		}catch(e){
			$$(id+'_errorDivProfile').setValue(e);
			$$(id+'_errorDivProfile').show();
		}
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	WAF.addListener(this.id + "_image2", "click", image2.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
