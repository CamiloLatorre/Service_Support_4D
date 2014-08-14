
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'NewCase';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var imgSendCase = {};	// @image
	var imgNextStep = {};	// @image
	var image1 = {};	// @image
	// @endregion// @endlock

	// eventHandlers// @lock
		var left = $(window).innerWidth();
		var top = $(window).innerHeight(); // returns height of browser viewport
		this.move(left/4, top/4);
		
		try{
			SetShortCuts('Disable');
		}catch(e){}

		$$(id+'_menuBar1').disable(2);
		this.sources.cASOS.addNewElement();
//		this.sources.Respondido.addNewElement();
		var atListSO = this.sources.cASOS.GET_LIST_SO().soS;
		for (var i = 0; i < atListSO.length; i++) {
			$$(id+'_cbListSO').addOption(atListSO[i]);
		};
				
		var atListVersion = this.sources.cASOS.GET_LIST_VERSION().Versiones;
		for (var i = 0; i < atListVersion.length; i++) {
			$$(id+'_cbListVersion').addOption(atListVersion[i]);
		};
		
		this.sources.cASOS.getCurrentElement().So.setValue(atListSO[0]);
		this.sources.cASOS.getCurrentElement().Version.setValue(atListVersion[0]);
		
	imgSendCase.click = function imgSendCase_click (event)// @startlock
	{// @endlock
		var Message  = $$('cpmNewCase_detailMsg').getValue();
		var Description = $$('cpmNewCase_tfDescription').getValue();
		var Name = $$('cpmNewCase_tfName').getValue();
		
		if((Message!="") && (Description!="") && (Name!="")){
			source.cpmNewCase_uSUARIOS.query('ID_Directory = :1', {
				onSuccess:function(entity){
				 	entity.dataSource.Adquirido.load({					
				    	onSuccess: function(relation){
							var Respondido = sources.cpmNewCase_Respondido;
							var vCase = sources.cpmNewCase_cASOS.getCurrentElement();
							var Producto = sources.cpmNewCase_pRODUCTOS.getCurrentElement();
				   			currentPerson = relation.entity;
							var tipoPersona = currentPerson.Cod_Tipo.value;
							vCase.Originado.setValue(Producto);
							vCase.Obtenido.setValue(currentPerson);		
							Respondido.Fecha = new Date();
							Respondido.Hora = Respondido.Fecha.getTime();
							Respondido.Contesto = currentPerson;
							Respondido.Cod_Persona = currentPerson.Codigo.value;
							Respondido.Cuerpo = $$('cpmNewCase_detailMsg').getValue();
							
							if((tipoPersona ==1) || (tipoPersona ==3)){ 
								Respondido.Tipo = 'Pregunta';
							}else{
								Respondido.Tipo = 'Respuesta';
							}
							
							try{
								Respondido.save();
	//							vCase.save();
								sources.cASOS.all();
								sources.cASOS.orderBy('Fecha_Final desc, Hora_Final desc');
								$$(id).removeComponent();
								SetShortCuts('Enable');
								location.reload();
							}catch(e){}
	    				}
	    			});
	    			
				}, 
				params: [waf.directory.currentUser().ID]
			});	
		}else{
			$$('cpmNewCase_edAlert').move(250, 250);
			$$('cpmNewCase_edAlert').setValue('Debe escribir en los campos');
		}
	};// @lock
	
	imgNextStep.click = function imgNextStep_click (event)// @startlock
	{// @endlock
		var pos = $$(id+'_tabView1').getSelectedTab();
		var numTab;
		var imageFile;
		switch(pos.index) {
			case 1:
				numTab = 2;
				imageFile = '/images/002_45-hover.png';
				$$(id+'_imgSendCase').show();
				break;
			case 2:
				numTab = 1;
				imageFile = '/images/002_46-hover.png';
				$$(id+'_imgSendCase').hide();
				break;
		}
			
		$$(id+'_tabView1').selectTab(numTab);
		this.setValue(imageFile);
	};// @lock
	
	image1.click = function image1_click (event)// @startlock
	{// @endlock
		try{
			$$(id).removeComponent();
			SetShortCuts('Enable');
			location.reload();
		}catch(e){}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_imgSendCase", "click", imgSendCase.click, "WAF");
	WAF.addListener(this.id + "_imgNextStep", "click", imgNextStep.click, "WAF");
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
