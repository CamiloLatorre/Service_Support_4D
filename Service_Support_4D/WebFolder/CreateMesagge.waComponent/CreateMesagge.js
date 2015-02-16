
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'CreateMesagge';
	// @endregion// @endlock
	var objAttach = {};
	
	
	this.load = function (data) {// @lock
		
		var left = $(window).innerWidth();
		var top = $(window).innerHeight(); // returns height of browser viewport
		
		$comp.move(left/3.5, top/4);
		
		SetShortCuts('Disable');
		
		var contactID = sources.cASOS.Cod_Contacto;
		var objPeople = sources.Respondido.GET_PEOPLE(2, contactID);
		var atPeopleNames = objPeople.contactNames;
		var atPeopleIDs = objPeople.contactIDs;
		$$(id+'_cbContact').rebuild();
		for (var i = 0; i < atPeopleNames.length; i++) {
			$$(id+'_cbContact').addOption(atPeopleIDs[i], atPeopleNames[i]);
		};

		var currentUser = waf.directory.currentUser();
		$comp.sources.uSUARIOS.query('ID_Directory = :1', {
		onSuccess:function(entity){
			 	entity.dataSource.Adquirido.load({					
			    	onSuccess: function(relation){
						currentPerson = relation.entity;
						currentPerson.IDPersona = currentPerson.Codigo;
						var tipoPersona = currentPerson.Cod_Tipo.value;
						if((tipoPersona == 1) || (tipoPersona == 3)){ 
							currentUser.type = 1;
							$$(id+'_tfDate').hide();
							$$(id+'_tfTime').hide();
							$$(id+'_cbContact').hide();
						}else{
							currentUser.type = 0;
						}
					}
				});	
			}, 
			params: [waf.directory.currentUser().ID]
		});
		
		sources.Respondido.newEntity();
			

	// @region namespaceDeclaration// @startlock
	var fileUpload1 = {};	// @fileUpload
	var image1 = {};	// @image
	var image2 = {};	// @image
	// @endregion// @endlock

	// eventHandlers// @lock

	fileUpload1.filesUploaded = function fileUpload1_filesUploaded (event)// @startlock
	{// @endlock
		var blob = this.getFiles()[0];
		var reader = new FileReader();
		
		reader.onload = function(e) {
			objAttach.Attachment = e.target.result;
		};
		
		objAttach.name = blob.name;
		objAttach.size = blob.size; 
		if(blob.type.indexOf("image") != -1){
			objAttach.kind = "Imagen";
		}else{
			objAttach.kind = blob.type;
		}
		
		reader.readAsDataURL(blob);
	};// @lock
		
	image1.click = function image1_click (event)// @startlock
	{// @endlock
		SetShortCuts('Enable');
		location.reload();
	};// @lock

	image2.click = function image2_click (event)// @startlock
	{// @endlock
		try{
			var response = $$(id+'_wEditMessage').getValue();
			var tipoPersona = currentUser.type;

			sources.Respondido.Cod_Caso = source.cASOS.Codigo;
			sources.Respondido.Cuerpo = response;
			
			if((tipoPersona == 1) || (tipoPersona == 3)){ 
				sources.Respondido.Tipo = 'Pregunta';
				sources.Respondido.Fecha = new Date();
				sources.Respondido.Hora = source.Respondido.Fecha.getTime();
				sources.Respondido.Cod_Persona = currentPerson.IDPersona;
			}else{
				sources.Respondido.Tipo = 'Respuesta';
			}
			
			sources.Respondido.save({
				onSuccess:function(event){
					sources.Respondido.addEntity(source.Respondido.getCurrentElement());
	 	  			sources.Respondido.serverRefresh();
	 	  			sources.Respondido.orderBy('Fecha desc, Hora desc');
	 	  			if(objAttach.size > 0){
		 	  			objAttach.IDMsg = event.dataSource.Codigo;
						sources.Respondido.GS_CREATE_ATTACHMENT(objAttach);
					}

					location.reload();
				}
			});
	    	
			$$(id).removeComponent();
			SetShortCuts('Enable');
			
		}catch(e){
			$$(id+'_errorDivProfile').setValue(e);
			$$(id+'_errorDivProfile').show();
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_fileUpload1", "filesUploaded", fileUpload1.filesUploaded, "WAF");
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	WAF.addListener(this.id + "_image2", "click", image2.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
